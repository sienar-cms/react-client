﻿import { addLinks, DASHBOARD_MENU, inject, provide, registerRoutes, sendRequest } from '@/react-utils';
import * as KEYS from '@users/keys.ts';
import { DASHBOARD_LAYOUT } from '@/keys.ts';
import UserIndex from '@users/views/Index.tsx';
import UserUpsert from '@users/views/Upsert.tsx';
import UserRoles from '@users/views/Roles.tsx';
import UserLock from '@users/views/Lock.tsx';
import { ApiCrudService } from '@/react-utils';
import type { Role, User } from '@users/types.ts';

export default function usersSetup() {
	// URLs
	provide(KEYS.USERS_ROUTE, '/dashboard/users', false);
	provide(KEYS.USERS_ADD_ROUTE, '/dashboard/users/add', false);

	// Menus
	addLinks(
		DASHBOARD_MENU,
		{
			text: 'Users',
			href: inject(KEYS.USERS_ROUTE),
			// roles: ['Administrator']
		}
	);

	// Services
	provide(
		KEYS.USERS_SERVICE,
		new ApiCrudService<User>('/api/users'),
		false
	);

	provide(
		KEYS.ROLES_SERVICE,
		new ApiCrudService<Role>('/api/roles'),
		false
	);

	provide(
		KEYS.ADD_USER_TO_ROLE_SERVICE,
		data => {
			const formData = new FormData();
			formData.set('userId', data.userId);
			formData.set('roleId', data.roleId);

			return sendRequest(
				'/api/users/roles',
				'POST',
				{ body: formData }
			);
		},
		false
	);

	provide(
		KEYS.REMOVE_USER_FROM_ROLE_SERVICE,
		data => {
			const formData = new FormData();
			formData.set('userId', data.userId);
			formData.set('roleId', data.roleId);

			return sendRequest(
				'/api/users/roles',
				'DELETE',
				{ body: formData }
			);
		},
		false
	);

	provide(
		KEYS.LOCK_USER_ACCOUNT_SERVICE,
		formData => sendRequest(
			'/api/users/lock',
			'PATCH',
			{ body : formData }
		),
		false
	);

	provide(
		KEYS.UNLOCK_USER_ACCOUNT_SERVICE,
		data => {
			const formData = new FormData();
			formData.set('userId', data.userId);

			return sendRequest(
				'/api/users/lock',
				'DELETE',
				{ body: formData }
			)
		}
	)

	// Views
	registerRoutes(
		DASHBOARD_LAYOUT,
		{
			path: inject(KEYS.USERS_ROUTE),
			element: inject(KEYS.USERS_UPSERT_VIEW, true) ?? <UserIndex/>
		},
		{
			path: inject(KEYS.USERS_ADD_ROUTE),
			element: inject(KEYS.USERS_UPSERT_VIEW, true) ?? <UserUpsert/>
		},
		{
			path: `${inject(KEYS.USERS_ROUTE)}/:id`,
			element: inject(KEYS.USERS_UPSERT_VIEW, true) ?? <UserUpsert/>
		},
		{
			path: `${inject(KEYS.USERS_ROUTE)}/:id/roles`,
			element: inject(KEYS.USERS_ROLES_VIEW, true) ?? <UserRoles/>
		},
		{
			path: `${inject(KEYS.USERS_ROUTE)}/:id/lock`,
			element: inject(KEYS.USERS_LOCK_VIEW, true) ?? <UserLock/>
		}
	)
}