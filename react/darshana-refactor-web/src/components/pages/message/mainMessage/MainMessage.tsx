import React, { Dispatch, FC, FormEvent, useEffect, useState } from 'react';

import Image from 'next/image';

import { IUserData } from '@interfaces/user';

import { darshanaApi } from '@api/darshanaApi';

import HeaderNavbar from './HeaderNavbar';
import MessageBox from './MessageBox';

interface IinitUser {
  id: number;
  person: {
    name: string;
    last_name: string;
  };
  profile_picture_url: string;
}
interface IProps {
  user: IinitUser;
  currentUser_uuid: string;
  socket: any;
  fromUser: IUserData | undefined;
  messages: [];
  setMessages: Dispatch<any>;
  setLastMessage: Dispatch<any>;
}

const MainMessage: FC<IProps> = (props) => {
  const {
    user,
    socket,
    currentUser_uuid,
    fromUser,
    messages,
    setMessages,
    setLastMessage,
  } = props;
  const [messageToSend, setMessageToSend] = useState('');

  useEffect(() => {
    const receiveMsg = (msj: {}) => {
      setLastMessage(msj);
      setMessages([...messages, msj]);
    };

    socket.on('message', (payload: {}) => receiveMsg(payload));

    return () => {
      socket.off('message', (payload: {}) => receiveMsg(payload));
    };
  }, [socket, messages, setMessages, setLastMessage]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMessage = {
      message: messageToSend,
      from_user_uuid: fromUser?.user_uuid,
      to_user_uuid: currentUser_uuid,
    };

    socket.emit('sendmessage', newMessage);
    setMessageToSend('');
  };

  // if (messages.length === 0) return <></>;

  return (
    <>
      <HeaderNavbar user={user} />

      <div className="message-send-box">
        <div className="message-box-container">
          <MessageBox messages={messages} fromUser={fromUser} />
        </div>

        <form className="flex-y-center send-message" onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="text"
            placeholder="Escribe aquí"
            value={messageToSend}
            onChange={(e) => setMessageToSend(e.target.value)}
          />

          <button className="flex-center btn-end" type="submit">
            <Image
              className="image"
              src="/images/icons/send.svg"
              alt="More"
              width={20}
              height={20}
            />
          </button>
        </form>
      </div>
    </>
  );
};

export default MainMessage;
