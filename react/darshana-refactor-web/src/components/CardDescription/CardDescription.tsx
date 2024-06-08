import React, { FC, useContext } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { SkillProject, SkillJob, OwnerProject } from '@api/index';
import styles from './cardDescription.module.scss';
import Link from 'next/link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'next-i18next';
import { modalDelete } from '@utils';
import { darshanaApi } from '@api/darshanaApi';
import { AuthContext } from '@contexts/auth';
import { toastMessage } from '../../utils/toastMessages';
import { useMediaQuery } from '@hooks';

interface ComponentProps {
  type?: string | undefined;
  workplaceName?: string | undefined;
  title?: string | undefined;
  position?: string | undefined;
  summary?: string | undefined;
  description?: string | undefined;
  skills: SkillProject[] | SkillJob[] | undefined;
  body: string | undefined;
  place: string;
  id?: string | number;
  business_id?: string | number;
  isVisibleIcons?: boolean;
  image_url?: string;
  mobile_image_url?: string;
  isSelected?: boolean;
  owner?: OwnerProject;
}
const CardDescription: FC<ComponentProps> = ({
  position,
  place,
  summary,
  description,
  skills,
  type,
  title,
  body,
  workplaceName,
  id = 0,
  business_id,
  image_url,
  mobile_image_url,
  isSelected,
  owner,
}) => {
  const { t: tp } = useTranslation('postulation');
  const { t: tc } = useTranslation('common');
  const { user } = useContext(AuthContext);
  const media767 = useMediaQuery('max-width', '481px');

  const handlerClickDeletePost = async (e: { preventDefault: any }) => {
    e.preventDefault();

    const resp = await modalDelete(styles, tc);
    if (resp) {
      const deletePost = {
        id,
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
  const ImageUrl = () => {
    if (!media767) {
      return image_url ? image_url : '/images/bg-project.png';
    }
    return mobile_image_url ? mobile_image_url : '/images/bg-project.png';
  };
  const sharePost = () => {
    if (type === 'project') {
      if (user) {
        if (user?.is_talent) {
          return tp('share-application-project-talent');
        }
        return tp('share-application-project');
      }
      return tp('share-application-project-talent');
    } else {
      if (user) {
        if (user?.is_talent) {
          return tp('share-application-job-talent');
        }
        return tp('share-application-job');
      }
      return tp('share-application-job-talent');
    }
  };

  return (
    <div className={`${styles.form}`}>
      {type !== 'project' && isSelected && (
        <div className={styles.containerNotificaction}>
          <Image
            src="/images/icons/check_state_white.svg"
            height={48}
            width={48}
            alt="check state"
          ></Image>
          <div>
            <h3>{tp('hired-job-title')}</h3>
            <p>{tp('hired-job-text')}</p>
          </div>
        </div>
      )}
      {type === 'project' ? (
        <div className={styles.ProjectImage}>
          <img
            src={ImageUrl()}
            alt="bg public"
            className={styles.ProjectImage}
          />
        </div>
      ) : (
        ''
      )}
      <div className={styles.containerDetail}>
        <div className={styles.rowDetail}>
          <div>
            <div className={styles.titleDetail}>{title}</div>
            <div className={styles.SubHeadDetail}>
              {workplaceName} - {place}
            </div>
          </div>
          {id === 0 ? (
            ''
          ) : (
            <div className={`${styles.iconsDetail} iconsDetail`}>
              <CopyToClipboard
                text={
                  type === 'project'
                    ? `${window.location.origin}/talent/project/${id}`
                    : `${window.location.origin}/talent/job/${id}`
                }
                onCopy={() =>
                  toastMessage('success', `${tc('copied-to-clipboard')}`)
                }
              >
                <p className={`btn btn--stroke ${styles.sharedApply}`}>
                  {sharePost()}
                </p>
              </CopyToClipboard>

              {user && user?.user_uuid == owner?.user_uuid && (
                <>
                  <Link
                    href={
                      type === 'project'
                        ? `/recruiter/edit/project/${id}`
                        : `/recruiter/edit/job/${id}`
                    }
                    passHref
                  >
                    <a>
                      <Image
                        className={styles.iconDescription}
                        src="/images/icons/edit.svg"
                        alt="back"
                        width={30}
                        height={30}
                      />
                    </a>
                  </Link>

                  <Image
                    className={styles.iconDescription}
                    src="/images/icons/trash.svg"
                    alt="back"
                    width={30}
                    height={30}
                    onClick={handlerClickDeletePost}
                  />
                </>
              )}
            </div>
          )}
        </div>

        <div
          className={styles.ProseMirror}
          dangerouslySetInnerHTML={{ __html: summary! }}
        />

        <div className="divider"></div>

        <h2 className={styles.subTitleDetail}>{tp('description')}</h2>

        <div
          className={styles.ProseMirror}
          dangerouslySetInnerHTML={{ __html: body! }}
        />

        <div className="divider"></div>

        <h2 className={styles.subTitleDetail}>{tp('skills')}</h2>
        <div className={styles.containerSkills}>
          {skills?.map((skill: SkillProject) => (
            <div key={skill.id}>
              <span className={styles.skill}>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardDescription;
