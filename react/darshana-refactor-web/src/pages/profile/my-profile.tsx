import { GetStaticProps, NextPage } from 'next';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import LayoutCore from '@layouts/LayoutCore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../constants/i18n';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { ProfileCard } from '@components';
import { getCountriesResponse, DatumCountries, darshanaApi } from '@api/index';
import { getTimeAgoUser, convertDateToMMYYYY, toastMessage } from '@utils';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AuthContext } from '@contexts/auth';
import Link from 'next/link';
import { useFetchSWR, usePlacesInterestUser } from '@hooks';
import { IResponse } from '@interfaces/response';
import { IItem } from '@components/pages/profile/ProfileCard';
interface Props {
  countries: DatumCountries[];
}

const MyProfile: NextPage<Props> = ({ countries }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [experiences, setexperiences] = useState([]);
  const [tr, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;
  const { data: placesInterestUser, isLoading: isLoadingPlacesInterestUser } =
    usePlacesInterestUser(user?.user_uuid!);

  const { t } = useTranslation('profile');
  const { t: tc } = useTranslation('common');
  const [profileProjects, setProfileProjects] = useState<IItem[]>();

  const isExistCountry = countries.find(
    (country: any) => country.id === user?.country_id
  );

  const country = isExistCountry ? isExistCountry : '';
  const getUSerWorkplace = async () => {
    const response = await darshanaApi.get('/user_workplaces/list');

    // setExperiencesProfessional(experiencesData);

    const experience = response?.data?.data?.map((workplace: any) => {
      let date;
      if (workplace.work_here) {
        date = `${convertDateToMMYYYY(
          workplace.start_date
        )} - Actualidad / ${getTimeAgoUser(
          new Date(),
          workplace.start_date,
          lang
        )}`;
      } else {
        date = `${convertDateToMMYYYY(
          workplace.start_date
        )} - ${convertDateToMMYYYY(workplace.end_date)} / ${getTimeAgoUser(
          workplace.end_date,
          workplace.start_date,
          lang
        )}`;
      }
      return {
        title: workplace.position,
        company: workplace.workplace_name,
        time: date,
        verify_status_id: workplace.verify_status_id,
      };
    });
    setexperiences(experience);
  };

  const education = user?.study_centres.map((study) => {
    let date;
    if (study.studying_here) {
      date = `${convertDateToMMYYYY(
        study.start_date
      )} - Actualidad / ${getTimeAgoUser(new Date(), study.start_date, lang)}`;
    } else {
      date = `${convertDateToMMYYYY(study.start_date)} - ${convertDateToMMYYYY(
        study.end_date
      )} / ${getTimeAgoUser(study.end_date, study.start_date, lang)}`;
    }
    return {
      title: study.course_name,
      company: study.name,
      time: date,
    };
  });

  const { data: projects, isLoading: isLoadingProjects } = useFetchSWR(
    `projects/profile/${user?.user_uuid}?order[][dir]=desc`
  );

  useEffect(() => {
    if (!isLoadingProjects && projects) {
      const projectList = (projects as IResponse).data
        ?.filter((element: any) => element.project_status_id === 3)
        .map((project: any) => {
          return {
            title: project?.name,
            company: project?.business?.workplace?.workplace_name,
            time: `${convertDateToMMYYYY(
              project?.created_at
            )} - ${convertDateToMMYYYY(project?.end_date)}`,
          };
        });
      setProfileProjects(projectList);
    }
  }, [projects, isLoadingProjects]);
  useEffect(() => {
    getUSerWorkplace();
  }, []);

  const isRecluiterUser = (): boolean => {
    const isRecruiter = user?.workplaces.find(
      (workplace) => workplace.enable_business
    );
    if (isRecruiter) {
      return true;
    }
    return !user?.is_talent;
  };
  const [verifyCounter, setVerifyCounter] = useState(0);
  const getValidationsDetails = async () => {
    try {
      const response = await darshanaApi.get(
        `/validation_checkout?email=${user?.email}`
      );

      setVerifyCounter(response.data.data[0].verification_number);
    } catch (error) {
      console.error('Error fetching validation details:', error);
    }
  };
  useEffect(() => {
    getValidationsDetails();
  }, []);

  return (
    <LayoutCore id="profile" title="My Profile">
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
          <picture>
            <Image
              className="header__image"
              src={
                user?.profile_picture_url || '/images/profile-placeholder.png'
              }
              width={192}
              height={192}
              alt="Corporación"
            />
          </picture>
          <div className="header__information">
            <div className="header__information-name">
              <div className="header__information-text">
                <h1 /* className="text-40" */>
                  <strong className="black">
                    {user?.person.name} {user?.person.last_name}
                  </strong>
                </h1>
                <Image
                  className="icon"
                  src={'/images/icons/edit.svg'}
                  width={24}
                  height={24}
                  alt="Darshana"
                  onClick={() => router.push('/edit-profile')}
                />
              </div>
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
            <div className="header__information-experience">
              <h1 className="text-16 c-1">
                <strong>{user?.subtitle}</strong>
              </h1>
            </div>
            <div className="header__information-contact hidden">
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
              {/* contador */}
              {/*  */}
              {isRecluiterUser() && (
                <div
                  className="header__information-contact-group"
                  data-tooltip-id="my-tooltip-1"
                >
                  <Image
                    src={'/images/icons/check-state-gray.svg'}
                    width={17}
                    height={17}
                    alt="Darshana"
                  />
                  <h1 className="text-16 c-2">
                    <strong>{verifyCounter}</strong>
                  </h1>
                </div>
              )}
              <ReactTooltip
                id="my-tooltip-1"
                place="top"
                variant="success"
                content={
                  lang === 'es'
                    ? `Te quedan ${verifyCounter} créditos para poder verificar talentos`
                    : `You have ${verifyCounter} credits left to be able to verify talents`
                }
              />
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
              <Link href={user?.twitter_url ? user?.twitter_url : ``} passHref>
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
              items={experiences}
              seeLessText="see-less-experiences"
              seeMoreText="see-more-experiences"
            />
            <ProfileCard
              iconPath="/images/icons/projects.svg"
              title="completed-projects"
              items={profileProjects}
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
              tags={user?.skills}
              seeLessText="see-less-skills"
              seeMoreText="see-more-skills"
            />
            <ProfileCard
              iconPath="/images/icons/skills.svg"
              title={
                isRecluiterUser()
                  ? t('areas-of-interest')
                  : t('roles-of-interest')
              }
              roles={placesInterestUser}
              seeLessText="see-less-roles"
              seeMoreText="see-more-roles"
            />
          </div>
        </div>
      </div>
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
  const countries = await getCountriesResponse();
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'profile', 'board', 'notifications'],
        i18nConfig
      )),
      countries: countries?.data || [],
    },
  };
};

export default MyProfile;
