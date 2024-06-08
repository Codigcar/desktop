import { NextPage } from 'next';

import Link from 'next/link';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Workplace } from '@interfaces/user';
import LayoutCore from '@layouts/LayoutCore';
import { CardJob, CardProject } from '@components';
import { BannerSearch, Summary } from '@components/pages/dasboard';
import { useFetchSWR, useGetData } from '@hooks';
import React, {
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AuthContext } from '@contexts/auth';
import { IResponse } from '@interfaces/response';
import Skeleton from 'react-loading-skeleton';
import { nanoid } from 'nanoid';
import { getTimeAgo, toastMessage, useYupValidationResolver } from '@utils';
import i18nConfig from '@constants/i18n';
import { useTranslation } from 'next-i18next';
import withReactContent from 'sweetalert2-react-content';
import { FormProvider, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import moment from 'moment';
import * as yup from 'yup';
import { CCheckbox, CInput, CInputWithIcon, CSearch } from '@components/Atoms';
import { CTextArea } from '@components/Atoms/CTextArea/CTextArea';
import { ProfileContext } from '@contexts/user-profile';
import { useRouter } from 'next/router';
const Dashboard: NextPage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { addExperience, saveExperiences } = useContext(ProfileContext);

  const [activeTab, setActiveTab] = useState('job_applications');

  const [isOpen, setIsOpen] = useState(false);

  // list sugerencias
  const {
    data: suggestedApplications,
    isLoading: isLoadingSuggestedApplications,
  } = useFetchSWR(
    `${
      activeTab === 'job_applications' ? 'jobs' : 'projects'
    }?length=4&order[][dir]=desc&end_date=current`
  );
  const { data: myApplication, isLoading: isLoadingMyApplication } =
    useFetchSWR(
      `${activeTab}?user_uuid=${user?.user_uuid}&order[][dir]=desc&length=5`
    );

  // for pagination

  const { t: tc } = useTranslation('common');
  const { t } = useTranslation('profile');
  const { t: tv } = useTranslation('validation');
  const [, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;

  const onSubmitExperience = async (data: Workplace) => {
    data.start_date = moment(data.start_date).format('YYYY-MM-DD');
    data.end_date = moment(data.end_date).format('YYYY-MM-DD');

    if (!data.id) {
      data.id = nanoid();
      data.enable_business = true;
      addExperience(data);
      const MySwalModal = withReactContent(Swal);
      MySwalModal.fire({
        iconHtml: '<Image src="/images/icons/Smile.svg" alt="check icon" />',
        title: `<h1> ${tc('modal-Congratulations-title')}</h1>`,
        html: `<p>${tc('modal-Congratulations-body')}</p>`,
        confirmButtonText: `${tc('understand')}`,
        confirmButtonColor: '#1A3447',
        background: '#FAFAFA',
        customClass: {
          confirmButton: 'continueButtonPost',
          title: 'congratulation-title',
        },
        buttonsStyling: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { hasError: hasErrorExperiences, message: messageExperiences } =
            await saveExperiences();
          if (hasErrorExperiences) {
            toastMessage('error', messageExperiences);
          }
        }
      });
      router.replace('/opportunities');
      // methodsExperience.reset();
      return;
    }
  };

  const MySwal = withReactContent(Swal);
  const FormActivateAccount = ({ setIsOpen }: any) => {
    const schemaExperience = useMemo(
      () =>
        yup.object().shape({
          workplace_name: yup.string().required(tv('required-field')),
          start_date: yup
            .date()
            .typeError(tv('invalid-date'))
            .min(
              moment(new Date('1100-02-01')).format('YYYY-MM-DD'),
              tv('invalid-date-end-date')
            )
            .max(moment(new Date()).format('YYYY-MM-DD'), tv('date-max')),
          end_date: yup
            .date()
            .typeError(tv('invalid-date'))
            .min(yup.ref('start_date'), tv('invalid-date-end-date'))
            .max(moment(new Date()).format('YYYY-MM-DD'), tv('date-max')),
          description: yup.string().required(tv('required-field')),
          position: yup.string().required(tv('required-field')),
        }),
      [tv]
    );
    const methodsExperience = useForm<Workplace>({
      mode: 'onChange',
      defaultValues: { position: 'Recruiter' },
      resolver: useYupValidationResolver(schemaExperience),
    });
    const handleSelectionWorkplace = (workplace: string) => {
      methodsExperience.setValue('workplace_name', workplace);
    };
    return (
      <FormProvider {...methodsExperience}>
        <div className="darkBG">
          <form
            className="centered"
            onSubmit={methodsExperience.handleSubmit(onSubmitExperience)}
          >
            <div className="modal-header">
              <h1 className="title-modal">{tc('modal-activation-title')}</h1>
              <button type="button" onClick={() => setIsOpen(false)}>
                X
              </button>
            </div>
            <p className="subtitle-modal">{tc('modal-activation-subtitle')}</p>
            <div className="modal-body">
              <div className="row">
                <CSearch
                  classNameDiv="col-sm-12 col-md-6 form-group"
                  name="workplace_name"
                  label={t('company')}
                  placeholder={tc('write-here')}
                  handleSelection={handleSelectionWorkplace}
                />
                <CInput
                  classNameDiv="col-sm-12 col-md-6 form-group"
                  name="position"
                  label={t('position')}
                  placeholder={tc('write-here')}
                />
              </div>
              <div className="row">
                <CInputWithIcon
                  classNameDiv="col-sm-12 col-md-6 form-group"
                  name="start_date"
                  label={t('initial-date')}
                  imageUrl={'/images/icons/calendar.svg'}
                  classNameDivIcon="input-icon icon-right"
                  type="date"
                  // min="1000-01-01"
                  // max="2999-09-21"
                />
                <CInputWithIcon
                  classNameDiv="col-sm-12 col-md-6 form-group"
                  name="end_date"
                  label={t('end-date')}
                  imageUrl={'/images/icons/calendar.svg'}
                  classNameDivIcon="input-icon icon-right"
                  type="date"
                  // min="1000-01-01"
                  // max="2999-09-21"
                  disable={
                    methodsExperience.watch('work_here' as any) ? true : false
                  }
                />
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-12 form-group-check check-space">
                  <a
                    onClick={() => {
                      methodsExperience.unregister('end_date');
                    }}
                  >
                    <CCheckbox
                      name="work_here"
                      label={t('currently-position')}
                    />
                  </a>
                </div>
              </div>
              <div className="row">
                <CTextArea
                  classNameDiv="col-sm-12 col-md-12 form-group"
                  name="description"
                  label={t('description')}
                  placeholder={tc('write-here')}
                />
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-12 add-button center">
                  <button className="btn btn--primary">
                    {tc('activate-account')}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </FormProvider>
    );
  };

  return (
    <LayoutCore id="dashboard" title="Dashboard">
      <div className="container">
        <div className="row">
          <aside className="col-md-3 aside">
            <Summary role="talent" />
          </aside>

          <section className="col-md-9 section">
            <h2 className="text-24">
              <b>{tc('my-applications')}:</b>
            </h2>

            <div className="nav-tabs">
              <div className="buttons-tabs">
                <button
                  className={`btn ${
                    activeTab === 'job_applications' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setActiveTab('job_applications');
                  }}
                >
                  {tc('jobs')}
                </button>
                <button
                  className={`btn ${
                    activeTab === 'project_applications' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setActiveTab('project_applications');
                  }}
                >
                  {tc('projects')}
                </button>
              </div>

              <Link href="/talent/myPostulation">
                <a className="btn btn--return icon-right">
                  <span>{tc('see-all')}</span>

                  <Image
                    className="icon"
                    src="/images/icons/arrow-right.svg"
                    alt="back"
                    width={16}
                    height={16}
                  />
                </a>
              </Link>
            </div>

            {activeTab === 'job_applications' && (
              <>
                <div className="content-cards">
                  {isLoadingMyApplication ? (
                    <>
                      {[...Array(2)].map((_, i) => (
                        <Skeleton key={nanoid()} className="Skeleton" />
                      ))}
                    </>
                  ) : (
                    <>
                      {myApplication &&
                        user &&
                        myApplication.data?.map((job: any) => (
                          <CardJob
                            key={nanoid()}
                            idJob={job?.job_id}
                            title={job?.job?.name}
                            company={
                              job?.job?.business?.workplace?.workplace_name
                            }
                            description={job?.job?.summary}
                            time={getTimeAgo(new Date(), job?.created_at, lang)}
                            location={job?.job?.country?.name}
                            // image={job?.job?.owner?.profile_picture_url}
                            image={job?.job?.owner?.profile_picture_url}
                            showFavorite={true}
                            isFavorite={job?.job?.favorite}
                            ownerUuid={job?.job?.owner?.user_uuid}
                          />
                        ))}
                    </>
                  )}
                </div>
                <h2 className="text-24">
                  <b>{tc('suggestions-1')}:</b>
                </h2>
                <div className="content-cards">
                  {isLoadingSuggestedApplications ? (
                    <>
                      {[...Array(2)].map((_, i) => (
                        <Skeleton key={nanoid()} className="Skeleton" />
                      ))}
                    </>
                  ) : (
                    <>
                      {suggestedApplications &&
                        user &&
                        (suggestedApplications as IResponse).data?.map(
                          (job: any) => (
                            <CardJob
                              key={nanoid()}
                              idJob={job?.id}
                              title={job?.name}
                              company={job?.business?.workplace?.workplace_name}
                              description={job?.summary}
                              time={getTimeAgo(
                                new Date(),
                                job?.created_at,
                                lang
                              )}
                              location={job?.country?.name}
                              image={job?.owner?.profile_picture_url}
                              ownerUuid={job?.owner?.user_uuid}
                            />
                          )
                        )}
                    </>
                  )}
                </div>
              </>
            )}

            {activeTab === 'project_applications' && (
              <>
                <div className="content-cards">
                  {isLoadingMyApplication ? (
                    <>
                      {[...Array(2)].map((_, i) => (
                        <Skeleton key={nanoid()} className="Skeleton" />
                      ))}
                    </>
                  ) : (
                    <>
                      {myApplication &&
                        user &&
                        myApplication.data?.map((project: any) => (
                          <CardProject
                            key={nanoid()}
                            idProject={project?.project_id}
                            image={project?.project?.image_url}
                            mobileImage={project?.project?.mobile_image_url}
                            title={project?.project?.name}
                            company={
                              project?.business?.workplace?.workplace_name
                            }
                            time={getTimeAgo(
                              new Date(),
                              project?.created_at,
                              lang
                            )}
                            location={project?.project?.country?.name}
                            isFavorite={project?.project?.favorite}
                            ownerUuid={project?.project?.owner?.user_uuid}
                            summary={project?.project?.description}
                          />
                        ))}
                    </>
                  )}
                </div>
                <h2 className="text-24">
                  <b>{tc('job-suggestions')}:</b>
                </h2>
                <div className="content-cards">
                  {isLoadingSuggestedApplications ? (
                    <>
                      {[...Array(2)].map((_, i) => (
                        <Skeleton
                          key={nanoid()}
                          height={198}
                          width={976}
                          className="Skeleton"
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {suggestedApplications &&
                        user &&
                        (suggestedApplications as IResponse).data?.map(
                          (project: any) => (
                            <CardProject
                              key={nanoid()}
                              idProject={project?.id}
                              image={project?.image_url}
                              mobileImage={project?.mobile_image_url}
                              title={project?.name}
                              company={
                                project?.business?.workplace?.workplace_name
                              }
                              time={getTimeAgo(
                                new Date(),
                                project?.created_at,
                                lang
                              )}
                              location={project?.country?.name}
                              isFavorite={project?.project?.favorite}
                              ownerUuid={project?.owner?.user_uuid}
                              summary={project?.description}
                            />
                          )
                        )}
                    </>
                  )}
                </div>
              </>
            )}
            <BannerSearch />
          </section>
        </div>
        {isOpen && <FormActivateAccount setIsOpen={setIsOpen} />}
      </div>
    </LayoutCore>
  );
};

// @ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ['common', 'profile', 'validation', 'notifications'],
      i18nConfig
    )),
  },
});

export default Dashboard;
