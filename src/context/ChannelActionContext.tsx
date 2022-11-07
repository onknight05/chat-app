import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo } from 'react';
import CONSTANTS from '../constants';
import { IMessageCreateDto } from '../services/dto';
import { IMessageData } from '../services/interfaces';
import { useChannelStateContext } from './ChannelStateContext';
import { useChatContext } from './ChatContext';

export type ChannelActionContextValue = {
	sendMessage: (msg: string) => void,
};

export const ChannelActionContext = createContext<ChannelActionContextValue | undefined>(undefined);

export const ChannelActionProvider = ({ children }: PropsWithChildren<{}>) => {
	const { socket } = useChatContext();
	const { channel } = useChannelStateContext();

	const sendMessage = useCallback(async (msg: string) => {
		if ( socket ) {
			const message: IMessageCreateDto = {
				content: msg,
				conversationId: channel.data.id,
				type: channel.data.type,
			};

			socket.emit(CONSTANTS.EVENT_NAMES.CONVERSATION.SEND_MESSAGE, message);
		} else {
			console.warn('Not support now.');
		}
	}, [channel, socket]);

	useEffect(() => {
		if ( socket ) {
			socket.on(CONSTANTS.EVENT_NAMES.CONVERSATION.SENDED, (msg: IMessageData) => {
				channel.appendMessage(msg);
			});
		}
	}, [channel.appendMessage, socket]);

	const contextValue = useMemo(() => ({
		sendMessage,
	}), [sendMessage]);

	return (
		<ChannelActionContext.Provider value={contextValue}>
			{children}
		</ChannelActionContext.Provider>
	);
};

export const useChannelActionContext = () => {
	const contextValue = useContext(ChannelActionContext);

	if (!contextValue) {
		throw new Error(
			'The useChannelActionContext hook was called outside of the ChannelActionContext provider. Make sure this hook is called within a child of the ChannelActionProvider.'
		);
	}

	return contextValue;
};
