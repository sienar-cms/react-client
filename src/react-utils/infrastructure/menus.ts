﻿import type { ReactNode } from 'react';

const dashboardLinks = {} as LinkDictionaryProvider<DashboardLink>;
const menuLinks = {} as LinkDictionaryProvider<MenuLink>;

/**
 * Adds a {@link DashboardLink} or {@link MenuLink} to a {@link LinkDictionaryProvider}. You probably don't want to use this function directly unless you're creating your own customized menu link system.
 *
 * @param dictionary The link dictionary to add a link to
 * @param name The name of the menu or dashboard to add the link to
 * @param links The links to add
 * @param priority The priority of the link to add
 */
export function addLinks<T extends DashboardLink | MenuLink>(
	dictionary: LinkDictionaryProvider<T>,
	name: string,
	links: T[],
	priority: MenuPriority) {
	links.forEach(link => {
		link.allRolesRequired ??= true;
		link.requireLoggedIn ??= false;
		link.requireLoggedOut ??= false;
		link.roles ??= [];
	});

	dictionary[name] ??= {} as LinkDictionary<T>;
	dictionary[name][priority] ??= [];
	dictionary[name][priority].push(...links);
}

/**
 * Adds an array of {@link DashboardLink} to the internal {@link LinkDictionaryProvider} with normal priority
 *
 * @param name The name of the menu to add the links to
 * @param links The links to add
 */
export function addDashboardLinks(
	name: string,
	...links: DashboardLink[]) {
	addLinks(dashboardLinks, name, links, MenuPriority.Normal);
}

/**
 * Adds an array of {@link DashboardLink} to the internal {@link LinkDictionaryProvider} with the specified priority
 *
 * @param name The name of the menu to add the links to
 * @param priority The priority at which to add the links
 * @param links The links to add
 */
export function addDashboardLinksWithPriority(
	name: string,
	priority: MenuPriority,
	...links: DashboardLink[]
) {
	addLinks(dashboardLinks, name, links, priority);
}

/**
 * Adds an array of {@link MenuLink} to the internal {@link LinkDictionaryProvider} with normal priority
 *
 * @param name The name of the menu to add the links to
 * @param links The links to add
 */
export function addMenuLinks(
	name: string,
	...links: MenuLink[]) {
	addLinks(menuLinks, name, links, MenuPriority.Normal);
}

/**
 * Adds an array of {@link MenuLink} to the internal {@link LinkDictionaryProvider} with the specified priority
 *
 * @param name The name of the menu to add the links to
 * @param priority The priority at which to add the links
 * @param links The links to add
 */
export function addMenuLinksWithPriority(
	name: string,
	priority: MenuPriority,
	...links: MenuLink[]) {
	addLinks(menuLinks, name, links, priority);
}

/**
 * Aggregates an array of {@link DashboardLink} or {@link MenuLink} that have been registered to the given menu or dashboard name. You probably don't want to use this function directly unless you're creating your own customized menu link system.
 *
 * @param links The {@link LinkDictionaryProvider} that contains the links from which to aggregate
 * @param name The name of the menu from which to aggregate links
 */
export function aggregateLinks<T extends DashboardLink & MenuLink>(
	links: LinkDictionaryProvider<T>,
	name: string): T[] {
	const includedLinks: T[] = [];
	if (!links[name]) return includedLinks;

	let priority = MenuPriority.Highest;
	while (priority >= MenuPriority.Lowest) {
		const prioritizedLinks = links[name][priority];
		if (prioritizedLinks) {
			prioritizedLinks.forEach(l => {
				if (l.childMenu) l.sublinks = aggregateLinks(links, l.childMenu);
			})
			includedLinks.push(...prioritizedLinks);
		}

		priority--;
	}

	return includedLinks;
}

/**
 * Aggregates an array of {@link DashboardLink} that have been registered to the given dashboard name
 *
 * @param name the name of the dashboard from which to aggregate links
 */
export function aggregateDashboardLinks(name: string): DashboardLink[] {
	return aggregateLinks(dashboardLinks, name);
}

/**
 * Aggregates an array of {@link MenuLink} that have been registered to the given menu name
 *
 * @param name the name of the menu from which to aggregate links
 */
export function aggregateMenuLinks(name: string): MenuLink[] {
	return aggregateLinks(menuLinks, name);
}

/**
 * Filters links to determine which links the current user is able to view. Works for {@link DashboardLink} and recursively for {@link MenuLink} with nested links.
 *
 * @param links The array of {@link DashboardLink} or {@link MenuLink} to filter
 * @param userIsLoggedIn Whether the current user is logged in
 * @param userRoles The roles of the current user
 */
export function filterLinks<T extends DashboardLink & MenuLink>(
	links: T[],
	userIsLoggedIn: boolean,
	userRoles: string[]): T[] {
	const includedLinks: T[] = [];

	for (let link of links) {
		if (!userIsAuthorized(link, userIsLoggedIn, userRoles)) {
			continue;
		}

		if (link.sublinks) {
			link.sublinks = filterLinks(link.sublinks, userIsLoggedIn, userRoles);
		}

		includedLinks.push(link);
	}

	return includedLinks;
}

/**
 * Determines if a user is authorized to view a link based on their sign-in status and current roles
 *
 * @param link The link to check for authorization
 * @param userIsSignedIn Whether the current user is signed in to the application
 * @param userRoles The roles of the current user
 */
export function userIsAuthorized<T extends DashboardLink | MenuLink>(
	link: T,
	userIsSignedIn: boolean,
	userRoles: string[]): boolean {
	if (link.requireLoggedIn && !userIsSignedIn) return false;
	if (link.requireLoggedOut && userIsSignedIn) return false;
	if (!link.roles || link.roles.length === 0) return true;

	for (let role of link.roles) {
		if (userRoles.includes(role)) {
			if (link.allRolesRequired) continue;
			return true;
		}

		if (link.allRolesRequired) return false;
	}

	// Default is added when the links are added, so this is guaranteed not to be undefined
	return link.allRolesRequired as boolean;
}

const sienarMenus = {
	DASHBOARD: 'SIENAR_DASHBOARD'
}

export const SIENAR_MENUS = Object.freeze(sienarMenus);

/**
 * A container for {@link DashboardLink} or {@link MenuLink} objects with a string key representing the name of the menu or dashboard
 */
export type LinkDictionaryProvider<T extends DashboardLink | MenuLink> = {
	[id: string]: LinkDictionary<T>
}

/**
 * A container for {@link DashboardLink} or {@link MenuLink} arrays with a {@link MenuPriority} key representing the render order of that key's links
 */
export type LinkDictionary<T extends DashboardLink | MenuLink> = {
	[id in MenuPriority]: T[];
};

/**
 * Contains all the data needed to create a dashboard link
 */
export type DashboardLink = {
	/**
	 * The display text of the link
	 */
	text: string

	/**
	 * The URL the link points to, if any
	 */
	href?: string

	/**
	 * The React component to use as the button component
	 */
	buttonComponent?: ReactNode

	/**
	 * The icon to show along with the link, if any
	 */
	icon?: ReactNode

	/**
	 * Whether the authorization requirements stored in the roles array should be satisfied by all roles in the array being present, or only by a single role being present
	 */
	allRolesRequired?: boolean

	/**
	 * Whether the link should only be displayed if the user is logged in
	 */
	requireLoggedIn?: boolean

	/**
	 * Whether the link should only be displayed if the user is logged out
	 */
	requireLoggedOut?: boolean

	/**
	 * The role(s) required to see the link in the menu or dashboard, if any
	 */
	roles?: string[]|string
}

/**
 * Contains all the data needed to create a menu link
 */
export type MenuLink = DashboardLink & {
	/**
	 * The menu to render as a submenu, if any
	 */
	childMenu?: string

	/**
	 * Child links to display in a submenu, if any
	 */
	sublinks?: MenuLink[]

	/**
	 * The icon to render at the end of a menu link
	 */
	endIcon?: ReactNode
}

/**
 * Represents the priority order in which menu items should be rendered
 */
export enum MenuPriority {
	/**
	 * Menu items that should be rendered last
	 */
	Lowest,

	/**
	 * Menu items that should be rendered late, but not last
	 */
	Low,

	/**
	 * Menu items with no special priority
	 */
	Normal,

	/**
	 * Menu items that should be rendered early, but not first
	 */
	High,

	/**
	 * Menu items that should be rendered first
	 */
	Highest
}
