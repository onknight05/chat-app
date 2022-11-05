import React, { useEffect, useState } from 'react';
import CONSTANTS from '../constants';
import { IConversation } from '../services/interfaces';
import ServiceRequest from '../services/request';

interface IChannelListOutput {
	channels: IConversation[];
	isError?: boolean;
	isLoading?: boolean;
}
interface IChannelListProps {
	type: number;
	list: (data: IChannelListOutput) => JSX.Element;
}

const ChannelList = ({ list, type }: IChannelListProps) => {
	const [channels, setChannels] = useState<IConversation[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
		const loadData = async () => {
			try {
				setIsLoading(true);
				const _conversations = await ServiceRequest.getConversationInfos();
				setIsLoading(false);
				setChannels(_conversations);
			} catch (error) {
				console.error( error );
				setIsError(true);
			}
		};

		loadData();
	}, []);

	return (
		<div>
			<h4 style={{backgroundColor: 'white'}}>{type === CONSTANTS.CONVERSATION.TYPE.GROUP ? 'Channels' : 'Direct Messages'}</h4>
			{list({ channels, isError, isLoading })}
		</div>
	);

};

export default ChannelList;
