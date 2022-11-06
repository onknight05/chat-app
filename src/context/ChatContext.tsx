import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IConversation } from '../services/interfaces';

export type ChatContextValue = {
	channel?: IConversation;
	setActiveChannel: (
		activeChannel?: IConversation,
		watchers?: { limit?: number; offset?: number },
		event?: React.BaseSyntheticEvent
	) => void;
};

export const ChatContext = createContext<ChatContextValue | undefined>(undefined);

type ChatProviderProps = PropsWithChildren<{ value: ChatContextValue; }>;

export const ChatProvider = ({ children, value }: ChatProviderProps) => {
	const [channel, setChannel] = useState<IConversation>();
	const setActiveChannel = useCallback(
		async (
			activeChannel?: IConversation,
			watchers: { limit?: number; offset?: number } = {},
			event?: React.BaseSyntheticEvent,
		) => {
			if (event && event.preventDefault) event.preventDefault();

			// TODO
			// if (activeChannel && Object.keys(watchers).length) {
			// 	await activeChannel.query({ watch: true, watchers });
			// }

			setChannel(activeChannel);
			// closeMobileNav();
		},
		[],
	);

	useEffect(() => {
		//
	}, []);

	const chatContextValue = useMemo(() => ({
		channel,
		setActiveChannel,
	}), [channel?.id]);

	return (
		<ChatContext.Provider value={chatContextValue}>
			{children}
		</ChatContext.Provider>
	);
};

export const useChatContext = () => {
	const contextValue = useContext(ChatContext);

	if (!contextValue) {
		throw new Error(
			'The useChatContext hook was called outside of the ChatContext provider. Make sure this hook is called within a child of the ChatProvider.'
		);
	}

	return contextValue;
};
