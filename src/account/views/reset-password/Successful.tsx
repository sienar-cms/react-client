﻿import { Link } from 'react-router-dom';
import { StatusPage } from '@/react-ui';
import { inject } from '@/react-utils';
import { LOGIN_ROUTE } from '@account/keys';

export default function Successful() {
	return (
		<StatusPage title='Password reset successfully'>
			You have reset your password successfully! You can now <Link to={inject(LOGIN_ROUTE)}>log in</Link>.
		</StatusPage>
	)
}