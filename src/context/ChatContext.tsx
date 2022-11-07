import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import { IConversation } from '../services/interfaces';
import { io, Socket } from 'socket.io-client';
import { apiServer } from '../services/request';
const cookie = new Cookies();

export type ChatContextValue = {
	channel?: IConversation;
	setActiveChannel: (
		activeChannel?: IConversation,
		watchers?: { limit?: number; offset?: number },
		event?: React.BaseSyntheticEvent
	) => void;
	userId: number;
	socket: Socket;
};
export const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const ChatProvider = ({ children }: PropsWithChildren<{}>) => {
	const userId = useMemo(() => +cookie.get('userId'), []);
	const [channel, setChannel] = useState<IConversation>();
	const socket = useRef<Socket>();
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
		},
		[],
	);
	useEffect(() => {
		if (userId) {
			socket.current = io(apiServer, {
				transports: ['websocket'],
				auth: {
					token: cookie.get('token'),
				},
				autoConnect: true,
			});
			// socket.current.emit("add-user", curUser.id); // TODO
		}
	}, [userId]);

	const chatContextValue = useMemo(() => ({
		channel,
		setActiveChannel,
		userId,
		socket: socket.current as Socket,
	}), [channel, setActiveChannel, userId]);

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
