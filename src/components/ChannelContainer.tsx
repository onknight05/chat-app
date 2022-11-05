import React from 'react';
import { Channel, MessageText } from 'stream-chat-react';

import { ChannelInner, CreateChannel, EditChannel } from '.';

interface IChannelContainerProps {
	isCreating: boolean;
	setIsCreating: any;
	isEditing: boolean;
	setIsEditing: any;
	createType?: number;
}

const ChannelContainer = ({
	isCreating,
	setIsCreating,
	isEditing,
	setIsEditing,
	createType,
}: IChannelContainerProps) => {
	if (isCreating && createType) {
		return (
			<div className='channel__container'>
				<CreateChannel
					createType={createType}
					setIsCreating={setIsCreating}
				/>
			</div>
		);
	}

	if (isEditing) {
		return (
			<div className='channel__container'>
				<EditChannel setIsEditing={setIsEditing} />
			</div>
		);
	}

	const EmptyState = () => (
		<div className='channel-empty__container'>
			<p className='channel-empty__first'>
				This is the beginning of your chat history.
			</p>
			<p className='channel-empty__second'>
				Send messages, attachments, links, emojis, and more!
			</p>
		</div>
	);

	return (
		<div className=' channel__container'>
			<Channel
				EmptyStateIndicator={EmptyState}
				Message={(messageProps, i) => (
					<MessageText key={i} {...messageProps} />
				)}
			>
				<ChannelInner setIsEditing={setIsEditing} />
			</Channel>
		</div>
	);
};

export default ChannelContainer;
