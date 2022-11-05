import React, { useState } from 'react';
import { ChannelActionContext, ChannelStateContext, ChatContext } from '../context/context';
interface IChatProps {
	children: any;
	client?: any;
}

const Chat = ({ children, client }: IChatProps) => {

	return (
		<ChatContext.Provider value={{ client }}>
			<ChannelStateContext.Provider value={{}}>
				<ChannelActionContext.Provider value={{}}>
					{children}
				</ChannelActionContext.Provider>
			</ChannelStateContext.Provider>
		</ChatContext.Provider>

	);
};

export default Chat;
