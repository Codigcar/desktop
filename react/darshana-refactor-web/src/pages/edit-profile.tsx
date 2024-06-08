import { useContext, useEffect, useMemo, useState } from 'react';

import { NextPage } from 'next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import i18nConfig from '../constants/i18n';
import LayoutCore from '@layouts/LayoutCore';
import { ProfilePersonalData, ProfileProfessionalData } from '@components';
import { useRouter } from 'next/router';
import { ProfileContext } from '@contexts/user-profile/ProfileContext';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/auth/AuthContext';

const EditProfile: NextPage = () => {
  const router = useRouter();
  const { reloadAllExperiences, reloadAllEducations, educations } =
    useContext(ProfileContext);
  const { updateAllStudyCenter, user } = useContext(AuthContext);
  const { profesional_data } = router.query;
  const { t } = useTranslation('profile');
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const [isChangeData, setIsChangeData] = useState(false);
  const [activeTab, setActiveTab] = useState(
    profesional_data || 'personalData',
  );
  const [isLoadingChangeActiveTab, setIsLoadingChangeActiveTab] =
    useState(true);
  const [educationCurrent, setEducationCurrent] = useState(educations);
  const modalDelete = async () => {
    return Swal.fire({
      iconHtml: '<Image src="/images/icons/error.svg" alt="error icon"/>',
      title: `<h1 >${tv('modal-validation-edit-profile-title')}</h1>`,
      html: ` <h2 >${tv('modal-validation-edit-profile-body')}</h2>`,
      confirmButtonText: tv('modal-validation-edit-profile-continue'),
      showCancelButton: true,
      cancelButtonText: tc('cancel'),
      background: '#FAFAFA',
      customClass: {
        icon: `modalIcon`,
        popup: `modalContainer`,
        confirmButton: `buttonQuit`,
        cancelButton: `buttonReturn`,
        actions: `ActionContainer`,
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      } else {
        return false;
      }
    });
  };
  const isRecruiter = () => {
    const isRecruiter = user?.workplaces.find(
      (workplace) => workplace.enable_business,
    );
    if (isRecruiter) {
      return true;
    }
    return !user?.is_talent ? true : false;
  };
  const isLoadingChecking = () => {
    setTimeout(() => {
      setIsLoadingChangeActiveTab(false);
    }, 1000);
  };
  useEffect(() => {
    isLoadingChecking();
  }, []);

  return (
    <LayoutCore id="profile" title="Edit Profile">
      <div className="container">
        <a
          className="btn btn--return"
          onClick={() => {
            reloadAllEducations();
            reloadAllExperiences();
            router.back();
          }}
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
        <h1 className="text-40 title">
          <strong className="black">{t('edit-profile')}</strong>
        </h1>
        <div className="buttons-tabs">
          <button
            className={`btn ${activeTab === 'personalData' ? 'active' : ''} ${
              isLoadingChangeActiveTab ? 'cursor-wait' : ''
            }`}
            onClick={async () => {
              setIsLoadingChangeActiveTab(true);
              if (isChangeData && activeTab !== 'personalData') {
                const response = await modalDelete();
                if (!response) {
                  isLoadingChecking();
                  setIsChangeData(true);
                  return;
                }
                updateAllStudyCenter(educationCurrent);
                setIsChangeData(false);
                isLoadingChecking();

                return setActiveTab('personalData');
              }
              setActiveTab('personalData');
              isLoadingChecking();
            }}
            disabled={isLoadingChangeActiveTab}
          >
            {t('personal-data')}
          </button>
          <button
            className={`btn ${
              activeTab === 'professionalData' ? 'active' : ''
            } ${isLoadingChangeActiveTab ? 'cursor-wait' : ''}`}
            onClick={async () => {
              setIsLoadingChangeActiveTab(true);
              if (isChangeData && activeTab !== 'professionalData') {
                const response = await modalDelete();
                if (!response) {
                  setIsChangeData(true);
                  isLoadingChecking();

                  return;
                }
                setIsChangeData(false);
                isLoadingChecking();

                return setActiveTab('professionalData');
              }
              setActiveTab('professionalData');
              isLoadingChecking();
            }}
            disabled={isLoadingChangeActiveTab}
          >
            {t('professional-data')}
          </button>
        </div>
        {activeTab === 'personalData' && (
          <ProfilePersonalData setIsChangeData={setIsChangeData} />
        )}
        {activeTab === 'professionalData' && (
          <ProfileProfessionalData
            setIsChangeData={setIsChangeData}
            educationCurrent={educationCurrent}
            setEducationCurrent={setEducationCurrent}
          />
        )}
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
      i18nConfig,
    )),
  },
});

export default EditProfile;
