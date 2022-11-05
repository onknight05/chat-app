// tslint:disable: max-classes-per-file
export interface CreateConversationDto {
	type: number;
	avatar?: string;
	name?: string;
	memberIds?: number[];
}

export interface UpdateConversationDto {
	type?: number;
	avatar?: string;
	name?: string;
}
