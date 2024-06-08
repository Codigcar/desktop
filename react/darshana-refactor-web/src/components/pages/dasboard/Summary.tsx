import { FC, useContext, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Swal from 'sweetalert2';

import { RenderIf } from '@utils/index';
import { AuthContext } from '@contexts/auth';
import { Notification, Workplace } from '@interfaces/user';
import { darshanaApi } from '@api/darshanaApi';

interface ComponentProps {
  typePost: string;
}

const Summary: FC<{ role?: string }> = ({ role }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const [jobsVerify, setJobsVerify] = useState(0);
  const invitateProject = user?.notifications.filter(
    (notificacion) =>
      notificacion.n_type == 'PROJ_INV_NEW' &&
      notificacion.been_clicked == false
  );
  const [unreadMessage, setUnreadMessage] = useState(0);
  /*const unreadMessage = user?.notifications.filter(
    (notificacion) =>
      notificacion.n_type == 'NEW_MESSAGE' && notificacion.been_clicked == false
  );*/
  const postulationProject = user?.notifications.filter(
    (notification: Notification) =>
      notification.n_type === 'PROJ_APPLICATION_NEW'
  );

  const getTotalNoReadMessages = async () => {
    const { data: resp } = await darshanaApi.get(
      `/chats/total_no_read/${user?.user_uuid}`
    );
    const { data, status } = resp;
    if (status) {
      setUnreadMessage(resp.data);
    }
    return;
  };
  const getListJobsVerify = async () => {
    const response = await darshanaApi.get('/user_workplaces/list');
    const jobsVerify: Workplace[] = response.data.data.filter(
      (exp: Workplace) => exp.verify_status_id === 3
    );
    setJobsVerify(jobsVerify.length);
  };
  useEffect(() => {
    getTotalNoReadMessages();
  }, [user]);
  useEffect(() => {
    getListJobsVerify();
  }, []);

  const modalCreatePublication = () => {
    const inputOptions = new Promise((resolver) => {
      resolver({
        job: tc('job'),
        project: tc('project'),
      });
    });

    Swal.fire({
      title: `<h1 class="modalTitle">${tc('create-publication-title')}</h1>`,
      input: 'radio',
      confirmButtonText: tc('next'),
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return tv('required-select-option');
        }
        return '';
      },
      background: '#FAFAFA',
      customClass: {
        popup: `modalContainer`,
        confirmButton: `buttonQuit `,
        input: `buttonChecksss`,
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.value === 'job') {
        router.push('/recruiter/addJob');
      }

      if (result.value === 'project') {
        router.push('/recruiter/addProject');
      }
    });
  };

  return (
    <div className="summary">
      <div className="summary-header">
        <picture>
          <Image
            className="profile"
            src={user?.profile_picture_url || '/images/profile-placeholder.png'}
            alt="back"
            width={'100%'}
            height={'100%'}
          />
        </picture>

        <div className="username">
          <h2 className="text-24">
            <strong>
              <span className="c-2">
                {tc('hello')}, <br />
              </span>
              {user?.person.name}
            </strong>
          </h2>
        </div>

        <Link href="/edit-profile">
          <a className="btn-edit">
            <Image
              className="icon"
              src="/images/icons/edit.svg"
              alt="edit"
              width={24}
              height={24}
            />
          </a>
        </Link>
      </div>

      <div className="summary-body">
        {role === 'recruiter' ? (
          <div className="sb-item">
            <p className="text">{tc('aplicants-project')}:</p>
            <p className="number">
              <strong>{postulationProject?.length}</strong>
            </p>
          </div>
        ) : (
          <div className="sb-item">
            <p className="text">{tc('invitation-project')}:</p>
            <p className="number">
              <strong>{invitateProject?.length}</strong>
            </p>
          </div>
        )}
        {role === 'recruiter' && (
          <div className="sb-item">
            <p className="text">{tc('active-job')}:</p>
            <p className="number">
              <strong> 0{/* invitateProject?.length */}</strong>
            </p>
          </div>
        )}
        <div className="sb-item">
          <p className="text">{tc('unread-messages')}:</p>
          <p className="number">
            <strong>{unreadMessage}</strong>
          </p>
        </div>
        <div className="sb-item">
          <p className="text">{tc('verified-experience-length')}:</p>
          <p className="number">
            <strong>{jobsVerify}</strong>
          </p>
        </div>
      </div>

      <div className="summary-footer">
        <RenderIf condition={role == 'talent'}>
          <p>{tc('profile-progress')}:</p>

          <div className="progressbar">
            <progress
              className="progress"
              value={user?.profile_percentage?.toFixed(2) || 0}
              max="100"
            >
              50%
            </progress>

            <p className="percent-text">
              {user?.profile_percentage?.toFixed(2) || 0}%
            </p>
          </div>

          <p>
            <strong>{tc('profile-message-1')} </strong>
            <span className="c-gray">{tc('profile-message-2')}</span>
          </p>
        </RenderIf>

        <RenderIf condition={role == 'recruiter'}>
          <p>{tc('profile-progress')}:</p>

          <div className="progressbar">
            <progress
              className="progress"
              value={user?.profile_percentage?.toFixed(2) || 0}
              max="100"
            >
              50%
            </progress>

            <p className="percent-text">
              {user?.profile_percentage?.toFixed(2) || 0}%
            </p>
          </div>

          <p>
            <strong>{tc('profile-message-3')}</strong>
          </p>

          <div className="buttons">
            <button
              className="btn btn--primary"
              type="button"
              onClick={() => modalCreatePublication()}
            >
              {tc('create-publication')}
            </button>
            <Link href={'/recruiter/myPublish'}>
              <a className="btn btn--stroke">{tc('see-post')}</a>
            </Link>
          </div>
        </RenderIf>
      </div>
    </div>
  );
};

export default Summary;
