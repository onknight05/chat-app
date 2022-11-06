import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { IMessageData } from '../services/interfaces';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie'; // TODO;

export default function MessageList() {
	const [messages, setMessages] = useState<IMessageData[]>([]);
	const scrollRef = useRef<any>();

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

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
		<Container>
			{ !messages.length ? EmptyState() : <></> }
			<div className='chat-messages'>
				{messages.map((message) => {
					return (
						<div
							ref={scrollRef}
							key={uuidv4()
							}>
							<div
								className={`message ${message.createdBy === new Cookies().get('userId') ? 'sended' : 'recieved'
									}`}
							>
								<div className='content '>
									<p>{message.content}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</Container>
	);
}

const Container = styled.div`
  display: flex;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
