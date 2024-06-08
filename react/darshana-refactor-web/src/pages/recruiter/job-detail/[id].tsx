import type { GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import LayoutCore from '@layouts/LayoutCore';
import CardDetail from '../../../components/CardDetail/CardDetail';
import CardDescription from '../../../components/CardDescription/CardDescription';
import { DataJob, getJobByIdResponse } from '@api/index';
import i18nConfig from 'src/constants/i18n';

import styles from '../../../styles/pages/_projectDetail.module.scss';
import { useTranslation } from 'next-i18next';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ProjectBoardWrapper } from '@components';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { AuthContext } from '@contexts/auth';
import { toastMessage } from '@utils';
import usePostData from '@hooks/usePostData';
import { darshanaApi } from '../../../api/darshanaApi';
import { useMediaQuery } from '@hooks';

// @ts-ignore
const JobDetail: NextPage = ({ job }) => {
  const {
    id,
    description,
    summary,
    skills,
    name,
    contract_type,
    min_salary,
    max_salary,
    business,
    country,
    owner,
    business_id,
    applications,
    job_status_id,
    salary,
    hourly_wage,
    job: Jobid,
  } = job as DataJob;
  const [activeButton, setActiveButton] = useState(false);
  const router = useRouter();
  const { tab, type, idNotification } = router.query;

  const { t: tc } = useTranslation('common');
  const { t: tb } = useTranslation('board');
  const [activeTab, setActiveTab] = useState('detail');
  const { user, readNotification } = useContext(AuthContext);
  const { executePost } = usePostData();
  const [, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;

  useEffect(() => {
    if (job_status_id === 3) {
      setActiveButton(false);
    }
  }, []);
  useEffect(() => {
    if (tab) {
      setActiveTab('talents');
    }
  }, [tab]);
  const handleCloseJob = async () => {
    const { hasError, message, data } = await executePost(`/jobs/end`, {
      id: id.toString(),
      lang,
    });
    if (hasError) {
      toastMessage('error', message);
      return;
    }
    setActiveButton(false);
  };
  const handleBeginProject = (status: boolean) => {
    if (job_status_id === 1) {
      setActiveButton(status && job_status_id === 1);
    }
  };
  const postReadNotification = useCallback(async () => {
    const { data } = await darshanaApi(
      `/notification/clicked/${idNotification}`
    );
    readNotification(data.data.id, data.data);
  }, [idNotification, readNotification]);
  useEffect(() => {
    if (type && idNotification) {
      postReadNotification();
    }
  }, [idNotification, postReadNotification, type]);
  return (
    <LayoutCore id="jobDetail" title="Job Detail">
      <div className={styles.container}>
        <button
          className={styles.return}
          onClick={() => router.push('/opportunities')}
        >
          <div className={styles.returnIcon}>
            <Image
              src="/images/icons/arrow-left.svg"
              alt="back"
              width={16}
              height={16}
            />
          </div>
          <span>{tc('go-back')}</span>
        </button>
        <CardDetail
          type="job"
          title={business?.workplace?.workplace_name || ''}
          place={`${country.nombre}.`}
          typeContract={contract_type}
          min_salary={min_salary}
          max_salary={max_salary}
          hourly_wage={hourly_wage}
          idPublish={id}
          business_id={business_id}
          owner={owner}
          salary={salary}
          project={Jobid}
        >
          <button
            className={` continueButtonPost ${
              activeButton ? 'activeBtn' : `${styles.disabled}`
            }`}
            onClick={handleCloseJob}
            disabled={!activeButton}
          >
            {tb('end-job-publication')}
          </button>
        </CardDetail>
        <div
          className={`${styles.scrollTabs} scrollTabs buttons-Scroll buttons-Scroll-job`}
        >
          <button
            className={`btn ${activeTab === 'detail' ? 'active' : ''} ${
              styles.scroll
            }`}
            onClick={() => setActiveTab('detail')}
          >
            {tc('detail')}
          </button>
          {user && user?.user_uuid == owner?.user_uuid && (
            <button
              className={`btn ${activeTab === 'talents' ? 'active' : ''} ${
                styles.scroll
              }`}
              onClick={() => setActiveTab('talents')}
            >
              {tc('candidates')}
            </button>
          )}
        </div>
        {/* {activeTab === 'talents' && (
          <div className={styles.dragTitle}>*{tc('drag-card')}</div>
        )} */}
        {activeTab === 'detail' && (
          <CardDescription
            type="job"
            title={name}
            workplaceName={business?.workplace?.workplace_name}
            place={`${country.nombre}.`}
            summary={summary}
            body={description}
            skills={skills}
            id={id}
            business_id={business_id}
            owner={owner}
          />
        )}
        {activeTab === 'talents' && (
          <ProjectBoardWrapper type="job" beginProject={handleBeginProject} />
        )}
      </div>
    </LayoutCore>
  );
};

export const getServerSidePaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export const getServerSideProps = async ({ params, locale }: any) => {
  const { id } = params as { id: string };
  const data = await getJobByIdResponse(id);
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'board', 'postulation', 'validation', 'notifications'],
        i18nConfig
      )),
      job: { ...data.data, job: data.job },
    },
  };
};

export default DragDropContext(HTML5Backend)(JobDetail);
