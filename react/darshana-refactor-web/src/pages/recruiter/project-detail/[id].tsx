import React, { useCallback, useContext, useEffect, useState } from 'react';
import type { GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LayoutCore from '@layouts/LayoutCore';
import {
  CardDescription,
  CardDetail,
  ProjectBoardWrapper,
  ProjectFiles,
  RatingModal,
} from '@components';
import { DataProject, getProjectByIdResponse } from '@api/index';
import { convertDateToMMDDYYYY, toastMessage } from '@utils';
import i18nConfig from 'src/constants/i18n';

import styles from '../../../styles/pages/_projectDetail.module.scss';
import { useTranslation } from 'next-i18next';
import { useProject } from '@hooks';
import { AuthContext } from '@contexts/auth';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import usePostData from '@hooks/usePostData';
import { darshanaApi } from '../../../api/darshanaApi';

type links = { text: string; href: string };
const links: links[] = [];

// @ts-ignore
const ProjectDetail: NextPage = ({ project }) => {
  const router = useRouter();
  const { executePost } = usePostData();
  const { t: tc } = useTranslation('common');
  const { t: tb, i18n } = useTranslation('board');
  const { t: tp } = useTranslation('postulation');
  const [activeTab, setActiveTab] = useState('detail');
  const [buttonText, setButtonText] = useState(tb('begin-project'));
  const [activeButton, setActiveButton] = useState(false);
  const [isReadyToClose, setIsReadyToClose] = useState(false);
  const { user, readNotification } = useContext(AuthContext);
  const {
    id: idProject,
    tab,
    type,
    idNotification,
  } = router.query as {
    id: string;
    tab: string;
    type: string;
    idNotification: string;
  };
  const MySwal = withReactContent(Swal);
  const {
    project: projectDate,
    mutate: projectMutate,
    isLoading: isProjectLoading,
  } = useProject(`/projects/${idProject}` /* , { refreshInterval: 1000 } */);

  const {
    name,
    min_salary,
    max_salary,
    hourly_wage,
    weeks,
    created_at,
    country,
    description,
    body,
    skills,
    id,
    business,
    business_id,
    image_url,
    mobile_image_url,
    owner,
    project_status_id,
    applications,
    price,
    project: ProjectId,
  } = project as DataProject;
  const [projectStatus, setProjectStatus] = useState(project_status_id);

  useEffect(() => {
    if (projectStatus) {
      switch (projectStatus) {
        case 1:
          setButtonText(tb('begin-project'));
          break;
        case 2:
          setButtonText(tb('project-in-progress'));
          if (isReadyToClose) {
            setActiveButton(true);
            setButtonText(tb('finished-project'));
            // setProjectStatus(3);
          }
          break;
        case 3:
          setButtonText(tb('finished-project'));
          setActiveButton(false);
          break;
        default:
          setButtonText(tb('begin-project'));
          break;
      }
    }
  }, [projectStatus, isReadyToClose]);
  useEffect(() => {
    const isExistApplication = applications.find(
      (application: any) => application.ready_to_close === true
    );
    if (isExistApplication) {
      setIsReadyToClose(true);
    }
  }, []);
  useEffect(() => {
    if (tab) {
      setActiveTab('talents');
    }
  }, [tab]);
  const postReadNotification = useCallback(async () => {
    const { data } = await darshanaApi(
      `/notification/clicked/${idNotification}`
    );
    readNotification(data.data.id, data.data);
  }, [idNotification]);
  useEffect(() => {
    if (type && idNotification) {
      postReadNotification();
    }
  }, [idNotification, postReadNotification, type]);

  if (isProjectLoading) {
    return <div>Loading...</div>;
  }

  const handleBeginProject = (status: boolean) => {
    if (projectStatus === 1) {
      setActiveButton(status && projectStatus === 1);
    }
  };

  const handlePaymentSuccess = () => {
    setButtonText(tb('project-in-progress'));
    setActiveButton(false);
    setProjectStatus(2);
    MySwal.close();
    startProject();
  };
  const onClickFinishProject = (e: { preventDefault: any }) => {
    e.preventDefault();
    Swal.fire({
      title: `<h1 class=${styles.modalTitle}>${tp(
        'modal-finish-application-title-recruiter'
      )}</h1>`,
      html: ` <h2 class=${styles.modalDescription}>${tp(
        'modal-finish-application-body-recruiter'
      )}</h2>`,
      confirmButtonText: tp('modal-finish-application-finish-recruiter'),
      showCancelButton: true,
      cancelButtonText: tc('back'),
      background: '#FAFAFA',
      customClass: {
        popup: `${styles.modalContainer}`,
        confirmButton: `${styles.buttonQuit} `,
        cancelButton: `${styles.buttonReturn}`,
        actions: `${styles.ActionContainer}`,
      },
      buttonsStyling: false,
    }).then(async (result) => {
      const finishProject = {
        id: idProject,
        lang: i18n.language || 'es',
      };
      if (result.isConfirmed) {
        setActiveButton(false);
        Swal.fire({
          title: `<h1 class=${styles.modalTitle}>${tp(
            'modal-application-success-title-recruiter'
          )}</h1>`,
          html: ` <h2 class=${styles.modalDescription}>${tp(
            'modal-application-success-title-body'
          )}</h2>`,
          confirmButtonText: tc('understand'),
          showCancelButton: false,
          background: '#FAFAFA',
          customClass: {
            popup: `${styles.modalContainer}`,
            confirmButton: `${styles.buttonQuit} `,
            actions: `${styles.ActionContainer}`,
          },
          buttonsStyling: false,
        }).then(async (result) => {
          if (result.isConfirmed) {
            const applicationsSelected = applications.filter(
              (application: any) => application.accepted === 2
            );
            Swal.fire({
              title: `<h1 class=${styles.modalTitle}>${tp(
                'modal-calification-title',
                { total: applicationsSelected.length }
              )}</h1>`,
              confirmButtonText: tp('modal-qualify'),
              showCancelButton: true,
              cancelButtonText: tc('later-rating'),
              background: '#FAFAFA',
              customClass: {
                popup: `${styles.modalContainer}`,
                confirmButton: `${styles.buttonQuit} `,
                cancelButton: `${styles.buttonReturn}`,
                actions: `${styles.ActionContainerRating}`,
              },
              buttonsStyling: false,
            }).then(async (result) => {
              if (result.isDismissed) {
                const resp = await darshanaApi.post(
                  '/projects/end',
                  finishProject
                );
                return Swal.close();
              }
              const MySwal = withReactContent(Swal);
              let count = 0;
              do {
                await MySwal.fire({
                  html: (
                    <RatingModal
                      index={count}
                      total={applicationsSelected.length}
                      talentApplication={applicationsSelected[count]}
                      MySwal={MySwal}
                      translationCommon={tc}
                    />
                  ),
                  showCloseButton: true,
                  showConfirmButton: false,
                  background: '#FAFAFA',
                  customClass: {
                    popup: `${styles.modalContainer}`,
                    confirmButton: `${styles.buttonQuit} `,
                    cancelButton: `${styles.buttonReturn}`,
                    actions: `${styles.ActionContainer}`,
                  },
                  buttonsStyling: false,
                }).then((result) => {
                  return result;
                });
                count++;
              } while (count < applicationsSelected.length);
              const resp = await darshanaApi.post(
                '/projects/end',
                finishProject
              );
              if (resp.status === 200) {
                Swal.fire({
                  title: `<h1 class=${styles.modalTitle}>${tc(
                    'qualification-successful'
                  )}</h1>`,
                  html: ` <h2 class=${styles.modalDescription}>${tc(
                    'qualification-body'
                  )}</h2>`,
                  confirmButtonText: tc('go-hired-talents'),
                  showCancelButton: true,
                  cancelButtonText: tc('back-publication'),
                  background: '#FAFAFA',
                  customClass: {
                    popup: `${styles.modalContainer}`,
                    confirmButton: `${styles.buttonGoTalent} `,
                    cancelButton: `${styles.buttonReturnQualification}`,
                    actions: `${styles.ActionContainerQualification}`,
                  },
                  buttonsStyling: false,
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    router.push('/recruiter/talentContract');
                  }
                });
              }
            });
          } else {
            // const resp = await darshanaApi.post('/projects/end', finishProject);
          }
        });
      }
    });
  };
  const startProject = async () => {
    const { hasError, message } = await executePost(`/projects/start`, {
      id: id.toString(),
      lang: i18n.language || 'es',
    });
    if (hasError) {
      toastMessage('error', message);
      return;
    }
  };

  return (
    <LayoutCore id="projectDetail" title="Project Detail">
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
          type="project"
          title={business?.workplace?.workplace_name}
          place={`${country.nombre}.`}
          publish={convertDateToMMDDYYYY(created_at)}
          projectTime={tc('time-weeks', { weeks: weeks })}
          min_salary={min_salary}
          max_salary={max_salary}
          hourly_wage={hourly_wage}
          salary={price}
          idPublish={id}
          owner={owner}
          project={ProjectId}
        >
          {projectStatus === 1 && (
            <button
              className={` continueButtonPost ${
                activeButton ? 'activeBtn' : ''
              }`}
              onClick={() => handlePaymentSuccess()}
              disabled={!activeButton}
            >
              {buttonText.toString()}
            </button>
          )}
          {projectStatus === 2 && (
            <button
              className={` continueButtonPost ${
                activeButton ? 'activeBtn' : ''
              }`}
              onClick={onClickFinishProject}
              disabled={!activeButton}
            >
              {buttonText.toString()}
            </button>
          )}
          {projectStatus === 3 && isReadyToClose && (
            <button
              className={` continueButtonPost ${
                activeButton ? 'activeBtn' : ''
              }`}
              disabled={!activeButton}
            >
              {buttonText.toString()}
            </button>
          )}
        </CardDetail>

        <div className={`${styles.scrollTabs} scrollTabs buttons-Scroll `}>
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
              className={`btn no-padding-inline ${
                activeTab === 'talents' ? 'active' : ''
              } ${styles.scroll}`}
              onClick={() => setActiveTab('talents')}
            >
              {tc('candidates')}
            </button>
          )}
          <button
            className={`btn ${activeTab === 'files' ? 'active' : ''} ${
              styles.scroll
            }`}
            onClick={() => setActiveTab('files')}
          >
            {tc('files')}
          </button>
        </div>
        {/* {activeTab === 'talents' && (
          <div className={styles.dragTitle}>*{tc('drag-card')}</div>
        )} */}
        {activeTab === 'detail' && (
          <CardDescription
            type="project"
            title={name}
            workplaceName={business?.workplace?.workplace_name}
            place={`${country.nombre}.`}
            summary={description}
            body={body}
            skills={skills}
            id={id}
            business_id={business_id}
            image_url={owner.default_cover_image_url}
            mobile_image_url={mobile_image_url}
            owner={owner}
          />
        )}
        {activeTab === 'talents' && (
          <ProjectBoardWrapper
            type="project"
            beginProject={handleBeginProject}
          />
        )}
        {activeTab === 'files' && (
          <ProjectFiles
            projects={projectDate!.data}
            projectMutate={projectMutate}
            owner={owner}
          />
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
  const data = await getProjectByIdResponse(id);
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
        [
          'common',
          'board',
          'postulation',
          'validation',
          'notifications',
          'profile',
        ],
        i18nConfig
      )),
      project: { ...data.data, project: data.project },
    },
  };
};

export default DragDropContext(HTML5Backend)(ProjectDetail);
