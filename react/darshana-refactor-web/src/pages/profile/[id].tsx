import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
import LayoutCore from '@layouts/LayoutCore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../constants/i18n';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState, MouseEvent } from 'react';
import {
  CheckoutModal,
  ProfileCard,
  VerifyModal,
  VerifyStatus,
} from '@components';
import {
  getUserByIdResponse,
  DataUSer,
  getCountriesResponse,
  ICountries,
  DatumCountries,
  darshanaApi,
} from '@api/index';
import { ProfileInviteModal } from '@components';
import { getTimeAgoUser, convertDateToMMYYYY, toastMessage } from '@utils';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AuthContext } from '@contexts/auth';
import Link from 'next/link';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useFetchSWR } from '@hooks';
import styles from '../../components/ProjectBoard/projectBoard.module.scss';
import usePaidUserValidation from '@hooks/usePaidUser';
interface Props {
  user: DataUSer;
  countries: DatumCountries[];
}

const Profile: NextPage<Props> = ({ user, countries }) => {
  const router = useRouter();
  const { t } = useTranslation('profile');
  const { t: tc } = useTranslation('common');
  const [tr, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;
  const { user: userMe } = useContext(AuthContext);
  const { id } = router.query as { id: string };
  const idUser = parseInt(id);
  const [lengthProject, setLengthProject] = useState(0);
  const [lengthJobs, setLengthJobs] = useState(0);
  const { data: dataProjects, isLoading: isLoadingProjects } = useFetchSWR(
    `projects?user_uuid=${userMe?.user_uuid}&project_status_id=1&length=${lengthProject}`,
  );

  const { data: dataJobs, isLoading: isLoadingJobs } = useFetchSWR(
    `jobs?user_uuid=${userMe?.user_uuid}&job_status_id=1&length=${lengthJobs}`,
  );
  const [userTalent, setUserTalent] = useState(user.workplaces);
  const isExistCountry = countries.find(
    (country: any) => country.id === user.country_id,
  );
  const country = isExistCountry ? isExistCountry : '';
  const isUserMe = userMe?.id == idUser ? true : false;
  const [isOpen, setIsOpen] = useState(false);
  const [typeInvitation, setTypeInvitation] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const experience = user.workplaces.map((workplace) => {
    let date;
    if (workplace.work_here) {
      date = `${convertDateToMMYYYY(
        workplace.start_date,
      )} - Actualidad / ${getTimeAgoUser(
        new Date(),
        workplace.start_date,
        lang,
      )}`;
    } else {
      date = `${convertDateToMMYYYY(
        workplace.start_date,
      )} - ${convertDateToMMYYYY(workplace.end_dacte)} / ${getTimeAgoUser(
        workplace.end_date,
        workplace.start_date,
        lang,
      )}`;
    }
    return {
      title: workplace.position,
      company: workplace.workplace_name,
      time: date,
      verify_status_id: workplace.verify_status_id,
    };
  });
  const education = user.study_centres.map((study: any) => {
    let date;
    if (study.studying_here) {
      date = `${convertDateToMMYYYY(
        study.start_date,
      )} - Actualidad / ${getTimeAgoUser(new Date(), study.start_date, lang)}`;
    } else {
      date = `${convertDateToMMYYYY(study.start_date)} - ${convertDateToMMYYYY(
        study.end_date,
      )} / ${getTimeAgoUser(study.end_date, study.start_date, lang)}`;
    }
    return {
      title: study.course_name,
      company: study.name,
      time: date,
    };
  });
  const isRecruiterOwner = () => {
    const findProject = user.projects.find(
      (project) => project.user_uuid === userMe?.user_uuid,
    );
    const findJob = user.jobs.find(
      (job) => job.user_uuid === userMe?.user_uuid,
    );
    if (findProject || findJob) {
      return true;
    }
    return false;
  };

  const projects: any[] = [];

  const MySwal = withReactContent(Swal);

  const handleCloseModal = () => {
    MySwal.close();
  };
  const ModalSuccessPayment = async (styles: any, tc: any) => {
    const MySwal = withReactContent(Swal);
    return MySwal.fire({
      iconHtml:
        '<Image src="/images/icons/megaphone.svg" alt="Alert Icon" width={33} height={34}/>',
      title: `<h1 class=${styles.modalTitle}>${tc(
        'modal-payment-verify',
      )}</h1>`,
      html: ` <h2 class=${styles.modalDescription}>${tc(
        'modal-payment-verify-body',
      )}</h2>`,
      confirmButtonText: tc('understand'),
      showCancelButton: false,

      background: '#FAFAFA',
      customClass: {
        icon: `${styles.modalIcon}`,
        popup: `${styles.modalContainer}`,
        confirmButton: `${styles.buttonQuit} `,

        actions: `${styles.ActionContainer}`,
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        return true;
      } else {
        return false;
      }
    });
  };

  const isPaidUser = usePaidUserValidation(userMe);
  const onClickCheckoutModal = (e: MouseEvent<HTMLButtonElement>): void => {
    //e.preventDefault();

    const hasVerifyStatusProcess = userTalent.some((item) => {
      return (
        item.verify_status_id === 2 ||
        item.verify_status_id === 3 ||
        item.verify_status_id === 4
      );
    });
    if (isPaidUser) {
      if (hasVerifyStatusProcess) {
        onClickStatusVerify(e);
        return;
      }

      onClickApply(e);
      return;
    }
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      html: <CheckoutModal closeModal={closeModal} tc={tc} />,
      showCloseButton: false,
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
  const closeModal = () => {
    Swal.close(); // Cerrar SweetAlert
  };

  const onClickStatusVerify = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      html: (
        <VerifyStatus
          experiences={userTalent}
          lang={lang}
          onClose={closeModal}
          tc={tc}
        />
      ),
      showCloseButton: false,
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
  const onClickApply = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const MySwal = withReactContent(Swal);
    await MySwal.fire({
      html: (
        <VerifyModal
          experiences={user.workplaces}
          lang={lang}
          onClose={closeModal}
          tc={tc}
          userRecruiter={userMe}
          userTalent={user}
          setUserTalent={setUserTalent}
        />
      ),
      showCloseButton: false,
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
  const { sessionId } = router.query;
  const fetchStatusPayment = async (sessionId: string) => {
    try {
      const response = await darshanaApi.get(
        `/stripe/verify?sessionId=${sessionId}`,
      );
      await validatePayment(response.data);
    } catch (error) {}
  };
  const validatePayment = async (response: any) => {
    try {
      if (response.payment_status == 'paid') {
        setIsPaid(true);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (sessionId) {
      fetchStatusPayment(sessionId as string);
      if (isPaid) {
        ModalSuccessPayment(styles, tc);
      }
    }
  }, [sessionId, isPaid]);
  useEffect(() => {
    if (dataJobs?.meta?.total) {
      setLengthJobs(dataJobs?.meta?.total);
    }
    if (dataProjects?.meta?.total) {
      setLengthProject(dataProjects?.meta?.total);
    }
  }, [dataJobs?.meta?.total, dataProjects?.meta?.total]);

  return (
    <LayoutCore id="profile" title="Profile">
      <div className="container">
        <a
          className="btn btn--return"
          style={{ marginLeft: 10, marginBottom: 10 }}
          onClick={() => router.back()}
        >
          <Image
            className="icon"
            src="/images/icons/arrow-left.svg"
            alt="back"
            width={16}
            height={16}
          />
          <span>{tc('go-back')}</span>
        </a>
        <div className="header">
          <div className="header__information">
            <div className="header">
              <picture>
                <Image
                  className="header__image"
                  src={
                    user?.profile_picture_url ||
                    '/images/profile-placeholder.png'
                  }
                  width={192}
                  height={192}
                  alt="Corporación"
                />
              </picture>
              <div className="header__information">
                <div className="header__information-name">
                  <div className="header__information-text">
                    <h1>
                      <strong className="black">
                        {user?.person.name} {user?.person.last_name}
                      </strong>
                    </h1>
                  </div>
                  <div className="header__information-container">
                    {!userMe?.is_talent && (
                      <button
                        className="btn btn--stroke save-button hidden flex flex-center"
                        style={{ display: 'flex' }}
                        onClick={onClickCheckoutModal}
                      >
                        <Image
                          src={'/images/icons/experience.svg'}
                          width={18}
                          height={18}
                          alt="experience"
                        />
                        {tc('verify-profile')}
                      </button>
                    )}

                    <button
                      className="send-message btn btn--primary save-button hidden flex"
                      onClick={() => router.push('/message/' + user?.user_uuid)}
                    >
                      <div className="icon">
                        <Image
                          src="/images/icons/mail-white.svg"
                          alt="Message"
                          width={20}
                          height={20}
                        />
                      </div>
                      {tc('send-message')}
                    </button>

                    <CopyToClipboard
                      text={`${window.location.origin}/profile/${user?.id}`}
                      onCopy={() =>
                        toastMessage('success', `${tc('copied-to-clipboard')}`)
                      }
                    >
                      <div className="icon">
                        <Image
                          src="/images/icons/Outline.svg"
                          alt="back"
                          width={24}
                          height={24}
                        />
                      </div>
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="header__information-experience">
                  <h1 className="text-16 c-1">
                    <strong>{user?.subtitle}</strong>
                  </h1>
                </div>
                <div className="header__information-contact hidden">
                  {isRecruiterOwner() && (
                    <>
                      <div className="header__information-contact-group">
                        <Image
                          src={'/images/icons/mail.svg'}
                          width={16}
                          height={16}
                          alt="Darshana"
                        />
                        <h1 className="text-16 c-2">
                          <strong>{user?.email}</strong>
                        </h1>
                      </div>
                      <div className="header__information-contact-group">
                        <Image
                          src={'/images/icons/phone.svg'}
                          width={16}
                          height={16}
                          alt="Darshana"
                        />
                        <h1 className="text-16 c-2">
                          <strong>{user?.phone}</strong>
                        </h1>
                      </div>
                    </>
                  )}
                  <div className="header__information-contact-group ">
                    <Image
                      src={'/images/icons/location.svg'}
                      width={16}
                      height={16}
                      alt="Darshana"
                    />
                    <h1 className="text-16 c-2">
                      <strong>{country ? country.name : ''}</strong>
                    </h1>
                  </div>
                </div>
                <div className="header__information-social hidden">
                  <i>
                    {user?.facebook_url ? (
                      <Link
                        href={user?.facebook_url ? user?.facebook_url : ``}
                        passHref
                      >
                        <a target="_blank">
                          <Image
                            src={'/images/icons/facebook-dark.svg'}
                            width={24}
                            height={24}
                            alt="Darshana"
                          />
                        </a>
                      </Link>
                    ) : (
                      <Image
                        src={'/images/icons/facebook-dark.svg'}
                        width={24}
                        height={24}
                        alt="Darshana"
                      />
                    )}
                  </i>
                  <i>
                    {user?.twitter_url ? (
                      <Link
                        href={user?.twitter_url ? user?.twitter_url : ``}
                        passHref
                      >
                        <a target="_blank">
                          <Image
                            src={'/images/icons/twitter-dark.svg'}
                            width={24}
                            height={24}
                            alt="Darshana"
                          />
                        </a>
                      </Link>
                    ) : (
                      <Image
                        src={'/images/icons/twitter-dark.svg'}
                        width={24}
                        height={24}
                        alt="Darshana"
                      />
                    )}
                  </i>
                  <i>
                    {user?.linkedin_url ? (
                      <Link
                        href={user?.linkedin_url ? user?.linkedin_url : ``}
                        passHref
                      >
                        <a target="_blank">
                          <Image
                            src={'/images/icons/linkedin-dark.svg'}
                            width={24}
                            height={24}
                            alt="Darshana"
                          />
                        </a>
                      </Link>
                    ) : (
                      <Image
                        src={'/images/icons/linkedin-dark.svg'}
                        width={24}
                        height={24}
                        alt="Darshana"
                      />
                    )}
                  </i>
                </div>
              </div>
            </div>
            <div className="header__information-contact-movil">
              {!userMe?.is_talent && (
                <button
                  className="btn btn--stroke save-button movil"
                  onClick={() => {
                    setTypeInvitation('projects');
                    setIsOpen(true);
                  }}
                >
                  {tc('invite-to-project')}
                </button>
              )}
              {!userMe?.is_talent && (
                <button
                  className="btn btn--stroke save-button movil"
                  onClick={() => {
                    setTypeInvitation('jobs');
                    setIsOpen(true);
                  }}
                >
                  {tc('send-message')}
                </button>
              )}
            </div>
            <div
              className="header__information-contact-movil"
              style={{ flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <div className="header__information-contact-group">
                <Image
                  src={'/images/icons/mail.svg'}
                  width={16}
                  height={16}
                  alt="Darshana"
                />
                <h1 className="text-16 c-2">
                  <strong>{user?.email}</strong>
                </h1>
              </div>
              <div className="header__information-contact-group">
                <Image
                  src={'/images/icons/phone.svg'}
                  width={16}
                  height={16}
                  alt="Darshana"
                />
                <h1 className="text-16 c-2">
                  <strong>{user?.phone}</strong>
                </h1>
              </div>
              <div className="header__information-contact-group">
                <Image
                  src={'/images/icons/location.svg'}
                  width={16}
                  height={16}
                  alt="Darshana"
                />
                <h1 className="text-16 c-2">
                  <strong>{country ? country.name : ''}</strong>
                </h1>
              </div>
            </div>

            <div className="header__information-social-movil">
              <i>
                {user?.facebook_url ? (
                  <Link
                    href={user?.facebook_url ? user?.facebook_url : ``}
                    passHref
                  >
                    <a target="_blank">
                      <Image
                        src={'/images/icons/facebook-dark.svg'}
                        width={24}
                        height={24}
                        alt="Darshana"
                      />
                    </a>
                  </Link>
                ) : (
                  <Image
                    src={'/images/icons/facebook-dark.svg'}
                    width={24}
                    height={24}
                    alt="Darshana"
                  />
                )}
              </i>
              <i>
                {user?.twitter_url ? (
                  <Link
                    href={user?.twitter_url ? user?.twitter_url : ``}
                    passHref
                  >
                    <a target="_blank">
                      <Image
                        src={'/images/icons/twitter-dark.svg'}
                        width={24}
                        height={24}
                        alt="Darshana"
                      />
                    </a>
                  </Link>
                ) : (
                  <Image
                    src={'/images/icons/twitter-dark.svg'}
                    width={24}
                    height={24}
                    alt="Darshana"
                  />
                )}
              </i>
              <i>
                {user?.twitter_url ? (
                  <Link
                    href={user?.twitter_url ? user?.twitter_url : ``}
                    passHref
                  >
                    <a target="_blank">
                      <Image
                        src={'/images/icons/linkedin-dark.svg'}
                        width={24}
                        height={24}
                        alt="Darshana"
                      />
                    </a>
                  </Link>
                ) : (
                  <Image
                    src={'/images/icons/linkedin-dark.svg'}
                    width={24}
                    height={24}
                    alt="Darshana"
                  />
                )}
              </i>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="content__title">
            <Image
              src={'/images/icons/id.svg'}
              width={24}
              height={24}
              alt="Darshana"
            />
            <h1 className="text-20">
              <strong>{t('about')}</strong>
            </h1>
          </div>
          <div className="divider"></div>
          <div className="content__body">
            {user?.summary ? (
              <p>{user?.summary}</p>
            ) : (
              <h1 className="text-16 c-1 text-center">
                <strong>{tc('no-info-yet')}</strong>
              </h1>
            )}
          </div>
        </div>
        <div className="body">
          <div className="body__column body__column--left">
            <ProfileCard
              iconPath="/images/icons/work.svg"
              title="experience"
              items={experience}
              seeLessText="see-less-experiences"
              seeMoreText="see-more-experiences"
            />
            <ProfileCard
              iconPath="/images/icons/projects.svg"
              title="completed-projects"
              items={projects}
              seeLessText="see-less-projects"
              seeMoreText="see-more-projects"
            />
          </div>
          <div className="body__column body__column--right">
            <ProfileCard
              iconPath="/images/icons/study.svg"
              title="education"
              items={education}
              seeLessText="see-less-studies"
              seeMoreText="see-more-studies"
            />
            <ProfileCard
              iconPath="/images/icons/skills.svg"
              title="skills"
              tags={user.skills}
              seeLessText="see-less-skills"
              seeMoreText="see-more-skills"
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <ProfileInviteModal
          translationCommon={tc}
          user={userMe}
          closeModal={handleCloseModal}
          inviteUser={user}
          typeInvitation={typeInvitation}
          isLoading={
            typeInvitation === 'projects' ? isLoadingProjects : isLoadingJobs
          }
          data={typeInvitation === 'projects' ? dataProjects : dataJobs}
          setIsOpen={setIsOpen}
        />
      )}
    </LayoutCore>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}: any) => {
  const { id } = params as { id: string };
  try {
    const data = await getUserByIdResponse(id);
    const countries = await getCountriesResponse();

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
          ['common', 'profile', 'board', 'notifications'],
          i18nConfig,
        )),
        user: data?.data,
        countries: countries?.data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
};
export default Profile;
