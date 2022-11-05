import React, { useState } from 'react';
import Cookies from 'universal-cookie';

import { ChannelList, TeamChannelList } from '.';
import LogoIcon from '../assets/logo.png';
import LogoutIcon from '../assets/logout.png';
import CONSTANTS from '../constants';

const cookies = new Cookies();

interface ISideBarProps {
	logout: () => void;
}
interface IChannelListContentProps {
	setIsCreating: any;
	setCreateType: any;
	setIsEditing: any;
	isCreating?: boolean;
	setToggleContainer?: any;
}
interface IChannelListContainer {
	isCreating: boolean;
	setCreateType: any;
	setIsCreating: any;
	setIsEditing: any;
}

const SideBar = ({ logout }: ISideBarProps) => (
	<div className='channel-list__sidebar'>
		<div className='channel-list__sidebar__icon1'>
			<div className='icon1__inner'>
				<img src={LogoIcon} alt='Hospital' width='30' />
			</div>
		</div>
		<div className='channel-list__sidebar__icon2'>
			<div className='icon1__inner' onClick={logout}>
				<img src={LogoutIcon} alt='Logout' width='30' />
			</div>
		</div>
	</div>
);
const CompanyHeader = () => (
	<div className='channel-list__header'>
		<p className='channel-list__header__text'>Dak chat</p>
	</div>
);

const ChannelListContent = ({
	isCreating,
	setIsCreating,
	setCreateType,
	setIsEditing,
	setToggleContainer,
}: IChannelListContentProps) => {
	const logout = () => {
		cookies.remove('token');
		cookies.remove('userId');
		cookies.remove('username');
		cookies.remove('fullName');
		cookies.remove('avatarURL');
		cookies.remove('hashedPassword');
		cookies.remove('phoneNumber');

		window.location.reload();
	};

	return (
		<>
			<SideBar logout={logout} />
			<div className='channel-list__list__wrapper'>
				<CompanyHeader />
				{/* <ChannelSearch setToggleContainer={setToggleContainer} /> */}
				<ChannelList
					type={CONSTANTS.CONVERSATION.TYPE.GROUP}
					list={data => (
						<TeamChannelList
							channels={data.channels}
							error={data.isError}
							loading={data.isLoading}
							type={CONSTANTS.CONVERSATION.TYPE.GROUP}
							isCreating={isCreating}
							setIsCreating={setIsCreating}
							setCreateType={setCreateType}
							setIsEditing={setIsEditing}
							setToggleContainer={setToggleContainer}
						/>
					)}
				/>
				<ChannelList
					type={CONSTANTS.CONVERSATION.TYPE.INDIVIDUAL}
					list={data => (
						<TeamChannelList
							channels={data.channels}
							error={data.isError}
							loading={data.isLoading}
							type={CONSTANTS.CONVERSATION.TYPE.INDIVIDUAL}
							isCreating={isCreating}
							setIsCreating={setIsCreating}
							setCreateType={setCreateType}
							setIsEditing={setIsEditing}
							setToggleContainer={setToggleContainer}
						/>
					)}
				/>
			</div>
		</>
	);
};

const ChannelListContainer = ({
	isCreating,
	setCreateType,
	setIsCreating,
	setIsEditing,
}: IChannelListContainer) => {
	const [toggleContainer, setToggleContainer] = useState(false);

	return (
		<>
			<div className='channel-list__container'>
				<ChannelListContent
					setIsCreating={setIsCreating}
					setCreateType={setCreateType}
					setIsEditing={setIsEditing}
				/>
			</div>

			{/* <div
				className='channel-list__container-responsive'
				style={{
					left: toggleContainer ? '0%' : '-89%',
					backgroundColor: '#005fff',
				}}
			>
				<div
					className='channel-list__container-toggle'
					onClick={() =>
						setToggleContainer(
							(prevToggleContainer) => !prevToggleContainer
						)
					}
				></div>
				<ChannelListContent
					setIsCreating={setIsCreating}
					setCreateType={setCreateType}
					setIsEditing={setIsEditing}
					setToggleContainer={setToggleContainer}
				/>
			</div> */}
		</>
	);
};

export default ChannelListContainer;
