import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { IConversationDetail } from '../services/interfaces';
import ServiceRequest from '../services/request';
import { useChatContext } from './ChatContext';

export type ChannelStateContextValue = {
	channel?: IConversationDetail;
};

export const ChannelStateContext = createContext<ChannelStateContextValue | undefined>(undefined);

type ChatProviderProps = PropsWithChildren<{ value: ChannelStateContextValue; }>;

export const ChannelStateProvider = ({ children }: ChatProviderProps) => {
	const {channel} = useChatContext();
	const [channelDetail, setChannelDetail] = useState<IConversationDetail>();

	useEffect(() => {
		const loadData = async () => {
			const _channelDetail = await ServiceRequest.getConversationDetail(channel?.id as string);
			setChannelDetail(_channelDetail);
		};

		loadData();
	});

	return (
		<ChannelStateContext.Provider value={{channel: channelDetail}}>
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
