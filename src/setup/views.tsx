import { registerRoutes, getUrl, SIENAR_URLS } from '@/react-utils';
import { Layouts } from '@/react-ui';
import Dashboard from '@/views/Dashboard';
import Register from '@/views/account/register/Index';
import RegisterSuccessful from '@/views/account/register/Successful';
import Confirm from '@/views/account/confirm/Index';
import ConfirmSuccessful from '@/views/account/confirm/Successful';
import Login from '@/views/account/Login';
import ForgotPassword from '@/views/account/forgot-password/Index';
import ForgotPasswordSuccessful from '@/views/account/forgot-password/Successful';
import ResetPassword from '@/views/account/reset-password/Index';
import ResetPasswordSuccessful from '@/views/account/reset-password/Successful';

registerRoutes(
	Layouts.Dashboard,
	{
		path: getUrl(SIENAR_URLS.DASHBOARD),
		element: <Dashboard/>
	},
	{
		path: getUrl(SIENAR_URLS.REGISTER),
		element: <Register/>
	},
	{
		path: getUrl(SIENAR_URLS.REGISTER_SUCCESSFUL),
		element: <RegisterSuccessful/>
	},
	{
		path: getUrl(SIENAR_URLS.CONFIRM),
		element: <Confirm/>
	},
	{
		path: getUrl(SIENAR_URLS.CONFIRM_SUCCESSFUL),
		element: <ConfirmSuccessful/>
	},
	{
		path: getUrl(SIENAR_URLS.LOGIN),
		element: <Login/>
	},
	{
		path: getUrl(SIENAR_URLS.FORGOT_PASSWORD),
		element: <ForgotPassword/>
	},
	{
		path: getUrl(SIENAR_URLS.FORGOT_PASSWORD_SUCCESSFUL),
		element: <ForgotPasswordSuccessful/>
	},
	{
		path: getUrl(SIENAR_URLS.RESET_PASSWORD),
		element: <ResetPassword/>
	},
	{
		path: getUrl(SIENAR_URLS.RESET_PASSWORD_SUCCESSFUL),
		element: <ResetPasswordSuccessful/>
	},
)