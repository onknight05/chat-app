import React, { useEffect, useState } from 'react';
import { InviteIcon } from '../assets';
import { IUser } from '../services/interfaces';
import Avatar from 'react-avatar';
import ServiceRequest from '../services/request';

interface IListContainerProps {
	children: JSX.Element | JSX.Element[];
}
interface IUserItemProps {
	index: number;
	key: number;
	user: IUser;
	setSelectedUserIds: any;
}
interface IUserListProps {
	setSelectedUserIds: (userIds: number[]) => void;
}

const ListContainer = ({ children }: IListContainerProps) => {
	return (
		<div className='user-list__container'>
			<div className='user-list__header'>
				<p>User</p>
				<p>Invite</p>
			</div>
			{children}
		</div>
	);
};

const UserItem = ({ index, key, user, setSelectedUserIds }: IUserItemProps) => {
	const [selected, setSelected] = useState(false);

	const handleSelect = () => {
		if (selected) {
			setSelectedUserIds((prevUserIds: number[]) => prevUserIds.filter((prevId) => prevId !== user.id));
		} else {
			setSelectedUserIds((prevUserIds: number[]) => [...prevUserIds, user.id]);
		}

		setSelected((prevSelected) => !prevSelected);
	};

	return (
		<div className='user-item__wrapper' onClick={handleSelect}>
			<div className='user-item__name-wrapper'>
				<Avatar src={user.avatar} name={user.username} size='32' />
				<p className='user-item__name'>{user.username || user.id}</p>
			</div>
			{selected ? <InviteIcon /> : <div className='user-item__invite-empty' />}
		</div>
	);
};

const UserList = ({ setSelectedUserIds }: IUserListProps) => {
	const [users, setUsers] = useState<IUser[]>([]);
	const [loading, setLoading] = useState(false);
	const [listEmpty, setListEmpty] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const getUsers = async () => {
			if (loading) return;

			setLoading(true);

			try {
				const _users = await ServiceRequest.getAllUsers();

				if (_users.length) {
					setUsers(_users);
				} else {
					setListEmpty(true);
				}
			} catch (error) {
				setError(true);
			}
			setLoading(false);
		};

		getUsers();
	}, []);

	if (error) {
		return (
			<ListContainer>
				<div className='user-list__message'>
					Error loading, please refresh and try again.
				</div>
			</ListContainer>
		);
	}

	if (listEmpty) {
		return (
			<ListContainer>
				<div className='user-list__message'>
					No users found.
				</div>
			</ListContainer>
		);
	}

	return (
		<ListContainer>
			{loading ? <div className='user-list__message'>
				Loading users...
			</div> : (
				users?.map((user, i) => (
					<UserItem index={i} key={user.id} user={user} setSelectedUserIds={setSelectedUserIds} />
				))
			)}
		</ListContainer>
	);
};

export default UserList;
