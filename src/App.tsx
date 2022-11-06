import React, { useState } from 'react';
import './App.css';
import { ChannelContainer, ChannelListContainer, FakeAuth } from './components';
import Cookies from 'universal-cookie';
import Chat from './components/Chat';

const cookies = new Cookies();
const authToken = cookies.get('token');

function App() {
	const [isCreating, setIsCreating] = useState(false);
	const [createType, setCreateType] = useState<number>();
	const [isEditing, setIsEditing] = useState(false);

	if (!authToken) {
		return (<FakeAuth />);
	}

	return (
		<div className='app__wrapper'>
			<Chat>
				<ChannelListContainer
					isCreating={isCreating}
					setIsCreating={setIsCreating}
					setCreateType={setCreateType}
					setIsEditing={setIsEditing}
				/>
				<ChannelContainer
					isCreating={isCreating}
					setIsCreating={setIsCreating}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
					createType={createType}
				/>
			</Chat>
		</div>
	);
}

export default App;
