﻿import { Button } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { StandaloneCheckbox, Form, Textbox } from '@/react-ui';
import { inject, useNavigate, validators, useAuthContext } from '@/react-utils';
import { DASHBOARD_ROUTE } from '@/keys';
import { FORGOT_PASSWORD_ROUTE } from '@identity/urls.ts';
import { LOGIN_SERVICE } from '@identity/services.ts';

export default function Login() {
	const navigate = useNavigate();
	const authContext = useAuthContext();
	const [ params ] = useSearchParams();

	const onLogin = async (successful: boolean) => {
		if (!successful) return;

		await authContext.loadUserData();
		const returnUrl = params.get('returnUrl');

		if (returnUrl) {
			params.delete('returnUrl');
			const queryParams = params.toString();
			navigate(`${returnUrl}?${queryParams}`)
		} else {
			navigate(DASHBOARD_ROUTE);
		}
	}

	return (
		<Form
			serviceKey={LOGIN_SERVICE}
			title='Log in'
			submitText='Log in'
			onSuccess={onLogin}
			additionalActions={(
				<Button
					component={Link}
					to={inject(FORGOT_PASSWORD_ROUTE)}
					color='secondary'
					variant='outlined'
				>
					I forgot my password
				</Button>
			)}
		>
			<Textbox
				name='accountName'
				displayName='Username or email address'
				validators={[validators.required()]}
				hideNonErrors
			/>
			<Textbox
				name='password'
				displayName='Password'
				type='password'
				validators={[validators.required()]}
				hideNonErrors
			/>
			<StandaloneCheckbox name='rememberMe'>
				Remember me
			</StandaloneCheckbox>
		</Form>
	)
}