import _ from 'lodash';
import React, { useState } from 'react';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { ChannelInfo } from '../assets';
import CONSTANTS from '../constants';
import { useChannelActionContext } from '../context/ChannelActionContext';
import { useChannelStateContext } from '../context/ChannelStateContext';
import { useChatContext } from '../context/ChatContext';
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
	const { userId } = useChatContext();
	const { channel } = useChannelStateContext();

	const MessagingHeader = () => {
		if (!channel.data) return <></>;
		const members: IConversationMemberInfo[] = _.filter(channel.data.members, user => user.id !== userId);
		const additionalMembers = members.length - 3;

		if (channel.data.type === CONSTANTS.CONVERSATION.TYPE.INDIVIDUAL) {
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
					# {channel.data.name}
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
	return (
		<Window>
			<TeamChannelHeader setIsEditing={setIsEditing} />
			<MessageList />
			<ChatMessageInput/>
		</Window>
		/* <Thread /> */
	);
};

export default ChannelInner;
