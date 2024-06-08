import { GetStaticPaths, NextPage } from 'next';
import LayoutCore from '@layouts/LayoutCore';
import { useRouter } from 'next/router';
import {
  FormApplyJob,
  CardDescription,
  CardDetail,
  CardJob,
  ModalValidate,
} from '@components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthContext } from '@contexts/auth';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useJob, postJob, useFetchSWR } from '@hooks';
import { nanoid } from 'nanoid';
import { getTimeAgo } from '@utils';
import { IResponse } from '@interfaces/response';
import Skeleton from 'react-loading-skeleton';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '@constants/i18n';
import { ProfileContext } from '@contexts/user-profile';
import { NearContext } from '@contexts/near';
import { darshanaApi } from '../../../api/darshanaApi';

const ApplyJob: NextPage = () => {
  const {
    user,
    addAlgorantTransactionJob,
    addJobUser,
    addNearTransactionJob,
    readNotification,
  } = useContext(AuthContext);
  const { saveAlgoAddress, saveNearWallet } = useContext(ProfileContext);
  const { initContract } = useContext(NearContext);
  const [t, i18nConfig] = useTranslation('postulation');
  const [isOpenModalValidation, setIsOpenModalValidation] = useState(false);
  const lang = i18nConfig.language;
  const router = useRouter();
  const { idjob, transactionHashes, account_id, type, idNotification } =
    router.query as {
      idjob: string;
      transactionHashes: string;
      account_id: string;
      type: string;
      idNotification: string;
    };
  const isSelected = user?.jobs.find(
    (job) =>
      job.application.job_id === parseInt(idjob, 10) &&
      job.application.selected === 2,
  )
    ? true
    : false;
  const currentJob = user?.jobs.find((job) => job.id === parseInt(idjob, 10));
  const { job, mutate, isLoading: isLoadingJob } = useJob(`/jobs/${idjob}`);
  const { data: jobs, isLoading: isLoadingJobs } = useFetchSWR(
    'jobs?length=4&end_date=current',
  );
  const [isAplicate, setIsAplicate] = useState<any>(true);
  const { t: tc } = useTranslation('common');
  const { t: tp } = useTranslation('postulation');
  const isValidateExperience = () => {
    if (
      currentJob?.application.algorand_transaction &&
      currentJob?.application.near_transaction
    ) {
      return true;
    } else {
      false;
    }
  };
  useEffect(() => {
    const isPostulate = () => {
      const application = job?.data?.applications?.find(
        (application: any) => application.user_uuid === user?.user_uuid,
      );
      return application ? true : false;
    };
    setIsAplicate(isPostulate());
  }, [job, user]);
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
    if (transactionHashes && !currentJob?.application.near_transaction) {
      addNearTransactionJob(currentJob?.application.id!, transactionHashes);
    }
  }, [transactionHashes]);

  const onClickApply = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (!user) {
      router.replace({
        pathname: '/auth/login',
        query: { jobId: idjob },
      });
      return;
    }
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      html: (
        <FormApplyJob
          position={job?.data?.name}
          workplaceName={job?.data?.business?.workplace?.workplace_name || ''}
          description={job?.data?.description}
          place={`${job?.data?.owner.city?.name || ''}, ${
            job?.data?.owner.country?.nombre || ''
          }`}
          translationCommon={tc}
          translationPostulation={tp}
          owner={job?.data?.owner as any}
          idjob={idjob}
          lang={lang}
          job={job}
          mutate={mutate}
          addJobUser={addJobUser}
        />
      ),
      showCloseButton: true,
      showConfirmButton: false,
      background: '#FAFAFA',
      customClass: {
        popup: `modal-popup`,
        htmlContainer: 'html-container',
        confirmButton: 'continueButtonPost',
      },
      buttonsStyling: false,
    });
  };
  const postReadNotification = useCallback(async () => {
    const { data } = await darshanaApi(
      `/notification/clicked/${idNotification}`,
    );
    readNotification(data.data.id, data.data);
  }, [idNotification, readNotification]);
  useEffect(() => {
    if (type && idNotification) {
      postReadNotification();
    }
  }, [idNotification, postReadNotification, type]);
  return (
    <LayoutCore id="applyJob" title="Job Detail">
      <div className="container">
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
        <CardDetail
          type="job"
          title={job?.data?.business?.workplace?.workplace_name || ''}
          place={`${job?.data?.owner?.city?.name || ''}, ${
            job?.data?.owner?.country?.nombre || ''
          }`}
          typeContract={job?.data?.contract_type}
          min_salary={job?.data?.min_salary}
          max_salary={job?.data?.max_salary}
          hourly_wage={job?.data?.hourly_wage}
          salary={job?.data?.salary}
          idPublish={job?.data?.id}
          owner={job?.data?.owner as any}
          project={job?.job}
        >
          {!isLoadingJob && (job?.data?.job_status_id !== 3 || !currentJob) && (
            <button
              className={`continueButtonPost ${
                isAplicate ||
                job?.data?.job_status_id === 3 ||
                job?.data?.end_date! < new Date().toISOString().split('T')[0] ||
                job?.data?.user_uuid === user?.user_uuid
                  ? 'disabled'
                  : ''
              }`}
              onClick={onClickApply}
              disabled={
                isAplicate ||
                job?.data?.job_status_id === 3 ||
                job?.data?.end_date! < new Date().toISOString().split('T')[0] ||
                job?.data?.user_uuid === user?.user_uuid
              }
            >
              {!isLoadingJob && isAplicate
                ? tp('postulating')
                : tp('postulate')}
            </button>
          )}
          {!isLoadingJob && currentJob && job?.data?.job_status_id === 3 && (
            <button
              className={`continueButtonPost ${
                isValidateExperience() ? 'validated' : ''
              }`}
              onClick={() => setIsOpenModalValidation(true)}
              // disabled={isValidateExperience()}
            >
              {isValidateExperience()
                ? `✓ ${tp('experience-validate-success')} `
                : tp('experience-validate')}
            </button>
          )}
        </CardDetail>
        <CardDescription
          type="job"
          id={job?.data?.id}
          title={job?.data?.name}
          workplaceName={job?.data?.business?.workplace?.workplace_name}
          position={job?.data?.business?.workplace?.position}
          summary={job?.data?.summary}
          body={job?.data?.description}
          skills={job?.data?.skills}
          place={`${job?.data?.owner?.city?.name || ''}, ${
            job?.data?.owner?.country?.nombre || ''
          }`}
          isSelected={isSelected}
        />
        {isOpenModalValidation && (
          <ModalValidate
            setIsOpen={setIsOpenModalValidation}
            algoAddress={user?.algo_address!}
            nearWallet={user?.near_wallet}
            id={idjob}
            talentId={user?.id.toString()!}
            type="J"
            addNearTransaction={addNearTransactionJob}
            addAlgorantTransaction={addAlgorantTransactionJob}
            idApplication={currentJob?.application.id!}
            saveAlgoAddress={saveAlgoAddress}
            saveNearWallet={saveNearWallet}
            mutate={mutate}
            algorand_transaction={currentJob?.application.algorand_transaction}
            near_transaction={currentJob?.application.near_transaction}
          />
        )}
        <h1 className="projectRelated">{tp('related-offers')}</h1>
        <div className="content-cards">
          {isLoadingJobs ? (
            <>
              {[...Array(2)].map((_, i) => (
                <Skeleton key={nanoid()} height={198} width={375} />
              ))}
            </>
          ) : (
            <>
              {jobs &&
                (jobs as IResponse).data
                  .filter((element) => element.business.owner.id !== user?.id)
                  .map((job: any) => (
                    <CardJob
                      key={nanoid()}
                      title={job?.name}
                      company={job?.business?.workplace?.workplace_name}
                      description={job?.summary}
                      time={getTimeAgo(new Date(), job?.created_at, lang)}
                      idJob={job?.id}
                      image={job?.owner?.profile_picture_url}
                      ownerUuid={job?.owner?.user_uuid}
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
      ['common', 'postulation', 'notifications', 'profile'],
      i18nConfig,
    )),
  },
});

export default ApplyJob;
