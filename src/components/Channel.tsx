import React, { PropsWithChildren } from 'react';
import { ChannelStateProvider } from '../context/ChannelStateContext';
import { ChannelActionProvider } from '../context/ChannelActionContext';

const Channel = ({ children }: PropsWithChildren<{}>) => {
	return (
		<>
			<ChannelStateProvider>
				<ChannelActionProvider>
					{children}
				</ChannelActionProvider>
			</ChannelStateProvider>
		</>
	);
}

export default Channel;
