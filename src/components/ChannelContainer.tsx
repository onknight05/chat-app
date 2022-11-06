import React from 'react';
import { ChannelInner, CreateChannel, EditChannel, Channel, MessageText } from '.';

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

	return (
		<div className=' channel__container'>
			<Channel>
				<ChannelInner setIsEditing={setIsEditing} />
			</Channel>
		</div>
	);
};

export default ChannelContainer;
