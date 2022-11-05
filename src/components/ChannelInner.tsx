import _ from 'lodash';
import React, { useState } from 'react';
import {
	MessageList,
	MessageInput,
	Thread,
	Window,
	Avatar,
	MessageToSend,
} from 'stream-chat-react';
import { DefaultStreamChatGenerics } from 'stream-chat-react/dist/types/types';

import { ChannelInfo } from '../assets';
import CONSTANTS from '../constants';
import { useChannelActionContext, useChannelStateContext, useChatContext } from '../context/context';
import { IUser } from '../services/interfaces';

export const GiphyContext = React.createContext({});

interface ITeamChannelHeaderProps {
	setIsEditing: any;
}
interface IChannelInnerProps {
	setIsEditing: any;
}

const TeamChannelHeader = ({ setIsEditing }: ITeamChannelHeaderProps) => {
	const { channel, watcherCount } = useChannelStateContext();
	const { client } = useChatContext();

	const MessagingHeader = () => {
		const members: IUser[] = _.filter(channel.state.members, user => user.id !== client.userId);
		const additionalMembers = members.length - 3;

		if (channel.type === CONSTANTS.CONVERSATION.TYPE.GROUP) {
			return (
				<div className='team-channel-header__name-wrapper'>
					{members.map((user, i) => (
						<div
							key={i}
							className='team-channel-header__name-multi'
						>
							<Avatar
								image={user.avatar}
								name={user.username}
								size={32}
							/>
							<p className='team-channel-header__name user'>
								{user.username}
							</p>
						</div>
					))}

					{additionalMembers > 0 && (
						<p className='team-channel-header__name user'>
							and {additionalMembers} more
						</p>
					)}
				</div>
			);
		}

		return (
			<div className='team-channel-header__channel-wrapper'>
				<p className='team-channel-header__name'>
					# {channel.name}
				</p>
				<span
					style={{ display: 'flex' }}
					onClick={() => setIsEditing(true)}
				>
					<ChannelInfo />
				</span>
			</div>
		);
	};

	const getWatcherText = (_watcherCount: number) => {
		if (!_watcherCount) return 'No users online';
		if (_watcherCount === 1) return '1 user online';
		return `${_watcherCount} users online`;
	};

	return (
		<div className='team-channel-header__container'>
			<MessagingHeader />
			<div className='team-channel-header__right'>
				<p className='team-channel-header__right-text'>
					{getWatcherText(watcherCount)}
				</p>
			</div>
		</div>
	);
};

const ChannelInner = ({ setIsEditing }: IChannelInnerProps) => {
	const [giphyState, setGiphyState] = useState(false);
	const { sendMessage } = useChannelActionContext();

	const overrideSubmitHandler = (message: MessageToSend<DefaultStreamChatGenerics>) => {
		let updatedMessage = {
			attachments: message.attachments,
			mentioned_users: message.mentioned_users,
			parent_id: message.parent?.id,
			parent: message.parent,
			text: message.text,
		};

		if (giphyState) {
			updatedMessage = {
				...updatedMessage,
				text: `/giphy ${message.text}`,
			};
		}

		if (sendMessage) {
			sendMessage(updatedMessage);
			setGiphyState(false);
		}
	};

	return (
		<GiphyContext.Provider value={{ giphyState, setGiphyState }}>
			<div style={{ display: 'flex', width: '100%' }}>
				<Window>
					<TeamChannelHeader setIsEditing={setIsEditing} />
					<MessageList />
					<MessageInput
						overrideSubmitHandler={overrideSubmitHandler}
					/>
				</Window>
				<Thread />
			</div>
		</GiphyContext.Provider>
	);
};

export default ChannelInner;
