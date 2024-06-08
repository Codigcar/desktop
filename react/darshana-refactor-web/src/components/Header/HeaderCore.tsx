import { FC, useContext, useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useMediaQuery, useOutsideHandler } from '@hooks';
import NavMenuCore from './NavMenuCore';
import { useTranslation } from 'next-i18next';

import styles from './header.module.scss';
import { AuthContext } from '@contexts/auth';
import { RECRUITER_OPTIONS, TALENT_OPTIONS } from '../../constants/links';
import { useRouter } from 'next/router';
import { darshanaApi } from '@api/darshanaApi';
import { nanoid } from 'nanoid';
import { getTimeAgo } from '@utils';
import { io } from 'socket.io-client';
import { Notification } from '@interfaces/user';
import { useSWRConfig } from 'swr';

interface IProps {
  logoJobBoard?: string;
}

const HeaderCore: FC<IProps> = ({ logoJobBoard }) => {
  const {
    user,
    logOut,
    updateNotification,
    readNotification,
    updateFinishStatusProject,
    updateStartStatusProject,
    updateStatusProjectHired,
    updateStatusJobHired,
  } = useContext(AuthContext);
  const router = useRouter();

  const { t: tc } = useTranslation('common');
  const { t: tnf } = useTranslation('notifications');
  const [, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;
  const media767 = useMediaQuery('max-width', '767px');
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [isNewNotification, setIsNewNotification] = useState(true);
  const isOpenMenu = open ? styles.openMenu : '';
  const socketRef = useRef<any>();
  const [notifications, setNotifications] = useState<any>([]);
  var pendingNotifications;

  const handlerLogOut = async () => {
    logOut();
    await router.push('/');
  };

  const handleHideBox = () => {
    setOpenProfile(false);
  };
  const handleNotificationHideBox = () => {
    setOpenNotifications(false);
  };
  const wrapperRef = useRef(null);
  const wrapperNotificationRef = useRef(null);
  const { mutate } = useSWRConfig();
  useOutsideHandler(wrapperRef, handleHideBox);
  // useOutsideHandler(wrapperNotificationRef, handleNotificationHideBox);
  useEffect(() => {
    fetchListNotifications().then((res) => {
      setNotifications(res);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      pendingNotifications = res?.filter(
        (item: any) => item.been_clicked == false,
      );
      pendingNotifications?.length > 0
        ? setIsNewNotification(true)
        : setIsNewNotification(false);
    });

    socketRef.current = io(`${process.env.NEXT_PUBLIC_API}`, {
      path: '/api/socket.io',
    });
    socketRef.current.emit('user_uuid', user?.user_uuid);
    socketRef.current.on('connect', () => {
      // console.log('[socket connect]: ', socketRef.current.connected);
    });
    socketRef.current.on('notification', (data: Notification) => {
      setNotifications((oldArray: any) => {
        setNotifications((oldArray: any) => [data, ...oldArray]);
      });
      mutate(`/project_applications/${user?.user_uuid}`);
      mutate(`/job_applications/${user?.user_uuid}`);
      if (data.n_type === 'PROJ_END') {
        const link = data.action.split('/');
        updateFinishStatusProject(parseInt(link[5], 10));
      }
      if (data.n_type === 'PROJ_START') {
        const link = data.action.split('/');
        updateStartStatusProject(parseInt(link[5], 10));
      }
      if (data.n_type === 'PROJ_HIRED_TALENT') {
        const link = data.action.split('/');
        updateStatusProjectHired(parseInt(link[5], 10), 2, true);
      }
      if (data.n_type === 'PROJ_UNHIRED_TALENT') {
        const link = data.action.split('/');
        updateStatusProjectHired(parseInt(link[5], 10), 0, false);
      }
      if (data.n_type === 'PROJ_FROM_POSTULATION_TO_SELECT_TALENT') {
        const link = data.action.split('/');
        updateStatusProjectHired(parseInt(link[5], 10), 1, false);
      }
      if (data.n_type === 'JOB_HIRED_TALENT') {
        const link = data.action.split('/');
        updateStatusJobHired(parseInt(link[5], 10), 2);
      }
      if (data.n_type === 'JOB_UNHIRED_TALENT') {
        const link = data.action.split('/');
        updateStatusJobHired(parseInt(link[5], 10), 0);
      }
      updateNotification(data);
    });
  }, [socketRef]);

  const fetchListNotifications = async () => {
    try {
      const { data: resp } = await darshanaApi(
        `/notifications?user_uuid=${user?.user_uuid}&order[dir]=desc`,
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
    router.push(`${url}?type=readNotification&idNotification=${id}`);
  };
  const OptionsNavbar = () => {
    const isRecruiter = user?.workplaces.find(
      (workplace) => workplace.enable_business,
    );
    if (isRecruiter) {
      return RECRUITER_OPTIONS;
    }
    if (user?.is_talent) {
      return TALENT_OPTIONS;
    } else {
      return RECRUITER_OPTIONS;
    }
  };

  return (
    <header id={styles.header} className={` ${styles.core} ${isOpenMenu} `}>
      <div className={`container ${styles.container}`}>
        {media767 && (
          <button
            className={`${styles.hamburger} ${open ? styles.open : ''}`}
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

        <Link href={'/'}>
          <a className={styles.logo}>
            <Image
              src={user ? '/images/logo.svg' : '/images/logo-dark.svg'}
              width={170}
              height={40}
              alt="Darshana"
            />
          </a>
        </Link>

        {media767 && (
          <div className={styles.headerOptions}>
            <button>
              {/*headset-mobile  */}
              {/*  <Image
                src="/images/icons/headset.svg"
                width={24}
                height={24}
                alt="Icon Help Center"
              /> */}
            </button>
            <div className={styles.profileIcon} ref={wrapperNotificationRef}>
              <button onClick={() => setOpenNotifications(!openNotifications)}>
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
            </div>
            <div className={styles.profileIcon} ref={wrapperRef}>
              <button onClick={() => setOpenProfile(!openProfile)}>
                <Image
                  src="/images/icons/user-outline.svg"
                  width={25}
                  height={25}
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
                    {/* {user!.is_talent && <li>Activar cuenta para negocios</li>} */}
                    {/* <li>Mis Favoritos</li> */}
                    <li className={styles.menuOptionsList}>
                      <button onClick={handlerLogOut}>{tc('logout')}</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        {media767 && openNotifications && (
          <div className={styles.MenuNotificationMovil}>
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
                              notification.id,
                            )
                          }
                        >
                          <h2 className={styles.bold}>{`${tnf(
                            notification.n_type,
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
                              lang,
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
                      'NOTIFICATIONS_EMPTY',
                    )}`}</h2>
                  </div>
                </li>
              )}
            </ul>
          </div>
        )}
        <NavMenuCore
          styles={styles}
          options={OptionsNavbar()}
          notifications={notifications}
          isNewNotification={isNewNotification}
          setIsNewNotification={setIsNewNotification}
        />
      </div>
    </header>
  );
};

export default HeaderCore;
