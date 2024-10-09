﻿import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Done, Error, Feedback } from '@mui/icons-material';

import type { ValidationResult } from '@/react-utils';

interface Props {
	validations: ValidationResult[]
}

export default function ValidationList({validations}: Props) {
	return validations.length > 0 && (
		<List dense>
			{validations.map(e => {
				const validationColor = e.valid === true
					? 'success.main'
					: e.valid === false ? 'error.main' : 'inherit';

				const validationIcon = e.valid === true
					? <Done/>
					: e.valid === false ? <Error/> : <Feedback/>

				return (
					<ListItem
						key={e.message}
						sx={{color: validationColor}}
					>
						<ListItemIcon
							sx={{ color: 'inherit' }}
						>
							{validationIcon}
						</ListItemIcon>
						<ListItemText
							primary={e.message}
							sx={{ color: 'inherit' }}
						/>
					</ListItem>
				)
			})}
		</List>
	) || null;
}