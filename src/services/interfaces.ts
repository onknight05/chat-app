interface IAuditable {
	createdAt: Date;
	updatedAt: Date;
}
export interface IUser extends IAuditable {
	id: number;
	username: string;
	email: string;
	avatar: string;
	status: number;
	isActiveMember: boolean;
	isBlockStranger: boolean;
	blockUserIds: number[];
	lastLogin: Date;
}

export interface IConversation extends IAuditable {
	id: string;
	type: number;
	createdBy: number;
	avatar?: string;
	name?: string;
	directUserId?: number;
	groupId?: number;
}

export interface IConversationMemberInfo {
	type: number;
	id: number;
	username: string;
	avatar: string;
	lastLogin?: Date;
}
export interface IConversationDetail extends IConversation {
	members: IConversationMemberInfo[]
}

export interface ISeenData {
	userId: number;
	time: Date;
}

export interface IMessageData extends IAuditable {
	conversationId: string;
	type: number;
	content: string;
	createdBy: number;
	seen: ISeenData[];
}