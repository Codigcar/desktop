import React, { Children, FC, useContext } from 'react';
import Image from 'next/image';
import styles from './cardDetail.module.scss';
import Link from 'next/link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { modalDelete, toastMessage } from '@utils';
import { darshanaApi } from '@api/darshanaApi';
import Router from 'next/router';
import Skeleton from 'react-loading-skeleton';
import { useTranslation } from 'next-i18next';
import { AuthContext } from '@contexts/auth';
import { OwnerProject, ProjectDetailById } from '@api/getProjectDetailById';
import { Owner } from '@interfaces/projects';
import { useFetchIndustries } from '@hooks/useFetchSWR';
import i18nConfig from '@constants/i18n';
interface ComponentProps {
  type: string;
  title: string | undefined;
  place: string;
  min_salary: number | string | undefined;
  max_salary: number | string | undefined;
  hourly_wage: number | string | undefined;
  salary: number | string | null | undefined;
  publish?: string;
  projectTime?: string;
  typeContract?: string;
  idPublish?: number | undefined;
  children?: any;
  business_id?: string | number;
  owner?: OwnerProject | Owner | undefined;
  project?: ProjectDetailById;
}

const CardDetail: FC<ComponentProps> = ({
  children,
  type,
  title,
  place,
  min_salary,
  max_salary,
  hourly_wage,
  salary,
  publish,
  projectTime,
  typeContract,
  idPublish = 0,
  business_id,
  owner,
  project,
}) => {
  const { user } = useContext(AuthContext);
  const [tr, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;
  const { t: tp } = useTranslation('postulation');
  const { t: tpr } = useTranslation('profile');
  const { t: tc } = useTranslation('common');
  const { data: industriesMe } = useFetchIndustries('me/industries', lang);
  const handlerClickDeletePost = async (e: { preventDefault: any }) => {
    e.preventDefault();

    const resp = await modalDelete(styles, tc);
    if (resp) {
      const deletePost = {
        id: idPublish,
        business_id,
      };
      let resp;
      if (type === 'project') {
        resp = await darshanaApi.delete('/projects', { data: deletePost });
      } else {
        resp = await darshanaApi.delete('/jobs', { data: deletePost });
      }
      if (!resp.status) {
        return;
      }
      Router.push('/opportunities');
    }
  };
  return (
    <div className={`${styles.cardDescription}`}>
      <div className={`${styles.containerRow}`}>
        <div className={styles.cardHeaderText}>
          <div className={styles.cardImg}>
            <Image
              className={styles.img}
              src={
                owner?.profile_picture_url || '/images/profile-placeholder.png'
              }
              width={64}
              height={64}
              alt="Corporación"
            />
          </div>
          <div>
            <div className={styles.cardHeadline}>
              <div>{!title ? <Skeleton height={24} width={78} /> : title}</div>
            </div>
            <div className={styles.cardSubHead}>{place}</div>
          </div>
        </div>
        {idPublish === 0 ? (
          ''
        ) : (
          <div className={`${styles.cardIcons} iconos`}>
            <CopyToClipboard
              text={
                type === 'project'
                  ? `${window.location.origin}/talent/project/${idPublish}`
                  : `${window.location.origin}/talent/job/${idPublish}`
              }
              onCopy={() =>
                toastMessage('success', `${tc('copied-to-clipboard')}`)
              }
            >
              <p className={`btn btn--stroke ${styles.sharedApply}`}>
                {type === 'project'
                  ? user?.is_talent
                    ? tp('share-application-project-talent')
                    : tp('share-application-project')
                  : user?.is_talent
                  ? tp('share-application-job-talent')
                  : tp('share-application-job')}
              </p>
            </CopyToClipboard>
            {user?.user_uuid === owner?.user_uuid && (
              <div className={styles.containerIcons}>
                <Link
                  href={
                    type === 'project'
                      ? `/recruiter/edit/project/${idPublish}`
                      : `/recruiter/edit/job/${idPublish}`
                  }
                  passHref
                >
                  <a style={{ paddingTop: '5px' }}>
                    <Image
                      src="/images/icons/edit.svg"
                      alt="back"
                      width={20}
                      height={20}
                    />
                  </a>
                </Link>
                <Image
                  style={{ cursor: 'pointer' }}
                  src="/images/icons/trash.svg"
                  alt="back"
                  width={18}
                  height={20}
                  onClick={handlerClickDeletePost}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {type === 'project' ? (
        <>
          <div className={`${styles.containerRow}`}>
            <div>{tp('published')}:</div>
            <div className={styles.textInfo}>{publish}</div>
          </div>
          <div className={`${styles.containerRow}`}>
            <div>{tp('project-time')}:</div>
            <div className={styles.textInfo}>{projectTime}</div>
          </div>
        </>
      ) : (
        ''
      )}

      {type === 'job' ? (
        <div className={`${styles.containerRow}`}>
          <div>{tp('type-of-contract')}:</div>
          <div className={styles.textInfo}>
            {!typeContract ? <Skeleton height={22} width={73} /> : typeContract}
          </div>
        </div>
      ) : (
        ''
      )}
      {project?.business?.owner?.users_industry && (
        <div className={`${styles.containerRow}`}>
          <div>{tpr('industry')}:</div>
          <div className={styles.textInfo}>
            {lang === 'en'
              ? project?.business?.owner?.users_industry?.industry?.name_en
              : project?.business?.owner?.users_industry?.industry?.name_en}
          </div>
        </div>
      )}
      {salary !== null || min_salary !== null || max_salary !== null ? (
        <div className={`${styles.containerRow}`}>
          <div>{tp('gross-pay')}:</div>
          <div className={styles.textInfo}>
            {salary != (null || undefined)
              ? `$ ${salary}`
              : `$ ${min_salary} - ${max_salary}`}
          </div>
        </div>
      ) : (
        ''
      )}
      {hourly_wage ? (
        <div className={`${styles.containerRow}`}>
          <div>{tc('hourly_wage')}:</div>
          <div className={styles.textInfo}>$ {hourly_wage}</div>
        </div>
      ) : (
        ''
      )}
      <div className={`${styles.containerRow}`}>
        <div className={styles.continueButtons}>{children}</div>
        <div className={styles.textId}>
          {tp('post-id')}:{' '}
          {!idPublish ? <Skeleton height={7} width={16} /> : idPublish}{' '}
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
