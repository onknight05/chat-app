import React, { useState } from 'react';

import { UserList } from '.';
import { CloseCreateChannel } from '../assets';
import { useChannelActionContext } from '../context/ChannelActionContext';
import { useChatContext } from '../context/ChatContext';

interface IChannelNameInputProps {
	channelName?: string;
	setChannelName: any;
}
interface IEditChannelProps {
	setIsEditing: any;
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

const EditChannel = ({ setIsEditing }: IEditChannelProps) => {
	const { channel } = useChatContext();
	const { update, addMembers } = useChannelActionContext();
	const [channelName, setChannelName] = useState<string>(channel?.name || '');
	const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

	const updateChannel = async (event: any) => {
		if ( !channel ) return; // TODO
		event.preventDefault();

		const nameChanged = channelName !== channel?.name;

		if (nameChanged && update) {
			await update({ name: channelName }, { text: `Channel name changed to ${channelName}` });
		}

		if (selectedUserIds.length && addMembers) {
			await addMembers(selectedUserIds);
		}

		setChannelName('');
		setIsEditing(false);
	};

	return (
		<div className='edit-channel__container'>
			<div className='edit-channel__header'>
				<p>Edit Channel</p>
				<CloseCreateChannel setIsEditing={setIsEditing} />
			</div>
			<ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
			<UserList setSelectedUserIds={setSelectedUserIds} />
			<div className='edit-channel__button-wrapper' onClick={updateChannel}>
				<p>Save Changes</p>
			</div>
		</div>
	);
};

export default EditChannel;
