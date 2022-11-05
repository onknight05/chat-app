import React, { useState } from 'react';

import { UserList } from '.';
import { CloseCreateChannel } from '../assets';
import CONSTANTS from '../constants';
import ServiceRequest from '../services/request';

interface IChannelNameInputProps {
	channelName?: string;
	setChannelName: any;
}
interface ICreateChannelProps {
	createType: number;
	setIsCreating: (d: boolean) => void;
}

const ChannelNameInput = ({ channelName = '', setChannelName }: IChannelNameInputProps) => {
	const handleChange = (event: any) => {
		event.preventDefault();

		setChannelName(event.target.value);
	};

	return (
		<div className='channel-name-input__wrapper'>
			<p>Name</p>
			<input value={channelName} onChange={handleChange} placeholder='channel-name' />
			<p>Add Members</p>
		</div>
	);
};

const CreateChannel = ({ createType, setIsCreating }: ICreateChannelProps) => {
	const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
	const [channelName, setChannelName] = useState('');

	const createChannel = async (e: any) => {
		e.preventDefault();

		try {
			const newChannel = await ServiceRequest.createConversation({
				type: createType,
				name: channelName,
				memberIds: selectedUserIds
			});

			setChannelName('');
			setIsCreating(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='create-channel__container'>
			<div className='create-channel__header'>
				<p>{createType === CONSTANTS.CONVERSATION.TYPE.GROUP ? 'Create a New Channel' : 'Send a Direct Message'}</p>
				<CloseCreateChannel setIsCreating={setIsCreating} />
			</div>
			{createType === CONSTANTS.CONVERSATION.TYPE.GROUP && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
			<UserList setSelectedUserIds={setSelectedUserIds} />
			<div className='create-channel__button-wrapper' onClick={createChannel}>
				<p>{createType === CONSTANTS.CONVERSATION.TYPE.GROUP ? 'Create Channel' : 'Create Message Group'}</p>
			</div>
		</div>
	);
};

export default CreateChannel;
