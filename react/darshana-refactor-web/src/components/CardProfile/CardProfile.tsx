import { FC, useContext, useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { useTranslation } from 'next-i18next';
import { darshanaApi } from '@api/index';
import { toastMessage, typeFavorites } from '@utils';

import styles from './cardProfile.module.scss';
import { AuthContext } from '@contexts/auth';

interface Props {
  idTalent?: string;
  image?: string;
  name?: string;
  profession?: string;
  summary?: string;
  user_uuid?: string;
  isFavorite?: boolean;
  isTop?: boolean;
}

const defaultProps = {
  idTalent: '',
  image: '/images/profile-2.png',
  name: '',
  profession: '',
  summary: '',
  isFavorite: false,
};

const CardProfile: FC<Props> = ({
  idTalent,
  image,
  name,
  profession,
  summary,
  user_uuid,
  isFavorite,
  isTop,
}) => {
  const { t, i18n } = useTranslation('board');
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const [favorite, setFavorite] = useState(isFavorite);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // validateFavoritesTalents();
  }, []);

  const validateFavoritesTalents = async () => {
    const { data: resp } = await darshanaApi.get(
      `/users/favorites?type=${typeFavorites.talent}&favorite_uuid=${user_uuid}`,
    );

    const { data, status } = resp;
    if (status) {
      if (data.length > 0) {
        setFavorite(true);
      }
    }
    return;
  };

  const addFavorite = async () => {
    const { data } = await darshanaApi.post(
      `/users/favorites/toggle/${user_uuid}`,
      { type: typeFavorites.talent },
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
    <div className={`card ${isTop ? styles.cardHighLight : styles.card}`}>
      <div className={styles.cardHeader}>
        <picture>
          <Image
            className={styles.logo}
            src={
              image === 'string' || image === null
                ? '/images/profile-2.png'
                : image!
            }
            width={48}
            height={48}
            alt="Corporación"
          />
        </picture>

        <div className={styles.HeaderInformation}>
          <h3 className={`text-20 ${styles.title}`}>
            <b>{name}</b>{' '}
            {isTop && (
              <b
                style={{
                  color: '#19A79B',
                  fontSize: '10px',
                  backgroundColor: 'rgba(127, 141, 152,0.15)',
                  marginLeft: '8px',
                  borderRadius: '16px',
                  paddingInline: '8px',
                  height: '24px',
                }}
              >
                {tc('highlighted')}
              </b>
            )}
          </h3>
          <p className={styles.profession}>{profession}</p>
        </div>

        {user && (
          <ul className={`card--options ${styles.HeaderOptions}`}>
            <li className="favorite">
              <button
                className={`${
                  favorite
                    ? 'icon icon--favorite-active'
                    : 'icon icon--favorite'
                }`}
                onClick={(e: any) => {
                  e.preventDefault();
                  addFavorite();
                }}
                type="button"
              />
            </li>
          </ul>
        )}
      </div>

      <div className={styles.cardBody}>
        <p className="c-gray">{summary}</p>
      </div>
      <div className="flex-space-between">
        <Link href={`/profile/${idTalent}`}>
          <a className="flex" style={{ gap: '8px' }}>
            <picture>
              <Image
                src={'/images/icons/resume.svg'}
                width={24}
                height={24}
                alt="Darshana"
              />
            </picture>
            <h1 className="text-16 cursor-pointer">
              <strong>{t('see-resume')}</strong>
            </h1>
          </a>
        </Link>
        <div style={{ display: 'flex', gap: '12px' }}>
          <picture
          // onClick={() => router.push('/message/' + props?.user?.user_uuid)}
          >
            <Image
              className={styles.logo}
              src="/images/icons/mail.svg"
              width={22}
              height={22}
              alt="Corporación"
            />
          </picture>

          <picture>
            <Image
              className={styles.logo}
              src="/images/icons/download.svg"
              width={20}
              height={20}
              alt="Corporación"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

CardProfile.defaultProps = defaultProps;

export default CardProfile;
