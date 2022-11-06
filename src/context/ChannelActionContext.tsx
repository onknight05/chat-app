import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IMessageData } from '../services/interfaces';

export type ChannelActionContextValue = {
	addMembers?: (userIds: number[]) => Promise<void>;
	update?: (data: any, options: any) => Promise<void>;
	sendMessage?: (d: any) => void,
};

export const ChannelActionContext = createContext<ChannelActionContextValue | undefined>(undefined);

type ChatProviderProps = PropsWithChildren<{ value: ChannelActionContextValue; }>;

export const ChannelActionProvider = ({ children, value }: ChatProviderProps) => {
	return (
		<ChannelActionContext.Provider value={value}>
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
