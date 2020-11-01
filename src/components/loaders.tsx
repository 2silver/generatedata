import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export const SmallSpinner = (props: any): any => (
	<CircularProgress
		disableShrink
		size={20}
		style={{ color: '#999999', margin: 5 }}
		{...props}
	/>
);
export const MediumSpinner = (props: any): any => (
	<CircularProgress
		disableShrink
		size={40}
		style={{ color: '#999999', margin: 5 }}
		{...props}
	/>
);
