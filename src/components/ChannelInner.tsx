import _ from 'lodash';
import React, { useState } from 'react';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { ChannelInfo } from '../assets';
import CONSTANTS from '../constants';
import { useChannelActionContext } from '../context/ChannelActionContext';
import { useChannelStateContext } from '../context/ChannelStateContext';
import { IConversationMemberInfo, IUser } from '../services/interfaces';
import ChatMessageInput from './ChatMessageInput';
import MessageList from './MessageList';
import Window from './Window';

export const GiphyContext = React.createContext({});

interface ITeamChannelHeaderProps {
	setIsEditing: any;
}
interface IChannelInnerProps {
	setIsEditing: any;
}

const TeamChannelHeader = ({ setIsEditing }: ITeamChannelHeaderProps) => {
	const { channel } = useChannelStateContext();

	const userId = new Cookies().get('userId');

	const MessagingHeader = () => {
		if (!channel) return <></>;
		const members: IConversationMemberInfo[] = _.filter(channel.members, user => user.id !== userId);
		const additionalMembers = members.length - 3;

		if (channel.type === CONSTANTS.CONVERSATION.TYPE.INDIVIDUAL) {
			return (
				<div className='team-channel-header__name-wrapper'>
					{members.map((user, i) => (
						<div
							key={i}
							className='team-channel-header__name-multi'
						>
							<Avatar
								src={user.avatar}
								name={user.username}
								size='32'
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

	const getWatcherText = (_watcherCount?: number) => {
		if (!_watcherCount) return 'No users online';
		if (_watcherCount === 1) return '1 user online';
		return `${_watcherCount} users online`;
	};

	// TODO getWatcherText
	return (
		<div className='team-channel-header__container'>
			<MessagingHeader />
			<div className='team-channel-header__right'>
				<p className='team-channel-header__right-text'>
					{getWatcherText(0)}
				</p>
			</div>
		</div>
	);
};

const ChannelInner = ({ setIsEditing }: IChannelInnerProps) => {
	const [giphyState, setGiphyState] = useState(false);
	const { sendMessage } = useChannelActionContext();

	const overrideSubmitHandler = (message: any) => {
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
			<Window>
				<TeamChannelHeader setIsEditing={setIsEditing} />
				<MessageList />
				<ChatMessageInput handleSendMsg={overrideSubmitHandler} />
			</Window>
			{/* <Thread /> */}
		</GiphyContext.Provider>
	);
};

export default ChannelInner;
