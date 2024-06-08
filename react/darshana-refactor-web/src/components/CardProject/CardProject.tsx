import { FC, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './cardProject.module.scss';
import { AuthContext } from '@contexts/auth';
import { useTranslation } from 'next-i18next';
import { darshanaApi } from '@api/darshanaApi';
import { toastMessage, typeFavorites } from '@utils';
import { useMediaQuery } from '@hooks';
interface Props {
  title?: string;
  company?: string;
  location?: string;
  showVisible?: boolean;
  showFavorite?: boolean;
  description?: string;
  time?: string;
  idProject?: string;
  image?: string;
  mobileImage: string;
  isFavorite?: boolean;
  ownerUuid?: string;
  isTop?: boolean;
  summary: string;
}

const defaultProps = {
  image: '/images/bg-project.png',
  title: '',
  company: '',
  location: 'City, Country',
  showVisible: false,
  showFavorite: true,
  ownerUuid: '',
};

const CardProject: FC<Props> = ({
  title,
  image,
  mobileImage,
  company,
  location,
  showVisible,
  showFavorite,
  time,
  idProject,
  isFavorite,
  ownerUuid,
  summary,
  isTop,
}) => {
  const { user } = useContext(AuthContext);
  const [favorite, setFavorite] = useState(isFavorite);
  const [link, setLink] = useState(`/talent/project/${idProject}`);
  const { t: tc } = useTranslation('common');
  const media767 = useMediaQuery('max-width', '481px');
  const addFavorite = async () => {
    const { data } = await darshanaApi.post(
      `/users/favorites/toggle/${idProject}`,
      { type: typeFavorites.project }
    );
    const { status } = data;
    if (!status) {
      toastMessage('error', 'Error');
      return;
    }

    setFavorite(!favorite);
    return;
  };
  // let imageUrl;
  // if (image === 'string') {
  //   imageUrl = null;
  // } else {
  //   imageUrl = image;
  // }

  useEffect(() => {
    if (user) {
      const isRecruiter = user?.workplaces.find(
        (workplace) => workplace.enable_business
      );
      if (isRecruiter) {
        return setLink(`/recruiter/project-detail/${idProject}`);
      }
      if (user.is_talent || user.user_uuid !== ownerUuid) {
        return setLink(`/talent/project/${idProject}`);
      } else {
        return setLink(`/recruiter/project-detail/${idProject}`);
      }
    }else{
      setLink("/auth/create-account")
    }
  }, [user, idProject]);
  const ImageUrl = () => {
    if(image==="string"){
      return '/images/bg-project.png';
    }
    if (!media767) {
      return mobileImage ? mobileImage : '/images/bg-project.png';
    }
    return user?.default_cover_image_url ? user?.default_cover_image_url : mobileImage ? mobileImage : '/images/bg-project.png';
  };
  return (
    <>
      <Link href={link} passHref>
        <div className={`card ${isTop ? styles.cardHighLight : styles.card}`}>
          <picture className={styles.cardPicture}>
            <Image
              className={styles.logoCorp}
              src={ImageUrl()}
              layout="responsive"
              objectFit="contain"
              width={320}
              height={240}
              alt="Corporación"
            />
          </picture>

          <div className={styles.cardInformation}>
            <div className={styles.cardBody}>
              <div className={styles.information}>
                <h3 className={`text-20 ${styles.projectName}`}>
                  <b>{title}</b>{' '}
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

                <p className={styles.location}>{company}</p>
                <p className={`text-12 ${styles.date}`}>{time}</p>
              </div>

              <ul className={`card--options`}>
                {showVisible && (
                  <li className="visible">
                    <button className="icon icon--visible" />
                  </li>
                )}

                {showVisible && (
                  <li className="favorite">
                    <button className="icon icon--edit" />
                  </li>
                )}

                {showFavorite && user && (
                  <li className="favorite">
                    <a
                      href="#"
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
                )}
              </ul>
            </div>
            <div
              className={styles.summary}
              dangerouslySetInnerHTML={{ __html: summary! }}
            />
            <div className={styles.cardFooter}>
              <button className="btn btn--return icon-right" type="button">
                <span>{tc('view-details')}</span>
                <Image
                  className="icon"
                  src="/images/icons/arrow-right.svg"
                  alt="back"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

CardProject.defaultProps = defaultProps;

export default CardProject;
