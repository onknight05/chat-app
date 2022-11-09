import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import { IConversation } from '../services/interfaces';
import { io, Socket } from 'socket.io-client';
import ServiceRequest from '../services/request';
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
	// sockets: Socket[];
};
export const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const ChatProvider = ({ children }: PropsWithChildren<{}>) => {
	const userId = useMemo(() => +cookie.get('userId'), []);
	const [channel, setChannel] = useState<IConversation>();
	const socket = useRef<Socket>();
	// const sockets = useRef<Socket[]>();
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
			socket.current = io(process.env.REACT_APP_API_SERVER as string, {
				transports: ['websocket'],
				auth: {
					token: cookie.get('token'),
				},
				autoConnect: true,
			});
			// const channels = await ServiceRequest.getConversationInfos();
			// const nspSockets = channels.map(c => {
			// 	return io(`${process.env.REACT_APP_API_SERVER}/${c?.id}` as string, {
			// 		transports: ['websocket'],
			// 		auth: {
			// 			token: cookie.get('token'),
			// 		},
			// 		autoConnect: true,
			// 	});
			// });
		}
	}, [userId]);

	const chatContextValue = useMemo(() => ({
		channel,
		setActiveChannel,
		userId,
		socket: socket.current as Socket,
		// sockets
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
