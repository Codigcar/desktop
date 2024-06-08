import React, {
  useMemo,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  FC,
  MouseEvent,
} from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import moment from 'moment';
import { nanoid } from 'nanoid';

import {
  useYupValidationResolver,
  toastMessage,
  convertDateToYYYYMMDD,
  convertDateToNameMonth,
  convertDateToYYYY,
  diffDatesByMonths,
  sizeInMb,
  handlerClickValidate,
  handlerClickValidateEducation,
} from '@utils/index';
import {
  CButton,
  CCheckbox,
  CInput,
  CInputWithIcon,
  CSearch,
} from '@components/Atoms';
import { CTextArea } from '@components/Atoms/CTextArea/CTextArea';
import { ProfileContext } from '@contexts/user-profile/ProfileContext';
import { Workplace, StudyCentre } from '@interfaces/user';
import SelectAbility from '@components/selectAbility/selectAbility';
import {
  useFetchSWR,
  usePlacesInterest,
  usePlacesInterestUser,
  useSkills,
} from '@hooks';
import styles from '@components/ProjectBoard/projectBoard.module.scss';
import { AuthContext } from '@contexts/auth';
import { useFetchLanguage, useFetchLanguageMe } from '@hooks/useFetchSWR';
import SelectLanguage from '@components/selectLanguage/SelectLanguage';
import { FormDataInfoPersonal } from './ProfilePersonalData';
import DropFile from '@components/Dropzone/DropFile';
import axios from 'axios';
import _ from 'lodash';
import { darshanaApi } from '@api/darshanaApi';
import {
  Tooltip,
  VerifyModal,
  VerifyModalTalent,
  VerifyStatus,
} from '@components';
import withReactContent from 'sweetalert2-react-content';

import Swal from 'sweetalert2';
interface ComponentProps {
  setIsChangeData: Dispatch<SetStateAction<boolean>>;

  educationCurrent: StudyCentre[];

  setEducationCurrent: Dispatch<SetStateAction<StudyCentre[]>>;
}

const ProfileProfessionalData: FC<ComponentProps> = ({
  setIsChangeData,

  educationCurrent,
  setEducationCurrent,
}) => {
  const [translation, i18nConfig] = useTranslation();
  const [isLoadingGeneral, setIsLoadingGeneral] = useState(false);
  const [ShowEditFormExperience, setShowEditFormExperience] = useState<boolean>(false);
  const [showAddFormExperience, setShowAddFormExperience] = useState<boolean>(false);
  const [experienceSelect, setExperienceSelect] = useState<string>();
  const [showAddFormEducation, setShowAddFormEducation] = useState<boolean>(false);
  const [showEditFormEducation, setShowEditFormEducation] = useState<boolean>(false);
  const [educationSelect, setEducationSelect] = useState<string>();
  const lang = i18nConfig.language;
  const { t } = useTranslation('profile');
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const {
    saveExperiencesProfile,
    reloadAllExperiences,

    educations,
    reloadAllEducations,
    addEducation,
    removeEducationById,
    editEducationById,
    saveEducations,
    getEducationById,
    skillsUser,
    addSkill,
    addPlacesInterest,
    addLanguageMe,
    saveInfoPersonalProfessional,
  } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);
  const { data: skills, isLoading } = useSkills();
  const [experiencesProfessional, setExperiencesProfessional] = useState<
    Workplace[]
  >([]);

  const [experiencesProfessionalAux, setExperiencesProfessionalAux] = useState<
    Workplace[]
  >([]);
  const [educationsCenter, setEducationsCenter] = useState<StudyCentre[]>([]);
  const { data: placesInterest, isLoading: isLoadingPlacesInterest } =
    usePlacesInterest();
  const { data } = useFetchLanguage('languages', lang);
  const {
    data: languageMe,
    isLoading: isLoadingLanguageMe,
    mutate: mutateLanguageMe,
  } = useFetchLanguageMe('me/languages', lang);
  const {
    data: placesInterestUser,
    isLoading: isLoadingPlacesInterestUser,
    mutate,
  } = usePlacesInterestUser(user?.user_uuid!);
  const getUSerWorkplace = async () => {
    const response = await darshanaApi.get('/user_workplaces/list');

    // setExperiencesProfessional(experiencesData);
    setExperiencesProfessional(response.data.data);
    setExperiencesProfessionalAux(response.data.data);
  };
  const getUSerStudyCenter = async () => {
    const response = await darshanaApi.get('/user_study_centres/list');
    // setExperiencesProfessional(experiencesData);
    setEducationsCenter(response.data.data);
    //   setExperiencesProfessionalAux(response.data.data);
  };
  useEffect(() => {
    getUSerWorkplace();
    getUSerStudyCenter();
  }, []);

  const deleteExperienceById = (id: string) => {
    const experiences = experiencesProfessional.filter(
      (experience) => experience.id != id
    );
    setExperiencesProfessional(experiences);
  };
  const getExperienceById = (id: string) => {
    return experiencesProfessional.find((exp) => exp.id == id)!;
  };
  const addExperience = (exp: Workplace) => {
    const experience = [...experiencesProfessional];
    experience.push(exp);
    setExperiencesProfessional(experience);
  };

  const addStudyWorkplace = (exp: StudyCentre) => {
    const experience = [...educationsCenter];
    experience.push(exp);
    setEducationsCenter(experience);
  };
  const deleteStudyWorkplaceById = (id: string) => {
    const experiences = educationsCenter.filter(
      (experience) => experience.id != id
    );
    setEducationsCenter(experiences);
  };

  const schemaExperience = useMemo(
    () =>
      yup.object().shape({
        workplace_name: yup.string().required(tv('required-field')),
        start_date: yup
          .date()
          .typeError(tv('invalid-date'))
          .min(
            moment(new Date('1100-01-01')).format('YYYY-MM-DD'),
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

  const schemaEducation = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(tv('required-field')),
        course_name: yup.string().required(tv('required-field')),

        start_date: yup
          .date()
          .typeError(tv('invalid-date'))
          .min(
            moment(new Date('1100-01-01')).format('YYYY-MM-DD'),
            tv('invalid-date-end-date')
          )
          .max(moment(new Date()).format('YYYY-MM-DD'), tv('date-max')),
        end_date: yup
          .date()
          .typeError(tv('invalid-date'))
          .min(yup.ref('start_date'), tv('invalid-date-end-date'))
          .max(moment(new Date()).format('YYYY-MM-DD'), tv('date-max')),
        description: yup.string().required(tv('required-field')),
      }),
    [tv]
  );
  const isRecruiter = () => {
    const isRecruiter = user?.workplaces.find(
      (workplace) => workplace.enable_business
    );

    if (isRecruiter) {
      return true;
    }
    return !user?.is_talent;
  };
  const onSubmitPersonalInfo = async (data: FormDataInfoPersonal) => {
    if (data.urlFile && data.cv_resume) {
      data.cv_resumen_file_url = data.urlFile;
      data.cv_resumen_file_name =
        data.cv_resume && data?.cv_resume[0].file_name;
      data.cv_resumen_file_size =
        data.cv_resume && data?.cv_resume[0].file_size;
    }

    console.log("🚀 --------------------------------------------------------------------------------------------------🚀")
    console.log("🚀 ~ file: ProfileProfessionalData.tsx:252 ~ onSubmitPersonalInfo ~ data?.language:", data?.language)
    console.log("🚀 --------------------------------------------------------------------------------------------------🚀")
    
    data?.language && await addLanguageMe(
      JSON.parse(data?.language),
      JSON.parse(data?.language).length
    );

    const { hasError, message } = await saveInfoPersonalProfessional(data);
    if (hasError) {
      toastMessage('error', message);
      return;
    }
    mutateLanguageMe();
    // toastMessage('success', message);
  };

  const methodsExperience = useForm<Workplace>({
    mode: 'onChange',
    resolver: useYupValidationResolver(schemaExperience),
  });
  const methodsEducation = useForm<StudyCentre>({
    mode: 'onChange',
    resolver: useYupValidationResolver(schemaEducation),
  });
  const methodsSkill = useForm({
    mode: 'onChange',
  });
  const methodsPersonalInfo = useForm<FormDataInfoPersonal>({
    mode: 'onChange',
    defaultValues: {
      linkedin_url: user?.linkedin_url || '',
      other_link_work: user?.other_link_work || '',
    },
  });
  const watchInfo = methodsPersonalInfo.watch();
  const {
    reset,
    formState: { isSubmitting },
  } = methodsSkill;
  /* TODO: Functions */

  const show = () => {
    setShowEditFormExperience(true);
  };

  const handleEditExperience = (id: string) => {
    setExperienceSelect(id);
    const experience = getExperienceById(id);

    methodsExperience.reset();
    methodsExperience.setValue('id', experience.id);

    // mostrar empresa
    // setTimeout(() => {}, 100);

    methodsExperience.setValue('workplace_name', experience.workplace_name);
    methodsExperience.setValue(
      'start_date',
      convertDateToYYYYMMDD(experience.start_date)
    );
    methodsExperience.setValue(
      'end_date',
      experience.work_here
        ? convertDateToYYYYMMDD(new Date())
        : convertDateToYYYYMMDD(experience.end_date)
    );
    methodsExperience.setValue('description', experience.description);
    methodsExperience.setValue('position', experience.position);
    methodsExperience.setValue('work_here', experience.work_here);
    methodsExperience.setValue('enable_business', experience.enable_business);
    methodsExperience.setValue('verify_status_id', experience.verify_status_id);
  };

  const handleResetExperiences = () => {
    reloadAllExperiences(); // reset todos las experiencias desde BD
    methodsExperience.reset(); // reset los campos
    setShowEditFormExperience(false);
    setShowAddFormExperience(false);
  };

  const handleEditEducation = (id: string) => {
    setEducationSelect(id);
    const education = getEducationById(id);
    methodsEducation.reset();
    methodsEducation.setValue('id', education.id);
    methodsEducation.setValue('name', education.name);
    methodsEducation.setValue('course_name', education.course_name);
    methodsEducation.setValue(
      'start_date',
      convertDateToYYYYMMDD(education.start_date)
    );
    methodsEducation.setValue(
      'end_date',
      education.studying_here
        ? convertDateToYYYYMMDD(new Date())
        : convertDateToYYYYMMDD(education.end_date)
    );
    methodsEducation.setValue('studying_here', education.studying_here);
    methodsEducation.setValue('description', education.description);
  };

  const handleResetEducations = () => {
    reloadAllEducations();
    methodsEducation.reset();
    setShowAddFormEducation(false);
    setShowEditFormEducation(false);
  };

  const onSubmitExperience = async (data: Workplace) => {
    setShowEditFormExperience(false);
    data.start_date = moment(data.start_date).format('YYYY-MM-DD');
    data.end_date = moment(data.end_date).format('YYYY-MM-DD');

    if (!data.id) {
      data.id = nanoid();
      addExperience(data);
      methodsExperience.reset();
      return;
    }
    // data.verify_status_id=
    const experiences = experiencesProfessional.map((experience) =>
      experience.id == data.id.toString() ? data : experience
    );

    setExperiencesProfessional(experiences);
    methodsExperience.reset();
  };

  const onSubmitEducation = async (data: StudyCentre) => {
    setShowAddFormEducation(false);
    data.start_date = moment(data.start_date).format('YYYY-MM-DD');
    data.end_date = moment(data.end_date).format('YYYY-MM-DD');

    if (!data.id) {
      data.id = nanoid();
      addEducation(data);
      addStudyWorkplace(data);
      methodsEducation.reset();
      return;
    }
    editEducationById(data.id.toString(), data);
    methodsEducation.reset();
  };

  const handleSelectionWorkplace = (workplace: string) => {
    methodsExperience.setValue('workplace_name', workplace);
  };
  const submitDemo = async () => {
    await onSubmitGeneral();
    setTimeout(async () => {
      await getUSerWorkplace();
      await getUSerStudyCenter();
    }, 1000);
  };
  const onSubmitGeneral = async () => {
    setIsLoadingGeneral(true);
    await onSubmitPersonalInfo(watchInfo);
    await onSubmitSkills(methodsSkill.watch());
    const { hasError: hasErrorExperiences, message: messageExperiences } =
      await saveExperiencesProfile(experiencesProfessional);

    const { hasError: hasErrorEducations, message: messageEducations } =
      await saveEducations();

    if (hasErrorExperiences) {
      toastMessage('error', messageExperiences);
    }
    if (hasErrorEducations) {
      toastMessage('error', messageEducations);
    }
    // setExperienceCurrent(experiences);
    setIsLoadingGeneral(false);
    toastMessage('success', tc('Successfully-updated'));
    // setIsChangeData(true);
  };

  const onSubmitSkills = async (data: any) => {
    const { select_skills, placesInterest } = data;
    // await onSubmitPersonalInfo({ linkedin_url, other_link_work });
    if (select_skills) {
      await addSkill(JSON.parse(select_skills));
    }
    if (placesInterest) {
      await addPlacesInterest(
        JSON.parse(placesInterest),
        placesInterestUser.length
      );
      const placesInterestSort = JSON.parse(placesInterest);
      placesInterestSort?.sort((a: any, b: any) =>
        a.label?.localeCompare(b.label)
      );
      mutate();
      // mutate([{ value: 'product owner', label: 'product owner' }]);
    }
  };
  const isChangeData = async () => {
    const skillsdata =
      methodsSkill.watch('select_skills') &&
      JSON.parse(methodsSkill.watch('select_skills'));
    const skillsUserData = [...skillsUser];
    const placesInterestData =
      methodsSkill.watch('placesInterest') &&
      JSON.parse(methodsSkill.watch('placesInterest'));

    const placesInterestUserData = isLoadingPlacesInterestUser
      ? []
      : placesInterestUser;

    const languagesData =
      methodsPersonalInfo.watch('language') &&
      JSON.parse(methodsPersonalInfo.watch('language') || 'language');

    const languageMeList = languageMe && [...languageMe];
    languageMeList?.sort((a: any, b: any) => a.label?.localeCompare(b.label));
    languagesData?.sort((a: any, b: any) => {
      return a.label?.localeCompare(b.label);
    });
    skillsdata?.sort((a: any, b: any) => a.label?.localeCompare(b.label));
    skillsUserData?.sort((a: any, b: any) => {
      return a.label?.localeCompare(b.label);
    });
    placesInterestUserData?.sort((a: any, b: any) =>
      a.label?.localeCompare(b.label)
    );
    placesInterestData?.sort((a: any, b: any) => {
      return a.label?.localeCompare(b.label);
    });
    const isEqualRolesInterest = _.isEqual(
      placesInterestUserData,
      placesInterestData
    );

    const isEqualLanguagesInfo = _.isEqual(languageMeList, languagesData);

    const isEqualSkill = _.isEqual(skillsdata, skillsUserData);
    // const response = await darshanaApi.get('/user_workplaces/list');
    // const experiences = response.data.data;

    const isEqualExperience = _.isEqual(
      experiencesProfessional,
      experiencesProfessionalAux
    );
    const isEqualEducation = _.isEqual(educationCurrent, educations);
    const linkedinUrl = user?.linkedin_url || '';
    const otherLinkWork = user?.other_link_work || '';
    const isEqualData =
      isEqualExperience &&
      //  isEqualEducation &&
      isEqualSkill &&
      isEqualRolesInterest &&
      linkedinUrl === methodsPersonalInfo.watch('linkedin_url') &&
      otherLinkWork === methodsPersonalInfo.watch('other_link_work') &&
      isEqualLanguagesInfo;

    setIsChangeData(!isEqualData);
  };

  const downloadFile = (link: string, name: string) => {
    if (link.includes('https')) {
      window.open(link, '_blank');
    } else {
      axios({
        url: `${process.env.NEXT_PUBLIC_API}/api/file/${link}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response: any) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', name);
        document.body.appendChild(fileLink);

        fileLink.click();
        fileLink?.parentNode?.removeChild(fileLink);
      });
    }
  };
  useEffect(() => {
    isChangeData();
  }, [
    experiencesProfessional,
    educations,
    methodsSkill.watch('select_skills'),
    methodsSkill.watch('placesInterest'),
    methodsPersonalInfo.watch(),
    placesInterestUser,
  ]);
  const onClose = () => {
    Swal.close();
  };

  const onClickStatusVerify = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      html: (
        <VerifyStatus
          experiences={experiencesProfessional}
          lang={lang}
          onClose={onClose}
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

    const hasVerifyStatusProcess = experiencesProfessional.some((item) => {
      return (
        item.verify_status_id === 2 ||
        item.verify_status_id === 3 ||
        item.verify_status_id === 4
      );
    });
    if (hasVerifyStatusProcess) {
      onClickStatusVerify(e);
      return;
    }
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      html: (
        <VerifyModalTalent
          experiences={experiencesProfessional}
          lang={lang}
          onClose={onClose}
          tc={tc}
          userTalent={user}
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
    await getUSerWorkplace();
  };

  const formAddOrEditExperience = () => (
    <FormProvider {...methodsExperience}>
      <form
        className="form"
        onSubmit={methodsExperience.handleSubmit(onSubmitExperience)}
        id="formExperiences"
      >
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
            noValidate
          />
          <CInputWithIcon
            classNameDiv="col-sm-12 col-md-6 form-group"
            name="end_date"
            label={t('end-date')}
            imageUrl={'/images/icons/calendar.svg'}
            classNameDivIcon="input-icon icon-right"
            type="date"
            disable={methodsExperience.watch('work_here' as any) ? true : false}
            noValidate
          />
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 form-group-check check-space">
            <a onClick={() => methodsExperience.unregister('end_date')}>
              <CCheckbox name="work_here" label={t('currently-position')} />
            </a>

            {isRecruiter() && (
              <CCheckbox
                name="enable_business"
                label={t('active-to-recruiter')}
              />
            )}
          </div>
        </div>
        <div className="row">
          <CTextArea
            classNameDiv="col-sm-12 col-md-12 form-group"
            name="description"
            label={t('description')}
            placeholder={tc('write-here')}
            maxLength={255}
          />
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 add-button">
            <button
              className="btn btn--primary"
              type="submit"
              form="formExperiences"
            >
              {tc('add')}
            </button>
            <button
              type="button"
              className="btn btn--stroke"
              onClick={() => {
                handleResetExperiences();
              }}
            >
              {tc('cancel')}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );

  const formAddOrEditEducation = () => (
    <FormProvider {...methodsEducation}>
      <form
        className="form"
        onSubmit={methodsEducation.handleSubmit(onSubmitEducation)}
      >
        <div className="row">
          <CInput
            classNameDiv="col-sm-12 col-md-6 form-group"
            name="name"
            label={t('education-center')}
            placeholder={tc('write-here')}
          />
          <CInput
            classNameDiv="col-sm-12 col-md-6 form-group"
            name="course_name"
            label={t('course')}
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
          />
          <CInputWithIcon
            classNameDiv="col-sm-12 col-md-6 form-group"
            name="end_date"
            label={t('end-date')}
            imageUrl={'/images/icons/calendar.svg'}
            classNameDivIcon="input-icon icon-right"
            type="date"
            disable={
              methodsEducation.watch('studying_here' as any) ? true : false
            }
          />
        </div>
        <div className="row">
          <a onClick={() => methodsEducation.unregister('end_date')}>
            <CCheckbox
              classNameDiv="col-sm-12 col-md-12 form-group-check check-space"
              name="studying_here"
              label={t('currently-study')}
            />
          </a>
        </div>
        <div className="row">
          <CTextArea
            classNameDiv="col-sm-12 col-md-12 form-group"
            name="description"
            label={t('description')}
            placeholder={tc('write-here')}
            maxLength={255}
          />
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 add-button">
            <button className="btn btn--primary" type="submit">
              {tc('add')}
            </button>
            <button
              type="button"
              className="btn btn--stroke"
              onClick={handleResetEducations}
            >
              {tc('cancel')}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );

  return (
    <div className="content">
      <div className="row">
        <section className="col-sm-12 col-md-8 section content__left">
          <FormProvider {...methodsSkill}>
            <form
              id="formSkills"
              className="form"
              onSubmit={methodsSkill.handleSubmit(onSubmitSkills)}
            >
              <div className="information">
                <h1 className="text-16 c-brand-1 subtitle">
                  <strong className="black">{t('abilities')}</strong>
                </h1>

                <div className="form">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 form-group">
                      {isLoading == false && (
                        <SelectAbility
                          defaultValue={skillsUser}
                          data={skills}
                          placeholder={t('enter-ability')}
                          name="select_skills"
                        />
                      )}
                      <div className="new-ability">
                        <Image
                          className={styles.logo}
                          src="/images/icons/check-state-gray.svg"
                          width={16}
                          height={16}
                          alt="Ability icon"
                        />
                        <span className="text-12">{t('new-ability')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="information">
                <h1 className="text-16 c-brand-1 subtitle">
                  <strong className="black">
                    {isRecruiter()
                      ? t('areas-of-interest')
                      : t('roles-of-interest')}
                  </strong>
                </h1>
                <div className="form">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 form-group">
                      {isLoadingPlacesInterestUser === false && (
                        <SelectLanguage
                          defaultValue={placesInterestUser}
                          data={placesInterest}
                          placeholder={t('enter-roles')}
                          name="placesInterest"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
          <FormProvider {...methodsPersonalInfo}>
            <form
              id="formPersonalInfo"
              className="form"
              onSubmit={methodsPersonalInfo.handleSubmit(onSubmitPersonalInfo)}
            >
              <div className="information">
                <h1 className="text-16 c-brand-1 subtitle">
                  <strong className="black">{t('resume')}</strong>
                </h1>
                {user?.cv_resumen_file_url && (
                  <div className={`flex  ${styles.resume}`}>
                    <div className={styles.fileDescription}>
                      <h3 className={`text-16 c-1 ${styles.fileName}`}>
                        {user?.cv_resumen_file_name}
                      </h3>
                      <p className={`text-14 c-2 ${styles.fileSize}`}>
                        {user?.cv_resumen_file_size &&
                          sizeInMb(Number(user?.cv_resumen_file_size))}
                        Mb
                      </p>
                    </div>
                    <div className={styles.icons}>
                      <i>
                        <Image
                          src={'/images/icons/download.svg'}
                          width={16}
                          height={16}
                          alt="Darshana"
                          onClick={() =>
                            downloadFile(
                              user?.cv_resumen_file_url!!,
                              user?.cv_resumen_file_name!!
                            )
                          }
                        />
                      </i>
                    </div>
                  </div>
                )}

                <div className="form-group col-sm-12 col-md-12">
                  {/* <label className="form-label">{tc('add-files')}</label> */}
                  <DropFile
                    acceptTypeFiles={{
                      'application/pdf': ['.pdf'],
                    }}
                    name="cv_resume"
                    type="file"
                    translationCommon={tc}
                  />
                </div>
              </div>
              <div className="information">
                <p className="text-16 c-brand-1 subtitle">
                  <strong className="black">{t('linkedin')}</strong>
                </p>
                <CInputWithIcon
                  name="linkedin_url"
                  placeholder={tc('write-here')}
                  imageUrl={'/images/icons/linkedin-dark.svg'}
                />
              </div>
              <div className="information">
                <p className="text-16 c-brand-1 subtitle">
                  <strong className="black">{t('another-link')}</strong>
                </p>
                <CInput name="other_link_work" placeholder={tc('write-here')} />
              </div>
              <div className="information">
                <h1 className="text-16 c-brand-1 subtitle">
                  <strong className="black">{t('languages')}</strong>
                </h1>

                <div className="form">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 form-group">
                      {isLoadingLanguageMe === false && (
                        <SelectLanguage
                          defaultValue={languageMe}
                          data={data}
                          placeholder={t('enter-language')}
                          name="language"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
          <div className="information">
            <div className="information-row flex-space-between">
              <h1 className="text-16 c-brand-1 subtitle">
                <strong className="black">{t('experience')}</strong>
              </h1>
              <button
                className="btn btn--stroke flex-y-center"
                onClick={(e) => onClickApply(e)}
              >
                <Image
                  src={'/images/icons/experience.svg'}
                  width={18}
                  height={18}
                  alt="experience"
                />
                <span style={{ display: 'inline-block', paddingLeft: '4px' }}>
                  Verify
                </span>
              </button>
            </div>
            <div className="information-row">
              <div className="divider" />

              {experiencesProfessional?.map(
                (experience: Workplace, index: number) => (
                  <div key={index}>
                    <div className="information-row__body">
                      <div className="information-row__text">
                        <div className="flex-y-center">
                          <h1 className="text-20 c-1">
                            <strong>{experience.position}</strong>
                          </h1>
                          {experience.verify_status_id === 3 && (
                            <Tooltip text={tc('verified-experience')}>
                              <div className="flex-y-center">
                                <Image
                                  src={'/images/icons/experience.svg'}
                                  width={18}
                                  height={18}
                                  alt="experience"
                                />
                              </div>
                            </Tooltip>
                          )}
                        </div>

                        <h2 className="text-16 c-1">
                          {experience.workplace_name}
                        </h2>
                        <span className="text-16 c-1">
                          {convertDateToNameMonth(experience.start_date, lang)}{' '}
                          {convertDateToYYYY(experience.start_date)} {' - '}
                          {experience.work_here ? (
                            'actualidad'
                          ) : (
                            <>
                              {convertDateToNameMonth(
                                experience.end_date,
                                lang
                              )}{' '}
                              {convertDateToYYYY(experience.end_date)}
                            </>
                          )}
                          {' / '}
                          {experience.work_here ? (
                            <>
                              {' '}
                              {diffDatesByMonths(
                                new Date(),
                                experience.start_date
                              )}{' '}
                              meses
                            </>
                          ) : (
                            <>
                              {' '}
                              {diffDatesByMonths(
                                experience.end_date,
                                experience.start_date
                              )}{' '}
                              meses
                            </>
                          )}
                        </span>
                      </div>
                      <div className="information-row__icons">
                        <i>
                          <Image
                            src={'/images/icons/edit.svg'}
                            width={24}
                            height={24}
                            alt="Darshana"
                            onClick={() => {
                              if (!ShowEditFormExperience) {
                                setShowEditFormExperience(true);
                              }
                              handleEditExperience(experience.id.toString());
                            }}
                          />
                        </i>
                        <i>
                          <Image
                            src={'/images/icons/trash.svg'}
                            width={24}
                            height={24}
                            alt="Darshana"
                            onClick={() =>
                              deleteExperienceById(experience.id.toString())
                            }
                          />
                        </i>
                      </div>
                    </div>
                    {ShowEditFormExperience &&
                    experienceSelect === experience.id.toString() ? (
                      <>
                        <div style={{ height: 30 }} />
                        {formAddOrEditExperience()}
                      </>
                    ) : null}
                    <div className="divider" />
                  </div>
                )
              )}
            </div>
            {showAddFormExperience ? (
              formAddOrEditExperience()
            ) : (
              <div className="information-row__add">
                <div onClick={() => setShowAddFormExperience(true)}>
                  <strong>{tc('add-experience')}</strong>
                </div>
                <Image
                  src={'/images/icons/add-circle-outline.svg'}
                  width={25}
                  height={25}
                  alt="Darshana"
                  onClick={() => setShowAddFormExperience(true)}
                />
              </div>
            )}
          </div>
          <div className="divider space" />
          <div className="information">
            <h1 className="text-16 c-brand-1 subtitle">
              <strong className="black">{t('education')}</strong>
            </h1>
            <div className="information-row">
              {educationsCenter?.map((education: StudyCentre, key: number) => (
                <div key={key}>
                  <div className="divider" />
                  <div className="information-row__body">
                    <div className="information-row__text">
                      <div className="flex-y-center">
                        <h1 className="text-16 c-1">
                          <strong>{education.course_name}</strong>
                        </h1>
                        {education.verify_status_id === 3 && (
                          <Tooltip text={tc('verified-experience')}>
                            <div className="flex-y-center">
                              <Image
                                src={'/images/icons/experience.svg'}
                                width={18}
                                height={18}
                                alt="Darshana"
                              />
                            </div>
                          </Tooltip>
                        )}
                      </div>
                      <h2 className="text-16 c-1">{education.name}</h2>
                      <span className="text-16 c-1">
                        {convertDateToNameMonth(education.start_date, lang)}{' '}
                        {convertDateToYYYY(education.start_date)} {' - '}
                        {education.studying_here ? (
                          'Actualidad'
                        ) : (
                          <>
                            {convertDateToNameMonth(education.end_date, lang)}{' '}
                            {convertDateToYYYY(education.end_date)}
                          </>
                        )}
                        {' / '}
                        {education.studying_here ? (
                          <>
                            {' '}
                            {diffDatesByMonths(
                              new Date(),
                              education.start_date
                            )}{' '}
                            meses
                          </>
                        ) : (
                          <>
                            {' '}
                            {diffDatesByMonths(
                              education.end_date,
                              education.start_date
                            )}{' '}
                            meses
                          </>
                        )}
                      </span>
                    </div>
                    <div className="information-row__icons">
                      <i>
                        <Image
                          src={'/images/icons/edit.svg'}
                          width={24}
                          height={24}
                          alt="Darshana"
                          onClick={() => {
                            setShowAddFormEducation(false)
                            setShowEditFormEducation(true);
                            handleEditEducation(education.id.toString());
                          }}
                        />
                      </i>
                      <i>
                        <Image
                          src={'/images/icons/trash.svg'}
                          width={24}
                          height={24}
                          alt="Darshana"
                          onClick={() => {
                            removeEducationById(education.id.toString());
                            deleteStudyWorkplaceById(education.id.toString());
                          }}
                        />
                      </i>
                      <i>
                        <Image
                          src={'/images/dar.png'}
                          width={24}
                          height={24}
                          alt="Darshana"
                          className={`${
                            education.verify_status_id !== 1 ? 'disabled' : ''
                          }`}
                          onClick={() => {
                            if (education.verify_status_id === 1) {
                              handlerClickValidateEducation(
                                styles,
                                tv,
                                tc,
                                education.name,
                                education.id,
                                lang,
                                getUSerStudyCenter
                              );

                              const educationCurrent = getEducationById(
                                education.id.toString()
                              );
                              educationCurrent.verify_status_id = 2;
                              editEducationById(
                                education.id.toString(),
                                educationCurrent
                              );
                            }
                          }}
                        />
                      </i>
                    </div>
                  </div>
                  {showEditFormEducation &&
                    educationSelect === education.id.toString() ? (
                      <>
                        <div style={{ height: 30 }} />
                        {formAddOrEditEducation()}
                      </>
                    ) : null}
                </div>
              ))}
              <div className="divider" />
              {showAddFormEducation ? (
                <>
                  <div style={{ height: 30 }} />
                  <FormProvider {...methodsEducation}>
                    <form
                      className="form"
                      onSubmit={methodsEducation.handleSubmit(
                        onSubmitEducation
                      )}
                    >
                      <div className="row">
                        <CInput
                          classNameDiv="col-sm-12 col-md-6 form-group"
                          name="name"
                          label={t('education-center')}
                          placeholder={tc('write-here')}
                        />
                        <CInput
                          classNameDiv="col-sm-12 col-md-6 form-group"
                          name="course_name"
                          label={t('course')}
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
                        />
                        <CInputWithIcon
                          classNameDiv="col-sm-12 col-md-6 form-group"
                          name="end_date"
                          label={t('end-date')}
                          imageUrl={'/images/icons/calendar.svg'}
                          classNameDivIcon="input-icon icon-right"
                          type="date"
                          disable={
                            methodsEducation.watch('studying_here' as any)
                              ? true
                              : false
                          }
                        />
                      </div>
                      <div className="row">
                        <a
                          onClick={() =>
                            methodsEducation.unregister('end_date')
                          }
                        >
                          <CCheckbox
                            classNameDiv="col-sm-12 col-md-12 form-group-check check-space"
                            name="studying_here"
                            label={t('currently-study')}
                          />
                        </a>
                      </div>
                      <div className="row">
                        <CTextArea
                          classNameDiv="col-sm-12 col-md-12 form-group"
                          name="description"
                          label={t('description')}
                          placeholder={tc('write-here')}
                          maxLength={255}
                        />
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-12 add-button">
                          <button className="btn btn--primary" type="submit">
                            {tc('add')}
                          </button>
                          <button
                            type="button"
                            className="btn btn--stroke"
                            onClick={handleResetEducations}
                          >
                            {tc('cancel')}
                          </button>
                        </div>
                      </div>
                    </form>
                  </FormProvider>
                </>
              ) : null}
            </div>
            {showAddFormEducation ? (
              null
              // formAddOrEditEducation()
            ) : (
              <div className="information-row__add">
                <div onClick={() => {
                  if(showEditFormEducation) {
                    handleResetEducations()
                  }
                  setShowAddFormEducation(true)
                }}>
                  <strong>{tc('add-education')}</strong>
                </div>
                <Image
                  src={'/images/icons/add-circle-outline.svg'}
                  width={25}
                  height={25}
                  alt="Darshana"
                  onClick={() => setShowAddFormEducation(true)}
                />
              </div>
            )}
          </div>
          <div className="divider space" />
        </section>
        <section className="col-sm-12 col-md-4 section content__right">
          <h1 className="text-16 message text-center">
            <strong className="black">{t('profile-text')}</strong>
          </h1>
          <CButton
            label={tc('save-button')}
            loading={isLoadingGeneral}
            classNameButton="btn btn--primary btn--full"
            type="submit"
            form="formSkills"
            onClick={() => submitDemo()}
          />
        </section>
      </div>
    </div>
  );
};

export default React.memo(ProfileProfessionalData);
