﻿import { Form, Narrow } from '@/react-ui';
import { Typography } from '@mui/material';
import { logout, useAuthDispatch, useNavigate, validators } from '@/react-utils';
import { DELETED_ROUTE } from '@/keys';

export default function Delete() {
	const dispatch = useAuthDispatch();
	const navigate = useNavigate();

	return (
		<Narrow>
			<Form.Form
				action='/api/account'
				method='DELETE'
				title='Delete account'
				color='error'
				submitText='Delete account forever!'
				elevation={1}
				information={(
					<Typography>
						Are you sure you want to delete your account? This cannot be undone! Enter your password to confirm you wish to proceed.
					</Typography>
				)}
				onSuccess={successful => {
					if (successful) {
						dispatch(logout());
						navigate(DELETED_ROUTE);
					}
				}}
			>
				<Form.Textbox
					name='password'
					displayName='Password'
					type='password'
					validators={[validators.required()]}
					hideNonErrors
				/>
			</Form.Form>
		</Narrow>
	);
}