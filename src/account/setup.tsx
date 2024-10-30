﻿import { DeleteForever, Email, Key, Lock } from '@mui/icons-material';
import { addLinks, inject, provide, registerRoutes, sendRequest } from '@/react-utils';
import * as KEYS from '@account/keys.ts';
import { DASHBOARD_LAYOUT } from '@/keys.ts';
import Register from '@account/views/register/Index.tsx';
import RegisterSuccessful from '@account/views/register/Successful.tsx';
import Confirm from '@account/views/confirm/Index.tsx';
import ConfirmSuccessful from '@account/views/confirm/Successful.tsx';
import Login from '@account/views/Login.tsx';
import ForgotPassword from '@account/views/forgot-password/Index';
import ForgotPasswordSuccessful from '@account/views/forgot-password/Successful';
import ResetPassword from '@account/views/reset-password/Index';
import ResetPasswordSuccessful from '@account/views/reset-password/Successful';
import ChangeEmail from '@account/views/change-email/Index';
import ChangeEmailRequested from '@account/views/change-email/Requested';
import ChangeEmailConfirm from '@account/views/change-email/Confirm';
import ChangeEmailSuccessful from '@account/views/change-email/Successful';
import ChangePassword from '@account/views/change-password/Index';
import ChangePasswordSuccessful from '@account/views/change-password/Successful';
import PersonalData from '@account/views/PersonalData';
import DeleteAccount from '@account/views/Delete';
import Deleted from '@account/views/Deleted';

export default function accountSetup() {
	setupUrls();
	setupMenus();
	setupServices();
	setupViews();
}

function setupUrls() {
	provide(KEYS.REGISTER_ROUTE, '/dashboard/account/register', false);
	provide(KEYS.REGISTER_SUCCESSFUL_ROUTE, '/dashboard/account/register/successful', false);
	provide(KEYS.CONFIRM_ROUTE, '/dashboard/account/confirm', false);
	provide(KEYS.CONFIRM_SUCCESSFUL_ROUTE, '/dashboard/account/confirm/successful', false);
	provide(KEYS.LOGIN_ROUTE, '/dashboard/account/login', false);
	provide(KEYS.FORGOT_PASSWORD_ROUTE, '/dashboard/account/forgot-password', false);
	provide(KEYS.FORGOT_PASSWORD_SUCCESSFUL_ROUTE, '/dashboard/account/forgot-password/successful', false);
	provide(KEYS.RESET_PASSWORD_ROUTE, '/dashboard/account/reset-password', false);
	provide(KEYS.RESET_PASSWORD_SUCCESSFUL_ROUTE, '/dashboard/account/reset-password/successful', false);
	provide(KEYS.CHANGE_EMAIL_ROUTE, '/dashboard/account/change-email', false);
	provide(KEYS.CHANGE_EMAIL_REQUESTED_ROUTE, '/dashboard/account/change-email/requested', false);
	provide(KEYS.CHANGE_EMAIL_CONFIRM_ROUTE, '/dashboard/account/change-email/confirm', false);
	provide(KEYS.CHANGE_EMAIL_SUCCESSFUL_ROUTE, '/dashboard/account/change-email/successful', false);
	provide(KEYS.CHANGE_PASSWORD_ROUTE, '/dashboard/account/change-password', false);
	provide(KEYS.CHANGE_PASSWORD_SUCCESSFUL_ROUTE, '/dashboard/account/change-password/successful', false);
	provide(KEYS.PERSONAL_DATA_ROUTE, '/dashboard/account/personal-data', false);
	provide(KEYS.DOWNLOAD_PERSONAL_DATA_ROUTE, '/api/account/personal-data', false);
	provide(KEYS.DELETE_ACCOUNT_ROUTE, '/dashboard/account/delete', false);
	provide(KEYS.DELETED_ROUTE, '/dashboard/account/deleted', false);
}

function setupMenus() {
	addLinks(
		KEYS.USER_SETTINGS_MENU,
		{
			text: 'Change email address',
			href: inject(KEYS.CHANGE_EMAIL_ROUTE),
			icon: <Email/>,
			requireLoggedIn: true
		},
		{
			text: 'Change password',
			href: inject(KEYS.CHANGE_PASSWORD_ROUTE),
			icon: <Lock/>,
			requireLoggedIn: true
		},
		{
			text: 'Personal data',
			href: inject(KEYS.PERSONAL_DATA_ROUTE),
			icon: <Key/>,
			requireLoggedIn: true
		},
		{
			text: 'Delete account',
			href: inject(KEYS.DELETE_ACCOUNT_ROUTE),
			icon: <DeleteForever/>,
			requireLoggedIn: true
		}
	);
}

function setupServices() {
	provide(
		KEYS.CHANGE_EMAIL_SERVICE,
		data => sendRequest('/api/account/change-email', 'POST', { body: data }),
		false
	);

	provide(
		KEYS.CHANGE_EMAIL_CONFIRM_SERVICE,
		data => sendRequest('/api/account/email', 'PATCH', { body: data }),
		false
	);

	provide(
		KEYS.CHANGE_PASSWORD_SERVICE,
		data => sendRequest('/api/account/change-password', 'PATCH', { body: data }),
		false
	);

	provide(
		KEYS.CONFIRM_SERVICE,
		data => sendRequest('/api/account/confirm', 'POST', { body: data }),
		false
	);

	provide(
		KEYS.DELETE_ACCOUNT_SERVICE,
		data => sendRequest('/api/account', 'DELETE', { body: data }),
		false
	);

	provide(
		KEYS.FORGOT_PASSWORD_SERVICE,
		data => sendRequest('/api/account/password', 'DELETE', { body: data }),
		false
	);

	provide(
		KEYS.LOGIN_SERVICE,
		data => sendRequest('/api/account/login', 'POST', { body: data }),
		false
	);

	provide(
		KEYS.REGISTER_SERVICE,
		data => sendRequest('/api/account', 'POST', { body: data }),
		false
	);

	provide(
		KEYS.RESET_PASSWORD_SERVICE,
		data => sendRequest('/api/account/password', 'PATCH', { body: data }),
		false
	);
}

function setupViews() {
	registerRoutes(
		DASHBOARD_LAYOUT,
		{
			path: inject(KEYS.REGISTER_ROUTE),
			element: inject(KEYS.REGISTER_VIEW, true) ?? <Register/>
		},
		{
			path: inject(KEYS.REGISTER_SUCCESSFUL_ROUTE),
			element: inject(KEYS.REGISTER_SUCCESSFUL_VIEW, true) ?? <RegisterSuccessful/>
		},
		{
			path: inject(KEYS.CONFIRM_ROUTE),
			element: inject(KEYS.CONFIRM_VIEW, true) ?? <Confirm/>
		},
		{
			path: inject(KEYS.CONFIRM_SUCCESSFUL_ROUTE),
			element: inject(KEYS.CONFIRM_SUCCESSFUL_VIEW, true) ?? <ConfirmSuccessful/>
		},
		{
			path: inject(KEYS.LOGIN_ROUTE),
			element: inject(KEYS.LOGIN_VIEW, true) ?? <Login/>
		},
		{
			path: inject(KEYS.FORGOT_PASSWORD_ROUTE),
			element: inject(KEYS.FORGOT_PASSWORD_VIEW, true) ?? <ForgotPassword/>
		},
		{
			path: inject(KEYS.FORGOT_PASSWORD_SUCCESSFUL_ROUTE),
			element: inject(KEYS.FORGOT_PASSWORD_SUCCESSFUL_VIEW, true) ?? <ForgotPasswordSuccessful/>
		},
		{
			path: inject(KEYS.RESET_PASSWORD_ROUTE),
			element: inject(KEYS.RESET_PASSWORD_VIEW, true) ?? <ResetPassword/>
		},
		{
			path: inject(KEYS.RESET_PASSWORD_SUCCESSFUL_ROUTE),
			element: inject(KEYS.RESET_PASSWORD_SUCCESSFUL_VIEW, true) ?? <ResetPasswordSuccessful/>
		},
		{
			path: inject(KEYS.CHANGE_EMAIL_ROUTE),
			element: inject(KEYS.CHANGE_EMAIL_VIEW, true) ?? <ChangeEmail/>
		},
		{
			path: inject(KEYS.CHANGE_EMAIL_REQUESTED_ROUTE),
			element: inject(KEYS.CHANGE_EMAIL_REQUESTED_VIEW, true) ?? <ChangeEmailRequested/>
		},
		{
			path: inject(KEYS.CHANGE_EMAIL_CONFIRM_ROUTE),
			element: inject(KEYS.CHANGE_EMAIL_CONFIRM_VIEW, true) ?? <ChangeEmailConfirm/>
		},
		{
			path: inject(KEYS.CHANGE_EMAIL_SUCCESSFUL_ROUTE),
			element: inject(KEYS.CHANGE_EMAIL_SUCCESSFUL_VIEW, true) ?? <ChangeEmailSuccessful/>
		},
		{
			path: inject(KEYS.CHANGE_PASSWORD_ROUTE),
			element: inject(KEYS.CHANGE_PASSWORD_VIEW, true) ?? <ChangePassword/>
		},
		{
			path: inject(KEYS.CHANGE_PASSWORD_SUCCESSFUL_ROUTE),
			element: inject(KEYS.CHANGE_PASSWORD_SUCCESSFUL_VIEW, true) ?? <ChangePasswordSuccessful/>
		},
		{
			path: inject(KEYS.PERSONAL_DATA_ROUTE),
			element: inject(KEYS.PERSONAL_DATA_VIEW, true) ?? <PersonalData/>
		},
		{
			path: inject(KEYS.DELETE_ACCOUNT_ROUTE),
			element: inject(KEYS.DELETE_ACCOUNT_VIEW, true) ?? <DeleteAccount/>
		},
		{
			path: inject(KEYS.DELETED_ROUTE),
			element: inject(KEYS.DELETED_VIEW, true) ?? <Deleted/>
		}
	);
}