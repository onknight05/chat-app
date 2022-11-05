import * as _ from 'lodash';
import React, { useState } from 'react';
import { Avatar } from 'stream-chat-react';

import { AddChannel } from '../assets';
import CONSTANTS from '../constants';
import { IConversation } from '../services/interfaces';

interface ITeamChannelListProps {
	channels: IConversation[];
	setToggleContainer: any;
	children?: JSX.Element;
	error?: boolean;
	loading?: boolean;
	type: number;
	isCreating: any;
	setIsCreating: any;
	setCreateType: any;
	setIsEditing: any;
}

const TeamChannelList = ({
	channels,
	setToggleContainer,
	error = false,
	loading,
	type,
	isCreating,
	setIsCreating,
	setCreateType,
	setIsEditing,
}: ITeamChannelListProps) => {
	const [curSelectedId, setCurSelectedId] = useState<string>();

	const changeCurrentConversation = (conversation: IConversation) => {
		console.log( '============== c', conversation );

		setCurSelectedId(conversation.id);
		// onChangeConversation && onChangeConversation(conversation);
	};

	if (error) {
		return type === CONSTANTS.CONVERSATION.TYPE.GROUP ? (
			<div className='team-channel-list'>
				<p className='team-channel-list__message'>
					Connection error, please wait a moment and try again.
				</p>
			</div>
		) : null;
	}

	if (loading) {
		return (
			<div className='team-channel-list'>
				<p className='team-channel-list__message loading'>
					{type === CONSTANTS.CONVERSATION.TYPE.GROUP ? 'Channels' : 'Messages'} loading...
				</p>
			</div>
		);
	}

	const elements = () => {
		if (!channels.length) return;

		const showChannels = _.filter(channels, c => c.type === type);

		return <div>
			{
				_.map(showChannels, c => {
					console.log(showChannels, c.name);
					return <div
						key={c.id}
						className={`team-channel-list__item ${curSelectedId === c.id ? 'selected' : ''}`}
						onClick={() => changeCurrentConversation(c)}
					>
						{/* <Avatar image={c.avatar} name={c.name || `user ${c.directUserId}`} size={30}></Avatar> */}
						<div className='team-channel-list__item username' >
							<h5>{c.name || `(user ${c.directUserId})`}</h5>
						</div>
					</div>;
				})
			}
		</div>;
	};

	return (
		<div className='team-channel-list'>
			<div className='team-channel-list__header'>
				<p className='team-channel-list__header__title'>
					{type === CONSTANTS.CONVERSATION.TYPE.GROUP ? 'Channels' : 'Direct Messages'}
				</p>
				<AddChannel
					// isCreating={isCreating}
					setIsCreating={setIsCreating}
					setCreateType={setCreateType}
					setIsEditing={setIsEditing}
					type={type}
					setToggleContainer={setToggleContainer}
				/>
			</div>
			{elements()}
		</div>
	);
};

export default TeamChannelList;
