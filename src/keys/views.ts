﻿import type { InjectionKey } from '@/react-utils';
import { ReactNode } from 'react';

// region Account
export const DASHBOARD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const LOGIN_VIEW = Symbol() as InjectionKey<ReactNode>;
export const REGISTER_VIEW = Symbol() as InjectionKey<ReactNode>;
export const REGISTER_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CONFIRM_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CONFIRM_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const FORGOT_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const FORGOT_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const RESET_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const RESET_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_REQUESTED_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_CONFIRM_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_EMAIL_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_PASSWORD_VIEW = Symbol() as InjectionKey<ReactNode>;
export const CHANGE_PASSWORD_SUCCESSFUL_VIEW = Symbol() as InjectionKey<ReactNode>;
export const PERSONAL_DATA_VIEW = Symbol() as InjectionKey<ReactNode>;
export const DELETE_ACCOUNT_VIEW = Symbol() as InjectionKey<ReactNode>;
export const DELETED_VIEW = Symbol() as InjectionKey<ReactNode>;
export const UNAUTHORIZED_VIEW = Symbol() as InjectionKey<ReactNode>

// endregion

// region Lockout reasons

export const LOCKOUT_REASONS_UPSERT_VIEW = Symbol() as InjectionKey<ReactNode>;

// endregion