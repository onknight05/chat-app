import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useChatContext } from '../context/ChatContext';
import { ChannelStateProvider } from '../context/ChannelStateContext';
import { ChannelActionProvider, useChannelActionContext } from '../context/ChannelActionContext';
import { IMessageData } from '../services/interfaces';
import ServiceRequest from '../services/request';

const Channel = ({ children }: PropsWithChildren<{}>) => {
	const { channel } = useChatContext();
	const [messages, setMessages] = useState<IMessageData[]>([]);

	useEffect(() => {
		const loadData = async () => {
			const msgs = await ServiceRequest.getConversationMessages(channel?.id as string);
			setMessages(msgs);
		};

		loadData();
	});

	return (
		<>
			<ChannelStateProvider value={{}}>
				<ChannelActionProvider value={{}}>
					{children}
				</ChannelActionProvider>
			</ChannelStateProvider>
		</>
	);
}

export default Channel;
