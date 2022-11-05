import { CreateConversationDto } from './dto';
import { IConversation, IConversationDetail, IMessageData, IUser } from './interfaces';
import axios, { AxiosResponse } from 'axios';
import * as _ from 'lodash';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

interface IGetQueryOptions {
	limit?: number;
	offset?: number;
}

function checkResponse(data: any, status?: number) {
	if (!status) return;
	if (status < 400) return;
	throw Error(`[ServiceRequest] return error - ${data}`);
}
function setAxiosHeaderAuthen(token: string) {
	// tslint:disable-next-line: no-string-literal
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const apiServer = 'http://localhost:3000';
const paths = {
	users: 'users',
	conversations: 'conversations',
	fake: 'fake',
};

axios.defaults.baseURL = apiServer;
axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.transformResponse = (data, data1, statusCode) => {
// 	let resp
// 	try {
// 		checkResponse( data, statusCode );
// 		resp = JSON.parse(data)

// 		return resp;
// 	} catch (error) {
// 		throw Error(`[ServiceRequest] Error parsing response JSON data - ${JSON.stringify(error)}`)
// 	}
// }

if (cookies.get('token')) {
	setAxiosHeaderAuthen(cookies.get('token'));
}

interface IObject { [key: string]: any; }

function getQueryString(query: IObject): string {
	if (!_.keys(query).length) return '';

	return _.reduce(query, (res, value, key) => {
		res += key + '=' + encodeURIComponent(value);
		return res;
	}, '?');
}

class ServiceRequest {

	static async login(userId: string | number) {
		const token = await (await axios.post(paths.fake + '/login', { userId })).data;

		if (!token) throw Error('Token error');
		setAxiosHeaderAuthen(token);
		return token;
	}

	static async getUser(): Promise<IUser> {
		const user = await (await axios.get(paths.users + '/detail')).data;
		localStorage.setItem('user', JSON.stringify(user));
		return user;
	}

	static async getAllUsers(): Promise<IUser[]> {
		const users = await (await axios.get(paths.users)).data;
		return users;
	}

	static async createConversation(data: CreateConversationDto): Promise<IConversation[]> {
		const basicConversationInfos = await (await axios.post(paths.conversations, data)).data;
		return basicConversationInfos;
	}

	static async getConversationInfos(): Promise<IConversation[]> {
		const basicConversationInfos = await (await axios.get(paths.conversations)).data;
		return basicConversationInfos;
	}

	static async getConversationDetail(conversationId: string): Promise<IConversationDetail> {
		const conversation = await (await axios.get(`${paths.conversations}/${conversationId}`)).data;
		return conversation;
	}

	static async getConversationMessages(conversationId: number | string, options?: IGetQueryOptions): Promise<IMessageData[]> {
		const queryStr = options ? getQueryString(options) : '';
		const basicConversationInfos = await (await axios.get(paths.conversations + `/${conversationId}/messages` + queryStr)).data;

		return basicConversationInfos;
	}

	static async addConversationMembers(conversationId: string, userIds: number[]): Promise<void> {
		await axios.post(`${paths.conversations}/${conversationId}/add`, { ids: userIds });
	}

	static async removeConversationMembers(conversationId: string, userIds: number[]): Promise<void> {
		await axios.post(`${paths.conversations}/${conversationId}/remove`, { ids: userIds });
	}

}

export default ServiceRequest;
