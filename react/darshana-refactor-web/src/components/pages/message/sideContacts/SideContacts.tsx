import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { darshanaApi } from '@api/darshanaApi';
import { CInputWithIcon } from '@components/Atoms';

import ContactItem from './ContactItem';

interface IProps {
  currentUser_uuid: string;
  placeholder: string;
  lastMessage: object;
  // setCurrentUser_uuid: (user_uuid: string) => void;
}

interface IUser {
  name: string;
  profile_picture_url: string;
  read: boolean;
  user_uuid: string;
}

const SideContacts: FC<IProps> = ({
  currentUser_uuid,
  lastMessage,
  placeholder,
}) => {
  const [chats, setChats] = useState([]);

  const methods = useForm({
    mode: 'onChange',
  });

  const loadChats = async () => {
    try {
      const { data: resp } = await darshanaApi('/chats');
      const { status, data } = resp;

      if (!status) {
        throw new Error('Error fetching');
      }

      setChats(data);
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  return (
    <>
      <header className="header-navbar">
        <FormProvider {...methods}>
          <CInputWithIcon
            classNameDiv="form-group"
            name="search_contact"
            placeholder={placeholder}
            imageUrl={'/images/icons/search.svg'}
          />
        </FormProvider>
      </header>

      <div className="contact-list">
        {chats.map((user: IUser) => (
          <ContactItem
            user={user}
            currentUser_uuid={currentUser_uuid}
            lastMessage={lastMessage}
            key={user.user_uuid}
          />
        ))}
      </div>
    </>
  );
};

export default SideContacts;
