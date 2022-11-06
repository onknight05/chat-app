import React, { useState } from 'react';
import { ChatProvider } from '../context/ChatContext';
interface IChatProps {
	children: any;
}

const Chat = ({ children }: IChatProps) => {
	// useEffect(() => {
	// 	if (curUser) {
	// 		socket.current = io(apiServer, {
	// 			transports: ['websocket'],
	// 			auth: {
	// 				token: localStorage.getItem('token'),
	// 			},
	// 			autoConnect: true,
	// 		});
	// 		socket.current.emit("add-user", curUser.id); // TODO
	// 	}
	// }, [curUser]);

	return (
		<ChatProvider value={{}}>
			{children}
		</ChatProvider>

	);
};

export default Chat;
