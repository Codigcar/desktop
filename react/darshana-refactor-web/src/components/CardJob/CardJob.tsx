import { FC, useContext, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import styles from './cardJob.module.scss';
import { AuthContext } from '@contexts/auth';
import { darshanaApi } from '@api/darshanaApi';
import { toastMessage, typeFavorites } from '@utils';

interface Props {
  title?: string;
  company?: string;
  location?: string;
  showVisible?: boolean;
  showFavorite?: boolean;
  description?: string;
  time?: string;
  idJob?: string;
  image?: string;
  isFavorite?: boolean;
  ownerUuid?: string;
}

const defaultProps = {
  title: '',
  company: '',
  location: 'City, Country',
  showVisible: false,
  showFavorite: false,
  image: '/images/profile-placeholder.png',
  ownerUuid: '',
};

const CardJob: FC<Props> = ({
  title,
  company,
  location,
  showVisible,
  showFavorite,
  description,
  time,
  idJob,
  image,
  isFavorite,
  ownerUuid,
}) => {
  const { user } = useContext(AuthContext);
  const [favorite, setFavorite] = useState(isFavorite);
  const [link, setLink] = useState(`/talent/job/${idJob}`);
  const { t: tv } = useTranslation('validation');

  useEffect(() => {
    if (user) {
      const isRecruiter = user?.workplaces.find(
        (workplace) => workplace.enable_business
      );
      if (isRecruiter) {
        return setLink(`/recruiter/job-detail/${idJob}`);
      }
      if (user.is_talent || user.user_uuid !== ownerUuid) {
        setLink(`/talent/job/${idJob}`);
      } else {
        setLink(`/recruiter/job-detail/${idJob}`);
      }
    }else{
      setLink("/auth/create-account")
    }
  }, [user, idJob]);

  const addFavorite = async () => {
    const { data } = await darshanaApi.post(
      `/users/favorites/toggle/${idJob}`,
      { type: typeFavorites.job }
    );
    const { status } = data;
    if (!status) {
      toastMessage('error', `${tv('invalid-favorites')}`);
      return;
    }
    setFavorite(!favorite);
    return;
  };

  return (
    <Link href={link}>
      <a className={`card ${styles.card}`}>
        <div className={styles.cardHeader}>
          <picture>
            <Image
              className={styles.logoCorp}
              src={
                image ||
                'https://cdn.whiz.pe/api/v2/image/e5b8f779-06a6-45a7-b121-88e62182b8f3/png'
              }
              width={64}
              height={64}
              alt="Corporación"
            />
          </picture>

          <div className={styles.HeaderInformation}>
            <h3 className={`text-20 ${styles.title}`}>
              <b>{title}</b>
            </h3>
            <p className={styles.company}>{company}</p>
            <p className={styles.location}>{location}</p>
          </div>

          <ul className={`card--options`}>
            {showVisible && (
              <li className="visible">
                <button className="icon icon--visible" />
              </li>
            )}
            {showFavorite && (
              <li className="favorite">
                <button
                  type="button"
                  className={`${
                    favorite
                      ? 'icon icon--favorite-active'
                      : 'icon icon--favorite'
                  }`}
                  onClick={(e: any) => {
                    e.preventDefault();
                    addFavorite();
                  }}
                />
              </li>
            )}
          </ul>
        </div>

        <div className={styles.cardBody}>
          <p
            dangerouslySetInnerHTML={{ __html: description || '' }}
            style={{
              overflow: 'hidden',
            }}
          />
        </div>

        <div className={styles.cardFooter}>
          <p>{time}</p>
        </div>
      </a>
    </Link>
  );
};

CardJob.defaultProps = defaultProps;

export default CardJob;
