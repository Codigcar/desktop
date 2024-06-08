import { GetStaticPaths, NextPage } from 'next';
import LayoutCore from '@layouts/LayoutCore';
import { useRouter } from 'next/router';
import {
  FormApplyProject,
  CardDescription,
  CardDetail,
  CardProject,
  ProjectFiles,
  ModalValidate,
} from '@components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  useProject,
  postProject,
  useFetchSWR,
  useProjectApplication,
} from '@hooks';
import { AuthContext } from '@contexts/auth';
import { IResponse } from '@interfaces/response';
import Skeleton from 'react-loading-skeleton';
import { useTranslation } from 'next-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { convertDateToMMDDYYYY, getTimeAgo, ModalSendPropose } from '@utils';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '@constants/i18n';
import styles from '@styles/pages/_projectDetail.module.scss';
import { ProfileContext } from '@contexts/user-profile';
import { NearContext } from '@contexts/near';
import FormEditJob from '@components/pages/apply/FormEditJob';
import { darshanaApi } from '../../../api/darshanaApi';
import { IProjectUser } from '@interfaces/projectAplication';
import Link from 'next/link';
import { useSWRConfig } from 'swr';

const ApplyProject: NextPage = () => {
  const router = useRouter();
  const {
    user,
    patchProject,
    updateProjectApplicationClose,
    addAlgorantTransactionProject,
    addProjectUser,
    addNearTransactionProject,
    readNotification,
  } = useContext(AuthContext);
  const { saveAlgoAddress, saveNearWallet } = useContext(ProfileContext);
  const { initContract } = useContext(NearContext);
  const [activeTab, setActiveTab] = useState('detail');
  const [isOpenModalValidation, setIsOpenModalValidation] = useState(false);
  const { idproject, account_id, transactionHashes, type, idNotification } =
    router.query as {
      idproject: string;
      account_id: string;
      transactionHashes: string;
      type: string;
      idNotification: string;
    };
  const {
    project: projectData,
    mutate: projectMutate,
    isLoading: isProjectLoading,
  } = useProject(`/projects/${idproject}` /* , { refreshInterval: 1000 } */);
  const { data: projects, isLoading: isLoadingProjects } = useFetchSWR(
    'projects?length=4&end_date=current'
  );
  const {
    projectApplication,
    mutate: projectApplicationMutate,
    isLoading: isLoadingProjectUser,
  } = useProjectApplication(`/project_applications/${user?.user_uuid}`);
  const { mutate } = useSWRConfig();

  const currentProject = projectApplication?.data?.find(
    (project) => project.project_id === parseInt(idproject, 10)
  );
  const acceptedProject = user?.projects.find(
    (project) =>
      project.application.project_id === parseInt(idproject, 10) &&
      project.application.accepted === 2 &&
      project.application.shown_accepted_message === true
  );
  const isValidateExperience = () => {
    if (
      currentProject?.algorand_transaction &&
      currentProject?.near_transaction
    ) {
      return true;
    } else {
      false;
    }
  };

  const ValidateExperienceText = () => {
    return <p>{tp('experience-validate')}</p>;
    // if (currentProject?.algorand_transaction) {
    //   return (
    //     <a
    //       href={`${process.env.NEXT_PUBLIC_ALGORAND_EXPLORER}${currentProject.algorand_transaction}`}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       style={{
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <Image
    //         src={'/images/algorand.svg'}
    //         width={40}
    //         height={40}
    //         alt="icon algorand"
    //       />
    //       <p>{tp('experience-validate-success')}</p>
    //     </a>
    //   );
    // } else if (currentProject?.near_transaction) {
    //   return (
    //     <a
    //       href={`${process.env.NEXT_PUBLIC_NEAR_EXPLORER}${currentProject.near_transaction}`}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       style={{
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         gap: '8px',
    //       }}
    //     >
    //       <Image
    //         src={'/images/icon-NearProtocol.png'}
    //         width={24}
    //         height={24}
    //         alt="icon near"
    //       />
    //       <p>{tp('experience-validate-success')}</p>
    //     </a>
    //   );
    // } else {
    // }
  };
  const [t, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;

  const [isAplicate, setIsAplicate] = useState(true);

  const isPostulate = useCallback(() => {
    const application = projectApplication?.data?.find(
      (project: any) => project.project_id == idproject
    );
    return application ? true : false;
  }, [idproject, projectApplication?.data]);

  const { t: tc } = useTranslation('common');
  const { t: tp } = useTranslation('postulation');
  const { t: tv } = useTranslation('validation');

  useEffect(() => {
    setIsAplicate(isPostulate());
  }, [projectData, isPostulate]);
  useEffect(() => {
    if (acceptedProject) {
      Swal.fire({
        title: `<h1> ${tc('modal-message-selected')}!</h1>`,
        html: ` <h2 >${tc('modal-message-selected-body')}</h2>`,
        confirmButtonText: tc('understand'),
        confirmButtonColor: '#1A3447',
        background: '#FAFAFA',
        customClass: {},
        buttonsStyling: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await patchProject(acceptedProject.application.id, false);
        }
      });
    }
  }, []);
  useEffect(() => {
    const updateWalletNear = async () => {
      if (account_id) {
        const { currentUser } = await initContract();
        if (currentUser) {
          const dataUserUpdate = {
            near_wallet: currentUser.accountId,
          };
          await saveNearWallet(dataUserUpdate);
        }
      }
    };
    updateWalletNear();
  }, [account_id]);
  useEffect(() => {
    if (transactionHashes && !currentProject?.near_transaction) {
      addNearTransactionProject(currentProject?.id!, transactionHashes);
    }
  }, [transactionHashes]);

  const onClickApply = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (!user) {
      router.replace({
        pathname: '/auth/login',
        query: { projectId: idproject },
      });
      return;
    }

    const MySwal = withReactContent(Swal);
    MySwal.fire({
      html: (
        <FormApplyProject
          nameProject={projectData?.data.name}
          workplaceName={projectData?.data.business.workplace.workplace_name}
          description={projectData?.data.description}
          place={`${projectData?.data?.owner.city?.name || ''}, ${
            projectData?.data?.owner.country?.nombre || ''
          }`}
          weeks={tc('time-weeks', { weeks: projectData?.data.weeks })}
          days={projectData?.data.days}
          price={projectData?.data.price}
          min_salary={projectData?.data.min_salary}
          max_salary={projectData?.data.max_salary}
          translationCommon={tc}
          translationPostulation={tp}
          translationValidation={tv}
          image_url={projectData?.data?.image_url}
          addProjectUser={addProjectUser}
          projectApplication={projectApplication}
          mutate={projectApplicationMutate}
          user={user}
          projectData={projectData}
          idproject={idproject}
          lang={lang}
          router={router}
          hourlyWage={projectData?.data.hourly_wage}
        />
      ),
      showCloseButton: true,
      showConfirmButton: false,
      confirmButtonText: 'Enviar Propuesta',
      confirmButtonColor: '#1A3447',
      background: '#FAFAFA',
      customClass: {
        popup: `modal-popup`,
        htmlContainer: 'html-container',
        confirmButton: 'continueButtonPost',
      },
      buttonsStyling: false,
    });
  };
  const onClickFinishProject = (e: { preventDefault: any }) => {
    e.preventDefault();
    Swal.fire({
      title: `<h1 class=${styles.modalTitle}>${tp(
        'modal-finish-application-title'
      )}</h1>`,
      html: ` <h2 class=${styles.modalDescription}>${tp(
        'modal-finish-application-body'
      )}</h2>`,
      confirmButtonText: tp('modal-finish-application-apply'),
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
      if (result.isConfirmed) {
        const resp = await updateProjectApplicationClose(currentProject?.id!);
        projectApplicationMutate();
      }
    });
  };
  const onClickEditPostulation = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!user) {
      router.replace({
        pathname: '/auth/login',
        query: { projectId: idproject },
      });
      return;
    }
    const talentApllications = projectData?.data?.applications.find(
      (aplication) => user.user_uuid === aplication.user_uuid
    );
    if (!talentApllications) return;
    const MySwal = withReactContent(Swal);
    await MySwal.fire({
      html: (
        <>
          <FormEditJob
            weeks={tc('time-weeks', { weeks: talentApllications.weeks })}
            days={talentApllications.days}
            price={talentApllications.price_proposal}
            max_salary={projectData?.data?.max_salary}
            translationCommon={tc}
            translationPostulation={tp}
            // addProjectUser={addProjectUser}
            // projectApplication={projectApplication}
            projectMutate={projectMutate}
            user={user}
            projectData={projectData}
            // idproject={idproject}
            idPostulation={talentApllications.id}
            lang={lang}
            MySwal={MySwal}
          />
        </>
      ),
      showCloseButton: true,
      showConfirmButton: false,

      confirmButtonText: 'Enviar Propuesta',
      confirmButtonColor: '#1A3447',
      background: '#FAFAFA',
      customClass: {
        popup: `modal-popup`,
        htmlContainer: 'html-container',
        confirmButton: 'continueButtonPost',
      },
      buttonsStyling: false,
    });
  };
  const handlerAcceptProposal = async (id: number) => {
    const data = { id };
    const response = await darshanaApi.patch(
      '/project_applications/accept_counter_proposal',
      data
    );
    const projectApplicationResponse = response.data as any;
    // @ts-ignore: Unreachable code error
    // projectApplicationMutate({
    //   ...projectApplication,
    //   data: [projectApplicationResponse],
    // });
    projectApplicationMutate();
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
  if (isProjectLoading) {
    return <div>Loading...</div>;
  }
  return (
    <LayoutCore id="applyProject" title="Project Detail">
      <div className={styles.container}>
        <button className="return" onClick={() => router.back()}>
          <div className="returnIcon">
            <Image
              src="/images/icons/arrow-left.svg"
              alt="back"
              width={16}
              height={16}
            />
          </div>
          <span>{tc('go-back')}</span>
        </button>
        <div style={{ position: 'relative' }}>
          <CardDetail
            type="project"
            title={projectData?.data?.business?.workplace?.workplace_name}
            place={`${projectData?.data?.owner.city?.name || ''}, ${
              projectData?.data?.owner.country?.nombre || ''
            }`}
            projectTime={tc('time-weeks', { weeks: projectData?.data?.weeks })}
            publish={convertDateToMMDDYYYY(projectData?.data?.created_at!)}
            min_salary={projectData?.data?.min_salary}
            max_salary={projectData?.data?.max_salary}
            hourly_wage={projectData?.data?.hourly_wage}
            salary={projectData?.data?.price}
            idPublish={projectData?.data?.id}
            owner={projectData?.data?.owner}
            project={projectData?.project}
          >
            {currentProject?.accepted === 2 &&
              currentProject?.project.project_status_id === 2 && (
                <button
                  className={`continueButtonPost ${
                    currentProject.ready_to_close ? 'disabled' : ''
                  } ${isLoadingProjectUser ? 'loading' : ''}`}
                  onClick={onClickFinishProject}
                  disabled={currentProject?.ready_to_close}
                >
                  {tp('finish-application')}
                </button>
              )}
            {currentProject?.project.project_status_id === 1 && (
              <button
                className={`continueButtonPost ${
                  currentProject?.counter_proposal_status === 2
                    ? 'disabled'
                    : ''
                }`}
                onClick={(e) =>
                  isAplicate ? onClickEditPostulation(e) : onClickApply(e)
                }
                //cambios por el momento
                disabled={
                  currentProject?.counter_proposal_status === 2 ? true : false
                }
              >
                {isAplicate ? tp('edit-proposal') : tp('postulate')}
                {/* {isAplicate ? tp('postulating') : tp('postulate')} */}
              </button>
            )}
            {currentProject?.accepted === 2 &&
              currentProject?.project.project_status_id === 3 && (
                <button
                  className={`continueButtonPost ${
                    isValidateExperience() ? 'validated' : ''
                  }`}
                  onClick={() => setIsOpenModalValidation(true)}
                  // disabled={isValidateExperience()}
                >
                  {/* <ValidateExperienceText /> */}
                  {isValidateExperience()
                    ? `✓ ${tp('experience-validate-success')} `
                    : tp('experience-validate')}
                </button>
              )}
            {!currentProject && (
              <button
                className={`continueButtonPost ${
                  isAplicate ||
                  projectData?.data?.project_status_id !== 1 ||
                  projectData?.data?.end_date <
                    new Date().toISOString().split('T')[0] ||
                  projectData?.data.user_uuid === user?.user_uuid
                    ? 'disabled'
                    : ''
                }   ${isLoadingProjectUser ? 'loading' : ''}`}
                onClick={onClickApply}
                disabled={
                  isLoadingProjectUser ||
                  isAplicate ||
                  projectData?.data?.project_status_id !== 1 ||
                  projectData?.data?.end_date <
                    new Date().toISOString().split('T')[0] ||
                  projectData?.data.user_uuid === user?.user_uuid
                }
              >
                {isAplicate ? tp('postulating') : tp('postulate')}
              </button>
            )}
          </CardDetail>
          {currentProject?.counter_proposal_status === 1 && (
            <div className={`${styles.proposalTalent} ${styles.slideBottom}`}>
              <div>
                <b>{tp('company-proposal')}</b>
                {currentProject?.time_counter_proposal !==
                  currentProject.weeks && (
                  <p className={styles.containerInfo}>
                    {tp('new-time')}{' '}
                    <p>{currentProject?.time_counter_proposal} meses</p>
                  </p>
                )}
                {currentProject?.salary_counter_proposal !==
                  currentProject.price_proposal && (
                  <p className={styles.containerInfo}>
                    {tp('new-remuneration')}{' '}
                    <p>${currentProject?.salary_counter_proposal}</p>
                  </p>
                )}
              </div>

              <b
                style={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '16px',
                  paddingBottom: '8px',
                }}
                onClick={() => handlerAcceptProposal(currentProject.id)}
              >
                {tp('accept-proposal')}
              </b>
            </div>
          )}
        </div>

        {/*  {currentProject && currentProject.application.accepted && */}
        <div
          className={` buttons-Scroll ${
            currentProject?.counter_proposal_status === 1 && styles.proposal
          } `}
        >
          <button
            className={`btn ${activeTab === 'detail' ? 'active' : ''}`}
            onClick={() => setActiveTab('detail')}
          >
            {tc('detail')}
          </button>

          <button
            className={`btn ${activeTab === 'files' ? 'active' : ''}`}
            onClick={() => setActiveTab('files')}
          >
            {tc('files')}
          </button>
        </div>

        {activeTab === 'detail' && (
          <CardDescription
            type="project"
            workplaceName={
              projectData?.data?.business?.workplace?.workplace_name
            }
            place={`${projectData?.data?.owner.city?.name || ''}, ${
              projectData?.data?.owner.country?.nombre || ''
            }`}
            title={projectData?.data?.name}
            summary={projectData?.data?.description}
            body={projectData?.data?.body}
            position={projectData?.data?.name}
            skills={projectData?.data?.skills}
            image_url={projectData?.data?.owner?.default_cover_image_url}
            mobile_image_url={projectData?.data?.mobile_image_url}
            id={projectData?.data?.id}
          />
        )}
        {activeTab === 'files' && (
          <ProjectFiles
            projects={projectData!.data}
            projectMutate={projectMutate}
            accepted={currentProject?.accepted ? true : false}
          />
        )}
        {isOpenModalValidation && (
          <ModalValidate
            setIsOpen={setIsOpenModalValidation}
            algoAddress={user?.algo_address}
            nearWallet={user?.near_wallet}
            id={idproject}
            talentId={user?.id.toString()!}
            type="P"
            addAlgorantTransaction={addAlgorantTransactionProject}
            addNearTransaction={addNearTransactionProject}
            idApplication={currentProject?.id!}
            saveAlgoAddress={saveAlgoAddress}
            saveNearWallet={saveNearWallet}
            mutate={projectMutate}
            userUUID={user?.user_uuid}
            algorand_transaction={currentProject?.algorand_transaction}
            near_transaction={currentProject?.near_transaction}
          />
        )}
        <h1 className="projectRelated">{tp('related-projects')}</h1>
        <div className="content-cards">
          {isLoadingProjects ? (
            <>
              {[...Array(2)].map((_, i) => (
                <Skeleton key={nanoid()} height={198} width={370} />
              ))}
            </>
          ) : (
            <>
              {projects &&
                (projects as IResponse).data
                  .filter((element) => element?.business.owner.id !== user?.id)
                  .map((project: any) => (
                    <CardProject
                      key={nanoid()}
                      title={project?.name}
                      company={project?.business?.workplace?.workplace_name}
                      description={project?.description}
                      time={getTimeAgo(new Date(), project?.created_at, lang)}
                      idProject={project?.id}
                      image={project?.image_url}
                      mobileImage={project?.mobile_image_url}
                      ownerUuid={project?.owner?.user_uuid}
                      summary={project?.description}
                    />
                  ))}
            </>
          )}
        </div>
        <div className="col-12">
          <button
            className="btn btn--stroke"
            onClick={() => router.push('/opportunities')}
          >
            {tp('search-more')}
          </button>
        </div>
      </div>
    </LayoutCore>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

// @ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      [
        'common',
        'postulation',
        'board',
        'validation',
        'notifications',
        'profile',
      ],
      i18nConfig
    )),
  },
});

export default ApplyProject;
