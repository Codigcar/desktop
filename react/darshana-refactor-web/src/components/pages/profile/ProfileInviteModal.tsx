import React, { FC, useEffect, useRef, useState } from 'react';
import styles from '../../ProjectBoard/projectBoard.module.scss';
import { useGetData } from '@hooks';
import usePostData from '@hooks/usePostData';
import { toastMessage } from '@utils';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import { useTranslation } from 'next-i18next';
import { darshanaApi } from '../../../api/darshanaApi';

interface Props {
  translationCommon: any;
  user: any;
  closeModal: () => void;
  inviteUser: any;
  typeInvitation: string;
  isLoading: boolean;
  data: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileInviteModal: FC<Props> = ({
  translationCommon,
  user,
  closeModal,
  inviteUser,
  typeInvitation,
  isLoading,
  data,
  setIsOpen,
}) => {
  const { i18n } = useTranslation('board');
  const [inviteTitle, setInviteTitle] = useState();
  const [step, setStep] = useState(1);
  const [activeId, setActiveId] = useState('');
  let modalRef = useRef<HTMLDivElement>(null);
  /* const { executeGet, isLoading, data, meta } = useGetData(); */
  const { executePost } = usePostData();

  useEffect(() => {
    const currentDashboard = typeInvitation;
    if (currentDashboard === 'projects') {
      setInviteTitle(translationCommon('project'));
    } else {
      setInviteTitle(translationCommon('job'));
    }
  }, []);
  useEffect(() => {
    setActiveId(data?.data[0]?.id);
  }, [data]);

  const handleInvite = async () => {
    const currentDashboard = typeInvitation;
    if (currentDashboard === 'projects') {
      const { hasError, message } = await executePost(
        `/project_applications/invite_talent`,
        {
          project_id: activeId.toString(),
          talent_user_uuid: inviteUser.user_uuid,
          lang: i18n.language || 'es',
        }
      );
      if (hasError) {
        toastMessage('error', message);
        return;
      }
    } else {
      const { hasError, message } = await executePost(
        `/job_applications/invite_talent`,
        {
          job_id: activeId.toString(),
          talent_user_uuid: inviteUser.user_uuid,
          lang: i18n.language || 'es',
        }
      );
      if (hasError) {
        toastMessage('error', message);
        return;
      }
    }
    setStep(2);
  };

  const handleCancel = () => {
    setIsOpen(false);
    closeModal();
  };
  useEffect(() => {
    let handler = (e: any) => {
      if (!modalRef?.current?.contains(e!.target!)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });
  return (
    <div className="darkBG">
      <div className="centered" ref={modalRef}>
        {step === 1 && (
          <div className={styles.modalCard}>
            <div className={styles.modalTitle}>
              {translationCommon('invite-title', { type: inviteTitle })}
            </div>
            <div className={styles.modalSelectTitle}>{inviteTitle}</div>
            {isLoading ? (
              <Skeleton height={40} width={454} />
            ) : (
              <select
                className={`form-control form-select ${styles.selectInvitateModal}`}
                onChange={(e) => setActiveId(e.target.value)}
                defaultValue={data[0]?.id}
              >
                {data?.data?.map((value: any) => (
                  <option key={value.id} value={value.id}>
                    {value.name}
                  </option>
                ))}
              </select>
            )}

            <div className={styles.modalButtons}>
              <button
                className="btn btn--primary save-button"
                onClick={() => handleInvite()}
              >
                {translationCommon('invite')}
              </button>{' '}
              <button
                className="btn btn--stroke save-button"
                onClick={() => handleCancel()}
              >
                {translationCommon('cancel')}
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className={styles.modalCard}>
            <Image
              height={72}
              width={72}
              src="/images/icons/check_state.svg"
              alt="check icon"
            />
            <div className={styles.modalTitle}>
              {translationCommon('invite-title-success')}
            </div>
            <div className={styles.modalSubTitle}>
              {translationCommon('invite-sub-title-success', {
                type: inviteTitle,
              })}
            </div>
            <button
              className="btn btn--primary save-button "
              onClick={() => handleCancel()}
              style={{
                width: '200px',
                margin: 'auto',
              }}
            >
              {translationCommon('understand')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInviteModal;
