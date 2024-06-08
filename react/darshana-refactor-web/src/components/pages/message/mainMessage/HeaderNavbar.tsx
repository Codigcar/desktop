import React, { FC, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useOutsideHandler } from '@hooks';
import { useTranslation } from 'next-i18next';

interface IUser {
  id: number;
  person: {
    name: string;
    last_name: string;
  };
  profile_picture_url: string;
}

const HeaderNavbar: FC<{ user: IUser }> = ({ user }) => {
  const { t: tc } = useTranslation('common');
  const [openOptions, setOpenOptions] = useState(false);
  const wrapperOptionsRef = useRef(null);

  const handleOptionsHideBox = () => setOpenOptions(false);

  useOutsideHandler(wrapperOptionsRef, handleOptionsHideBox);

  return (
    <header className="header-navbar">
      <div className="user">
        <picture>
          <Image
            className="image"
            src={user.profile_picture_url || '/images/profile-2.png'}
            alt={user.person.name + user.person.last_name}
            width={40}
            height={40}
          />
        </picture>

        <p className="text-20 name">
          <b>{user.person.name + user.person.last_name}</b>
        </p>
      </div>

      <div className="more" ref={wrapperOptionsRef}>
        <button
          className="flex"
          type="button"
          onClick={() => setOpenOptions(!openOptions)}
        >
          <Image
            className="image"
            src="/images/icons/more-vertical.svg"
            alt="More"
            width={24}
            height={24}
          />
        </button>

        {openOptions && (
          <ul className="options">
            <li>
              <Link href={`/profile/${user.id}`}>
                <a>{tc('view-profile')}</a>
              </Link>
            </li>

            <li>
              <Link href="!#">
                <a>{tc('block')}</a>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};
export default HeaderNavbar;
