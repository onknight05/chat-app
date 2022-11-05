import { createContext, useContext } from 'react';
import { IConversation, IUser } from './../services/interfaces';

export type TChannelStateContext = {
	state?: { members: IUser[] };
	type?: number;
	name?: string;
	watcherCount?: number;
};
export const ChannelStateContext = createContext<TChannelStateContext>({
	type: 0,
	name: 'Welcome!',
	state: {
		members: [],
	},
	watcherCount: 0,
});
export const useChannelStateContext = () => useContext(ChannelStateContext);

interface ITChatContextClient {
	userId: number;
}
interface ITChatContextChannel {
	addMembers: (userIds: number[]) => Promise<void>;
	update: (data: any, options: any) => Promise<void>;
	data?: IConversation;
	setData: (c: IConversation) => void;
}
export type TChatContext = {
	client?: ITChatContextClient,
	channel?: ITChatContextChannel,
};
export const ChatContext = createContext<TChatContext>({
	client: {
		userId: 0,
	},
	channel: {
		addMembers: async (userIds: number[]) => {
			console.log('addMembers: ', userIds);
		},
		update: async (data: any, options: any) => {
			console.log('update: ', data, options);
		},
		setData: () => {},
	}
});
export const useChatContext = () => useContext(ChatContext);


export type TChannelActionContext = {
	sendMessage?: (d: any) => void,
};
export const ChannelActionContext = createContext<TChannelActionContext>({
	sendMessage: (d) => {
		console.log('sendMessage: ', d);
	}
});
export const useChannelActionContext = () => useContext(ChannelActionContext);

// export type TestContent = {
// 	copy: string
// 	setCopy: (c: string) => void
// };
// export const MyTestContext = createContext<TestContent>({
// 	copy: 'Hello World', // set a default value
// 	setCopy: () => {},
// });
// export const useTestContext = () => useContext(MyTestContext);
