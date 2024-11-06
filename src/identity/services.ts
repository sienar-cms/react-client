import { ApiCrudService, CrudService, InjectionKey, provide, sendStatusServiceRequest, StatusService } from '@/react-utils';
import type { AddUserToRoleRequest, LockoutReason, ManuallyConfirmUserAccountRequest, RemoveUserFromRoleRequest, Role, UnlockUserAccountRequest, User } from '@identity/types.ts';

// region Account

export const CHANGE_EMAIL_SERVICE = Symbol() as InjectionKey<StatusService<FormData>>;
export const CHANGE_EMAIL_CONFIRM_SERVICE = Symbol() as InjectionKey<StatusService<FormData>>;
export const CHANGE_PASSWORD_SERVICE = Symbol() as InjectionKey<StatusService<FormData>>;
export const CONFIRM_SERVICE = Symbol() as InjectionKey<StatusService<FormData>>;
export const DELETE_ACCOUNT_SERVICE = Symbol() as InjectionKey<StatusService<FormData>>;
export const FORGOT_PASSWORD_SERVICE = Symbol() as InjectionKey<StatusService<FormData>>;
export const LOGIN_SERVICE = Symbol() as InjectionKey<StatusService<FormData>>;
export const REGISTER_SERVICE = Symbol() as InjectionKey<StatusService<FormData>>;
export const RESET_PASSWORD_SERVICE = Symbol() as InjectionKey<StatusService<FormData>>;

// endregion

// region Users

export const USERS_SERVICE = Symbol() as InjectionKey<CrudService<User>>;
export const ROLES_SERVICE = Symbol() as InjectionKey<CrudService<Role>>;
export const ADD_USER_TO_ROLE_SERVICE = Symbol() as InjectionKey<StatusService<AddUserToRoleRequest>>;
export const REMOVE_USER_FROM_ROLE_SERVICE = Symbol() as InjectionKey<StatusService<RemoveUserFromRoleRequest>>;
export const LOCK_USER_ACCOUNT_SERVICE = Symbol() as InjectionKey<StatusService<FormData>>;
export const UNLOCK_USER_ACCOUNT_SERVICE = Symbol() as InjectionKey<StatusService<UnlockUserAccountRequest>>;
export const MANUALLY_CONFIRM_USER_ACCOUNT_SERVICE = Symbol() as InjectionKey<StatusService<ManuallyConfirmUserAccountRequest>>;

// endregion

// region Lockout reasons

export const LOCKOUT_REASONS_SERVICE = Symbol() as InjectionKey<CrudService<LockoutReason>>;

// endregion

export function setupIdentityServices() {
	provide(
		CHANGE_EMAIL_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/account/change-email',
			'POST',
			data,
			config
		),
		false
	);

	provide(
		CHANGE_EMAIL_CONFIRM_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/account/email',
			'PATCH',
			data,
			config
		),
		false
	);

	provide(
		CHANGE_PASSWORD_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/account/change-password',
			'PATCH',
			data,
			config
		),
		false
	);

	provide(
		CONFIRM_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/account/confirm',
			'POST',
			data,
			config
		),
		false
	);

	provide(
		DELETE_ACCOUNT_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/account',
			'DELETE',
			data,
			config
		),
		false
	);

	provide(
		FORGOT_PASSWORD_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/account/password',
			'DELETE',
			data,
			config
		),
		false
	);

	provide(
		LOGIN_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/account/login',
			'POST',
			data,
			config
		),
		false
	);

	provide(
		REGISTER_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/account',
			'POST',
			data,
			config
		),
		false
	);

	provide(
		RESET_PASSWORD_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/account/password',
			'PATCH',
			data,
			config
		),
		false
	);

	provide(
		USERS_SERVICE,
		new ApiCrudService<User>('/api/users'),
		false
	);

	provide(
		ROLES_SERVICE,
		new ApiCrudService<Role>('/api/roles'),
		false
	);

	provide(
		ADD_USER_TO_ROLE_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/users/roles',
			'POST',
			data,
			config
		),
		false
	);

	provide(
		REMOVE_USER_FROM_ROLE_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/users/roles',
			'DELETE',
			data,
			config
		),
		false
	);

	provide(
		LOCK_USER_ACCOUNT_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/users/lock',
			'PATCH',
			data,
			config
		),
		false
	);

	provide(
		UNLOCK_USER_ACCOUNT_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/users/lock',
			'DELETE',
			data,
			config
		),
		false
	);

	provide(
		MANUALLY_CONFIRM_USER_ACCOUNT_SERVICE,
		(data, config) => sendStatusServiceRequest(
			'/api/users/confirm',
			'PATCH',
			data,
			config
		),
		false
	);

	provide(
		LOCKOUT_REASONS_SERVICE,
		new ApiCrudService<LockoutReason>('/api/lockout-reasons'),
		false
	);
}