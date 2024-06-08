import {
  FC,
  useState,
  useContext,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { nanoid } from 'nanoid';

import { io } from 'socket.io-client';
import SocketIOClient from 'socket.io-client';

import { AuthContext } from '@contexts/auth';
import { useOutsideHandler } from '@hooks';
import { getTimeAgo } from '@utils';
import { darshanaApi } from '../../api/darshanaApi';
import { Notification } from '@interfaces/user';

interface IMenuItem {
  href: string;
  title: string;
}

interface IProps {
  styles: { [key: string]: string };
  options: Array<IMenuItem>;
  notifications: Array<any>;
  isNewNotification: boolean;
  setIsNewNotification: Dispatch<SetStateAction<boolean>>;
}

const NavMenuCore: FC<IProps> = ({
  styles,
  options,
  notifications,
  isNewNotification,
  setIsNewNotification,
}) => {
  const router = useRouter();
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const { user, logOut, updateNotification, readNotification } =
    useContext(AuthContext);
  const { t: tc } = useTranslation('common');
  const { t: tnf } = useTranslation('notifications');
  const [, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;
  const wrapperProfileRef = useRef(null);
  const wrapperNotificationRef = useRef(null);
  // const [notifications, setNotifications] = useState<any>([]);
  const handlerLogOut = async () => {
    await logOut();
    await router.push('/');
  };

  const handleProfileHideBox = () => {
    setOpenProfile(false);
  };

  const handleNotificationHideBox = () => {
    setOpenNotifications(false);
  };

  useOutsideHandler(wrapperProfileRef, handleProfileHideBox);
  useOutsideHandler(wrapperNotificationRef, handleNotificationHideBox);

  const fetchListNotifications = async () => {
    try {
      const { data: resp } = await darshanaApi(
        `/notifications?user_uuid=${user?.user_uuid}&order[][dir]=desc`
      );
      const { status, data } = resp;
      if (!status) {
        throw new Error('Error fetching notifications');
      }
      return data;
    } catch (error) {
      console.error({ error });
    }
  };
  const goToNotification = async (url: string, id: number) => {
    const { data } = await darshanaApi(`/notification/clicked/${id}`);
    readNotification(data.data.id, data.data);
    router.push(url);
  };
  return (
    <nav>
      <ul className={styles.menuList}>
        {user &&
          options &&
          options.map((option) => (
            <li key={nanoid()}>
              <Link href={option.href}>
                <a>
                  <b>{tc(option.title)}</b>
                </a>
              </Link>
            </li>
          ))}
        <li></li>
      </ul>

      {user && (
        <ul className={styles.menuOptions}>
          <li>
            <Link href="/help-center">
              <a>
                <Image
                  src="/images/icons/headset.svg"
                  width={24}
                  height={24}
                  alt="Icon headset"
                />
              </a>
            </Link>
          </li>
          <li ref={wrapperNotificationRef}>
            <button
              onClick={() => {
                setOpenNotifications(!openNotifications);
                setIsNewNotification(false);
              }}
            >
              <Image
                src="/images/icons/notification.svg"
                width={24}
                height={24}
                alt="Icon notification"
              />
              {isNewNotification && (
                <span className={styles.notificationPoint}></span>
              )}
            </button>
            {openNotifications && (
              <div className={styles.MenuNotification}>
                <ul>
                  {notifications?.length > 0 ? (
                    notifications?.map((notification: any) => (
                      <li
                        className={`${
                          notification.been_clicked == false
                            ? styles.noReadIt
                            : styles.menuOptionsList
                        }`}
                        key={nanoid()}
                      >
                        <div>
                          <a>
                            <div
                              onClick={() =>
                                goToNotification(
                                  notification.action,
                                  notification.id
                                )
                              }
                            >
                              <h2 className={styles.bold}>{`${tnf(
                                notification.n_type
                              )}`}</h2>
                              <p>
                                {tnf(notification.n_type + '_DESCRIPTION', {
                                  person_name: notification.person_name,
                                  project_name: notification.project_name,
                                })}
                              </p>
                              <p className={`text-12 ${styles.date}`}>
                                {getTimeAgo(
                                  new Date(),
                                  notification.created_at,
                                  lang
                                )}
                              </p>
                            </div>
                          </a>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className={styles.menuOptionsList} key={nanoid()}>
                      <div>
                        <h2 className={styles.bold}>{`${tnf(
                          'NOTIFICATIONS_EMPTY'
                        )}`}</h2>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </li>

          <li ref={wrapperProfileRef}>
            <button onClick={() => setOpenProfile(!openProfile)}>
              <Image
                src="/images/icons/user.svg"
                width={24}
                height={24}
                alt="Icon user"
              />
            </button>
            {openProfile && (
              <div className={styles.MenuProfile}>
                <ul>
                  <li className={styles.menuOptionsList}>
                    <Link href={`/profile/my-profile`}>
                      <a>{tc('my-profile')}</a>
                    </Link>
                  </li>
                  <li className={styles.menuOptionsList}>
                    <Link href={`/favorites`}>
                      <a>{tc('my-favourites')}</a>
                    </Link>
                  </li>
                  <li className={styles.menuOptionsList}>
                    <button onClick={handlerLogOut}>{tc('logout')}</button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavMenuCore;
