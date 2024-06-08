import React, { FC, useEffect, useState } from 'react';

import { io } from 'socket.io-client';

import { IUserData } from '@interfaces/user';

import { darshanaApi } from '@api/darshanaApi';

import MainMessage from './mainMessage/MainMessage';
import SideContacts from './sideContacts/SideContacts';

interface IProps {
  paramUser_uuid: string;
  fromUser: IUserData | undefined;
  placeholder: string;
}

const initUser = {
  id: 0,
  person: {
    name: '',
    last_name: '',
  },
  profile_picture_url: '',
};

const MessageContainer: FC<IProps> = (props) => {
  const { paramUser_uuid, fromUser, placeholder } = props;

  const publicApi = `${process.env.NEXT_PUBLIC_API}`;
  const socket = io(publicApi, {
    path: '/api/socket.io',
  });

  socket.emit('user_uuid', fromUser?.user_uuid);

  const [user, setUser] = useState(initUser);
  const [messages, setMessages] = useState<any>([]);
  const [lastMessage, setLastMessage] = useState({});

  const loadUserMessages = async (uuid: string) => {
    try {
      const { data: resp } = await darshanaApi(`/chat/${uuid}`);
      const { status, data } = resp;

      if (!status) {
        throw new Error('Error fetching chats');
      }

      setUser(data.user);
      setMessages(data.messages);
      // setLastMessage(data.messages.at(-1));
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    if (paramUser_uuid) loadUserMessages(paramUser_uuid);
  }, [paramUser_uuid]);

  return (
    <section id="message-container">
      <aside id="side-contacts">
        <SideContacts
          currentUser_uuid={paramUser_uuid}
          lastMessage={lastMessage}
          placeholder={placeholder}
        />
      </aside>

      <section id="main-message">
        <MainMessage
          socket={socket}
          user={user}
          currentUser_uuid={paramUser_uuid}
          fromUser={fromUser}
          messages={messages}
          setMessages={setMessages}
          setLastMessage={setLastMessage}
        />
      </section>
    </section>
  );
};

export default MessageContainer;
