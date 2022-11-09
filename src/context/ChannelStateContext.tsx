import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import CONSTANTS from '../constants';
import { IConversationDetail, IMessageData } from '../services/interfaces';
import ServiceRequest from '../services/request';
import { useChatContext } from './ChatContext';

interface IChannelStateContextValueChannel {
	data: IConversationDetail;
	messages: IMessageData[];
	appendMessage: (msg: IMessageData) => void;
	// addMembers?: (userIds: number[]) => Promise<void>;
	// update?: (data: any, options: any) => Promise<void>;
}
export type ChannelStateContextValue = {
	channel: IChannelStateContextValueChannel;
};
export const defaultChannelData: IConversationDetail = {
	type: CONSTANTS.CONVERSATION.TYPE.GROUP,
	name: 'Welcome',
	members: [],
	id: '',
	createdAt: new Date(),
	updatedAt: new Date(),
	createdBy: 0,
};
export const ChannelStateContext = createContext<ChannelStateContextValue|undefined>(undefined);
export const ChannelStateProvider = ({ children }: PropsWithChildren<{}>) => {
	const {channel, socket} = useChatContext();
	const [messages, setMessages] = useState<IMessageData[]>([]);
	const [channelDetail, setChannelDetail] = useState<IConversationDetail|undefined>();

	useEffect(() => {
		const loadData = async () => {
			const channelId = channel?.id;
			const msgs = channelId
			? await ServiceRequest.getConversationMessages(channelId)
			: [];
			const _channelDetail = channelId
			? await ServiceRequest.getConversationDetail(channel.id)
			: undefined;

			setMessages(msgs);
			setChannelDetail(_channelDetail);
		};

		loadData();
	}, [channel?.id]);

	// const getChannelMessages = useCallback(async () => {
	// 	const channelId = channel?.id;
	// 	const messages = channelId
	// 		? await ServiceRequest.getConversationMessages(channelId)
	// 		: [];
	// 	return messages;
	// }, [channel]);

	const appendMessage = useCallback(async (msg: IMessageData) => {
		setMessages((prevState: IMessageData[]) => [...prevState, msg]);
	}, []);

	const contextValue = useMemo(() => ({
		channel: {
			data: channelDetail || defaultChannelData,
			messages,
			appendMessage,
		},
	}), [channelDetail, messages, appendMessage]);

	return (
		<ChannelStateContext.Provider value={contextValue}>
			{children}
		</ChannelStateContext.Provider>
	);
};

export const useChannelStateContext = () => {
	const contextValue = useContext(ChannelStateContext);

	if (!contextValue) {
		throw new Error(
			'The useChannelStateContext hook was called outside of the ChannelStateContext provider. Make sure this hook is called within a child of the ChannelStateProvider.'
		);
	}

	return contextValue;
};
