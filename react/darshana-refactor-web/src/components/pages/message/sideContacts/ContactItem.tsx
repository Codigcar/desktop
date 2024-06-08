import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { darshanaApi } from '@api/darshanaApi';

interface IUser {
  name: string;
  profile_picture_url: string;
  read: boolean;
  user_uuid: string;
}

interface IProps {
  user: IUser;
  currentUser_uuid: string;
  lastMessage: {
    been_read?: boolean;
    message?: string;
    from_user_uuid?: string;
    to_user_uuid?: string;
  };
}

const ContactItem: FC<IProps> = ({ user, currentUser_uuid, lastMessage }) => {
  const router = useRouter();
  const activeContact = user.user_uuid === currentUser_uuid ? 'active' : '';
  const [unreadMessages, setUnreadMessages] = useState([]);

  const chatFromToUser = [
    lastMessage.from_user_uuid,
    lastMessage.to_user_uuid,
  ].includes(user.user_uuid);

  const lastUserMessage = chatFromToUser ? lastMessage.message : '';

  const loadUserMessages = async () => {
    try {
      let res = await darshanaApi(`/chats/get_unread_messages/${user.user_uuid}`)
      if(res?.data?.existingChat)
        setUnreadMessages(res?.data?.existingChat);
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    loadUserMessages();
  }, []);

  const resetNotif = () => {
    setUnreadMessages([]);
  }

  return (
    <div
      className={`contact-item ${activeContact}`}
      key={user.user_uuid}
      onClick={() => router.push(user.user_uuid)}
    >
      <picture>
        <Image
          className="image"
          src={user.profile_picture_url}
          alt={user.name}
          width={40}
          height={40}
        />
      </picture>

      <div className="data">
        <div className='row col-12' onClick={resetNotif}>
          <p className="name">{user.name}</p>
          <p className={unreadMessages.length > 0 ? "after" : ""}/>
        </div>

        <p className="last-message">{lastUserMessage}</p>
      </div>
    </div>
  );
};
export default ContactItem;
