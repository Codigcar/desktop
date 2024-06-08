import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';
import * as yup from 'yup';

import { apiLocation, darshanaApiNoToken } from '@api/darshanaApiNoToken';
import {
  CButton,
  CConfirmAlert,
  CInput,
  CInputWithIcon,
  CSelect,
  CSelectDefault,
} from '@components/Atoms';
import CDropzoneWithPreview from '@components/Atoms/CDropzoneWithPreview/CDropzoneWithPreview';
import { CTextArea } from '@components/Atoms/CTextArea/CTextArea';
import { AuthContext } from '@contexts/auth';
import { ProfileContext } from '@contexts/user-profile';
import { useCountries } from '@hooks';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import {
  modalDelete,
  modalDeleteAccount,
  toastMessage,
  useYupValidationResolver,
} from '@utils/index';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NearContext } from '../../../contexts/near/NearContext';
import { darshanaApi } from 'src/api';
import _ from 'lodash';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { options } from '../../../utils/confirmDialogOptions';
import i18nConfig from '@constants/i18n';
import { CSelectLocation } from '@components/Atoms/CSelect/CSelectLocation';
import {
  useFetchGender,
  useFetchIndustries,
  useFetchIndustriesMe,
} from '@hooks/useFetchSWR';

export interface FormDataInfoPersonal {
  name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  subtitle?: string;
  summary?: string;
  facebook_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  discord_url?: string;
  ubigeo_country: any;
  ubigeo_city: any;
  ubigeo_state: any;
  country_id?: any;
  city_id?: any;
  profile_picture_url?: string;
  default_cover_image_url?: string;
  other_link_work?: string;
  cv_resume?: any[];
  urlFile?: string;
  language?: string;
  cv_resumen_file_url?: string;
  cv_resumen_file_name?: string;
  cv_resumen_file_size?: string;
  industry?: number;
  gender?: number | string;
  isCityExist?: boolean;
  isStateExist?: boolean;
}

export interface FormDataChangePassword {
  newPassword: string;
  repeatPassword: string;
}
interface ComponentProps {
  setIsChangeData: Dispatch<SetStateAction<boolean>>;
}

const ProfilePersonalData: FC<ComponentProps> = ({ setIsChangeData }) => {
  const { t } = useTranslation('profile');
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const router = useRouter();
  const { account_id } = router.query;
  const { user } = useContext(AuthContext);
  const { connectAccount, initContract } = useContext(NearContext);
  const [tr, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;
  const {
    saveInfoPersonal,
    saveChangePassword,
    saveAlgoAddress,
    saveNearWallet,
    deleteNearWalletPost,
    deleteAlgoAddressPost,
  } = useContext(ProfileContext);
  const [stateArray, setStateArray] = useState<any>([]);
  const [citiesArray, setCitiesArray] = useState<any>([]);
  const { data: industriesList } = useFetchIndustries('industries', lang);
  const { data: genderList } = useFetchGender('genders', lang);
  const {
    data: genderMe,
    isLoading: isLoadingGenderMe,
    mutate,
  } = useFetchGender('me/genders', lang);
  const { data: industriesMe, mutate: mutateIndustriesMe } =
    useFetchIndustriesMe('me/industries', lang);
  const myAlgoWallet = new MyAlgoConnect();
  interface ConnectionSettings {
    shouldSelectOneAccount?: boolean;
    openManager?: boolean;
  }
  const connectToMyAlgo = async () => {
    try {
      const settings: ConnectionSettings = {
        shouldSelectOneAccount: false,
        openManager: false,
      };
      const accounts = await myAlgoWallet.connect(settings);
      const addresses = accounts.map((account) => account.address);
      const dataUserUpdate = {
        algo_address: addresses[0],
      };
      const response = await saveAlgoAddress(dataUserUpdate);
    } catch (err) {
      console.error(err);
    }
  };
  let regex = new RegExp('^[ñíóáéú a-zA-Z ]+$');
  const validationSchemaPersonalInfo = useMemo(
    () =>
      yup.object().shape({
        name: yup
          .string()
          .required(tv('required-field'))
          .matches(regex, tv('only-text')),
        last_name: yup
          .string()
          .required(tv('required-field'))
          .matches(regex, tv('only-text')),
        email: yup
          .string()
          .email(tv('invalid-email'))
          .required(tv('required-field')),
        phone: yup
          .string()
          .typeError(tv('invalid-number'))
          .required(tv('required-field'))
          .min(9, tv('invalid-minlength'))
          .max(20, tv('invalid-maxlength')),
        //subtitle: yup.string().required(tv('required-field')),
        summary: yup
          .string()
          .max(255, tv('invalid-max', { length: 255 }))
          .required(tv('required-field')),
        facebook_url: yup.string().typeError(tv('invalid-string')),
        twitter_url: yup.string().typeError(tv('invalid-string')),
        // linkedin_url: yup.string().typeError(tv('invalid-string')),
        discord_url: yup.string().typeError(tv('invalid-string')),
        gender: yup
          .string()
          .required(tv('required-field'))
          .oneOf(['1', '2', '3'], tv('required-field')),
        ubigeo_country: yup
          .string()
          .required(tv('required-field'))
          .min(2, tv('required-field')),
        isStateExist: yup.bool(),
        isSCityExist: yup.bool(),
        ubigeo_state: yup.string().when('isStateExist', {
          is: true,
          then: yup
            .string()
            .required(tv('required-field'))
            .min(2, tv('required-field')),
        }),
        ubigeo_city: yup.string().when('isCityExist', {
          is: true,
          then: yup
            .string()
            .required(tv('required-field'))
            .min(2, tv('required-field')),
        }),
      }),
    [tv]
  );
  const validationSchemaChangePassword = useMemo(
    () =>
      yup.object().shape({
        newPassword: yup
          .string()
          .required(tv('required-field'))
          .min(6, tv('password-min-length')),
        repeatPassword: yup
          .string()
          .required(tv('required-field'))
          .min(6, tv('password-min-length'))
          .oneOf([yup.ref('newPassword')], tv('password-repeat-error')),
      }),
    [tv]
  );

  const methodsPersonalInfo = useForm<FormDataInfoPersonal>({
    mode: 'onChange',
    resolver: useYupValidationResolver(validationSchemaPersonalInfo),
    defaultValues: {
      name: user?.person.name || '',
      last_name: user?.person.last_name || '',
      email: user?.email || '',
      phone: user?.person.phone || '',
      subtitle: user?.subtitle || '',
      summary: user?.summary || '',
      facebook_url: user?.facebook_url || '',
      twitter_url: user?.twitter_url || '',
      linkedin_url: user?.linkedin_url || '',
      discord_url: user?.discord_url || '',
      ubigeo_country: user?.ubigeo_country || '0',
      ubigeo_city: user?.ubigeo_city || '0',
      ubigeo_state: user?.ubigeo_state || '0',
      profile_picture_url: user?.profile_picture_url || '',
      default_cover_image_url: user?.default_cover_image_url || '',
      industry: industriesMe?.industry?.id,
      gender: genderMe?.gender?.id,
      isCityExist: true,
      isStateExist: true,
    },
  });

  const methodsChangePassword = useForm<FormDataChangePassword>({
    mode: 'onChange',
    resolver: useYupValidationResolver(validationSchemaChangePassword),
  });
  useEffect(() => {
    methodsPersonalInfo.setValue('industry', industriesMe?.industry?.id);
  }, [industriesMe]);
  useEffect(() => {
    methodsPersonalInfo.setValue('gender', genderMe?.gender?.id);
  }, [genderMe, isLoadingGenderMe]);
  // useEffect(() => {
  //   methodsPersonalInfo.setValue('industry',industriesMe?.industry?.id);
  // }, [industriesMe])
  useEffect(() => {
    changeState();
    // changeCity();
  }, [methodsPersonalInfo.watch('ubigeo_country')]);

  useEffect(() => {
    changeCity();
  }, [methodsPersonalInfo.watch('ubigeo_state')]);
  useEffect(() => {
    const updateWalletNear = async () => {
      if (account_id) {
        const { currentUser } = await initContract();
        if (currentUser) {
          const dataUserUpdate = {
            near_wallet: currentUser.accountId,
          };
          const response = await saveNearWallet(dataUserUpdate);
        }
      }
    };
    updateWalletNear();
  }, [account_id]);
  const fetchIndustry = async (industry: string) => {
    await darshanaApi.delete('/me/industries');
    await darshanaApi.post('/me/industries', { industry_id: Number(industry) });
  };
  const fetchGenderMe = async (id: string | number) => {
    if (!genderMe) {
      return await darshanaApi.post('/me/genders', { gender_id: id });
    }
    await darshanaApi.patch('/me/genders', { gender_id: id });
  };
  const onSubmitPersonalInfo = async (data: FormDataInfoPersonal) => {
    if (!data.isCityExist) {
      data.ubigeo_city = '';
    }
    if (!data.isStateExist) {
      data.ubigeo_state = '';
    }
    delete data.isCityExist;
    delete data.isStateExist;
    // if (data.ubigeo_city === '0') {
    //   delete data.ubigeo_city;
    // }
    // if (data.ubigeo_state === '0') {
    //   delete data.ubigeo_state;
    // }
    await fetchIndustry(data?.industry?.toString() || '1');
    await fetchGenderMe(data.gender || '1');
    await mutateIndustriesMe();
    await mutate();
    const { hasError, message } = await saveInfoPersonal(data);
    if (hasError) {
      toastMessage('error', message);
      return;
    }

    toastMessage('success', message);
  };

  const onDeleteAccount = async () => {
    const response = await modalDeleteAccount(tc);
    if (!response) return;

    const { data: resp } = await darshanaApi.delete('/users/delete');
    if (!resp.status) {
      var dialogOptions = options(
        t('delete-account-title'),
        t('delete-account-message')
      );
      dialogOptions.buttons = [
        {
          key: '1',
          label: lang === 'es' ? 'Contactar soporte' : 'Contact support',
          action: () => {
            router.push('/help-center');
          },
        },
        {
          key: '2',
          label: lang === 'es' ? 'Cerrar' : 'Close',
          action: () => {
            /// console.log('close');
          },
        },
      ];
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <CConfirmAlert
              title={dialogOptions.title}
              message={dialogOptions.message}
              buttons={dialogOptions.buttons}
              onClose={onClose}
            />
          );
        },
      });

      // stoastMessage('error', 'Delete account');
    } else {
      toastMessage('success', 'Deleted account');
      localStorage.removeItem('persist:root');
      localStorage.removeItem('[authState]');
      localStorage.removeItem('access_token');
      localStorage.removeItem('state');
      await router.push('/auth/login');
    }
  };

  const onSubmitChangePassword = async ({
    newPassword,
    repeatPassword,
  }: FormDataChangePassword) => {
    const { hasError, message } = await saveChangePassword(
      newPassword,
      repeatPassword
    );

    if (hasError) {
      toastMessage('error', message);
      return;
    }

    toastMessage('success', message);
  };

  const { countries, isLoading: isLoadingCountries } = useCountries(
    '/countries/flag/unicode'
  );
  // countries?.data.sort((a, b) => a.nombre.localeCompare(b.nombre));

  const changeCity = useCallback(async () => {
    if (methodsPersonalInfo.watch('ubigeo_state') === '0') {
      methodsPersonalInfo.setValue('ubigeo_city', '0');
      return;
    }
    apiLocation
      .post(`state/cities`, {
        country: methodsPersonalInfo.watch('ubigeo_country'),
        state: methodsPersonalInfo.watch('ubigeo_state'),
      })
      .then((res) => {
        if (!res.data.error) {
          if (res.data.data.length === 0) {
            methodsPersonalInfo.setValue('isCityExist', false);
            setCitiesArray([]);
            methodsPersonalInfo.setValue('ubigeo_city', '0');
            return;
          }
          methodsPersonalInfo.setValue('isCityExist', true);
          const cities = res.data.data.map((city: string) => ({ name: city }));
          // cities.sort((a: any, b: any) => a.name.localeCompare(b.name));
          setCitiesArray(cities);
          if (methodsPersonalInfo.watch('ubigeo_state') == user?.ubigeo_state) {
            setTimeout(() => {
              methodsPersonalInfo.setValue('ubigeo_city', user?.ubigeo_city);
            }, 100);
          }
        }
      })
      .catch((error) => {
        /* console.log(error) */
      });
  }, [methodsPersonalInfo.watch('ubigeo_state')]);
  const changeState = useCallback(async () => {
    if (methodsPersonalInfo.watch('ubigeo_country') === '0') {
      methodsPersonalInfo.setValue('ubigeo_city', '0');
      methodsPersonalInfo.setValue('ubigeo_state', '0');
      setCitiesArray([]);
      setStateArray([]);
      return;
    }
    methodsPersonalInfo.setValue('ubigeo_city', '0');
    apiLocation
      .post(`states`, {
        country: methodsPersonalInfo.watch('ubigeo_country'),
      })
      .then((res) => {
        if (!res.data.error) {
          if (res.data.data.states.length === 0) {
            methodsPersonalInfo.setValue('isStateExist', false);
            methodsPersonalInfo.setValue('isCityExist', false);
            methodsPersonalInfo.setValue('ubigeo_state', '0');
            methodsPersonalInfo.setValue('ubigeo_city', '0');
            setCitiesArray([]);
            setStateArray([]);
            return;
          }
          // setCitiesArray([]);
          methodsPersonalInfo.setValue('isStateExist', true);
          // methodsPersonalInfo.setValue('isCityExist', true);
          const stateInfo = res.data.data.states;
          stateInfo.sort((a: any, b: any) => a.name.localeCompare(b.name));
          setStateArray(stateInfo);
          if (
            methodsPersonalInfo.watch('ubigeo_country') == user?.ubigeo_country
          ) {
            setTimeout(() => {
              methodsPersonalInfo.setValue('ubigeo_state', user?.ubigeo_state);
            }, 100);
          } else {
            setCitiesArray([]);
            methodsPersonalInfo.setValue('isCityExist', true);
          }
        } else {
          methodsPersonalInfo.setValue('isCityExist', false);
          methodsPersonalInfo.setValue('isStateExist', false);
        }
      })
      .catch((error) => {
        // console.log(error);
        methodsPersonalInfo.setValue('isCityExist', false);
        methodsPersonalInfo.setValue('isStateExist', false);
        methodsPersonalInfo.setValue('ubigeo_city', '0');
        methodsPersonalInfo.setValue('ubigeo_state', '0');
      });
  }, [methodsPersonalInfo.watch('ubigeo_country')]);
  const validationChanges = () => {
    const defaultValues = {
      name: user?.person.name || '',
      last_name: user?.person.last_name || '',
      email: user?.email || '',
      phone: user?.person.phone || '',
      subtitle: user?.subtitle || '',
      summary: user?.summary || '',
      facebook_url: user?.facebook_url || '',
      twitter_url: user?.twitter_url || '',
      linkedin_url: user?.linkedin_url || '',
      discord_url: user?.discord_url || '',
      ubigeo_country: user?.ubigeo_country || '0',
      ubigeo_city: user?.ubigeo_city || '0',
      ubigeo_state: user?.ubigeo_state || '0',
      profile_picture_url: user?.profile_picture_url || '',
      default_cover_image_url: user?.default_cover_image_url || '',
      industry: industriesMe?.industry?.id,
      gender: genderMe?.gender.id,
    };
    const infoPersonalCurrent = methodsPersonalInfo.watch();
    delete infoPersonalCurrent.isCityExist;
    delete infoPersonalCurrent.isStateExist;

    infoPersonalCurrent.gender =
      infoPersonalCurrent.gender && Number(infoPersonalCurrent.gender);

    const isEqual = _.isEqual(defaultValues, infoPersonalCurrent);
    setIsChangeData(!isEqual);
  };

  useEffect(() => {
    validationChanges();
  }, [methodsPersonalInfo.watch(), industriesMe, genderMe]);
  const isRecluiterUser = () => {
    const isRecruiter = user?.workplaces.find(
      (workplace) => workplace.enable_business
    );
    if (isRecruiter) {
      return true;
    }
    return !user?.is_talent ? true : false;
  };

  if (isLoadingCountries) {
    return <div>Loading...</div>;
  }
  return (
    <div className="content">
      <div className="row">
        <section className="col-sm-12 col-md-8 section content__left">
          <FormProvider {...methodsPersonalInfo}>
            <form
              id="formPersonalInfo"
              className="form"
              onSubmit={methodsPersonalInfo.handleSubmit(onSubmitPersonalInfo)}
            >
              <div className="information">
                <h1 className="text-16 c-brand-1 subtitle">
                  <strong className="black">{t('personal-information')}</strong>
                </h1>
                <div className="form">
                  <div className="row">
                    <CInput
                      classNameDiv="col-sm-12 col-md-6 form-group"
                      name="name"
                      label={t('name')}
                      placeholder={tc('write-here')}
                    />
                    <CInput
                      classNameDiv="col-sm-12 col-md-6 form-group"
                      name="last_name"
                      label={t('lastname')}
                      placeholder={tc('write-here')}
                    />
                  </div>
                  <div className="row">
                    <CInput
                      classNameDiv="col-sm-12 col-md-6 form-group"
                      name="email"
                      label={t('email')}
                      placeholder={tc('write-here')}
                    />
                    <CInput
                      classNameDiv="col-sm-12 col-md-6 form-group"
                      name="phone"
                      type="number"
                      label={t('cellphone')}
                      placeholder={tc('write-here')}
                    />
                  </div>
                  <div className="row">
                    {isLoadingCountries ? (
                      <div></div>
                    ) : (
                      <CSelectLocation
                        classNameDiv="col-sm-12 col-md-6 form-group"
                        name="ubigeo_country"
                        label={t('country')}
                        placeholder={tv('select-country')}
                        options={countries || []}
                        valueName={'name'}
                      />
                    )}
                    {methodsPersonalInfo.watch('isStateExist') && (
                      <CSelectLocation
                        classNameDiv="col-sm-12 col-md-6 form-group"
                        name="ubigeo_state"
                        label={t('state-location')}
                        placeholder={tv('select-state')}
                        options={stateArray || []}
                        valueName={'name'}
                      />
                    )}
                    {methodsPersonalInfo.watch('isCityExist') && (
                      <CSelectLocation
                        classNameDiv="col-sm-12 col-md-6 form-group"
                        name="ubigeo_city"
                        label={t('city')}
                        placeholder={tv('select-city')}
                        options={citiesArray || []}
                        valueName={'name'}
                      />
                    )}
                    <CSelect
                      classNameDiv="col-sm-12 col-md-6 form-group"
                      name="gender"
                      label={t('gender')}
                      placeholder={tv('select-gender')}
                      options={genderList || []}
                      valueName={lang === 'es' ? 'name_es' : 'name_en'}
                    />
                  </div>
                </div>
              </div>
              <div className="information">
                <h1 className="text-16 c-brand-1 subtitle">
                  <strong className="black">
                    {isRecluiterUser()
                      ? t('about-your-company')
                      : t('about-me')}
                  </strong>
                </h1>
                <div className="form">
                  {/* <div className="row"> */}
                  {/*   <CInputWithIcon */}
                  {/*     classNameDiv="col-sm-12 col-md-6 form-group" */}
                  {/*     name="facebook" */}
                  {/*     label={t('salary-pretensions')} */}
                  {/*     placeholder={tc('write-here')} */}
                  {/*     imageUrl={'/images/icons/dollar.svg'} */}
                  {/*   /> */}
                  {/* </div> */}
                  <div className="row">
                    {isRecluiterUser() ? (
                      <CSelectDefault
                        classNameDiv="col-sm-12 col-md-12 form-group"
                        name="industry"
                        label={t('industry')}
                        options={industriesList || []}
                        valueName={lang === 'es' ? 'name_es' : 'name_en'}
                      />
                    ) : (
                      <CInput
                        classNameDiv="col-sm-12 col-md-12 form-group"
                        name="subtitle"
                        label={t('profession')}
                        placeholder={tc('write-here')}
                      />
                    )}
                  </div>
                  <div className="row">
                    {
                      <CTextArea
                        classNameDiv="col-sm-12 col-md-12 form-group"
                        name="summary"
                        label={t('description')}
                        maxLength={255}
                        placeholder={
                          !isRecluiterUser()
                            ? tc('placeholder-attention')
                            : tc('write-here')
                        }
                      />
                    }
                  </div>
                  <div className="row">
                    <CInputWithIcon
                      classNameDiv="col-sm-12 col-md-6 form-group"
                      name="facebook_url"
                      label={t('facebook')}
                      placeholder={tc('write-here')}
                      imageUrl={'/images/icons/facebook-dark.svg'}
                    />
                    <CInputWithIcon
                      classNameDiv="col-sm-12 col-md-6 form-group"
                      name="twitter_url"
                      label={t('twitter')}
                      placeholder={tc('write-here')}
                      imageUrl={'/images/icons/twitter-dark.svg'}
                    />
                  </div>
                  <div className="row">
                    {/* <CInputWithIcon
                      classNameDiv="col-sm-12 col-md-6 form-group"
                      name="linkedin_url"
                      label={t('linkedin')}
                      placeholder={tc('write-here')}
                      imageUrl={'/images/icons/linkedin-dark.svg'}
                    /> */}
                    <CInputWithIcon
                      classNameDiv="col-sm-12 col-md-6 form-group"
                      name="discord_url"
                      label={t('Discord')}
                      placeholder={tc('write-here')}
                      imageUrl={'/images/icons/discord-dark.svg'}
                    />
                  </div>
                </div>
              </div>

              <div className="information">
                <h1 className="text-16 c-1 subtitle">
                  <strong className="black">{t('change-photo')}</strong>
                </h1>

                <div className="form-group col-sm-12 col-md-6 flex">
                  <div>
                    <CDropzoneWithPreview
                      name={'profile_picture_url'}
                      style={{
                        objectFit: 'contain',
                        width: '100%',
                        height: '100%',
                      }}
                      styleContainer={{ height: '100%', width: '200px' }}
                      label={t('Upload-image')}
                    />
                  </div>
                  <div>
                    <label className="form-label c-1 recommended-text">
                      {tv('file-size-max')}
                    </label>
                    <p className="form-label recommended-text">
                      {tv('recommended-dimensions')}
                    </p>
                  </div>
                </div>
              </div>
              {isRecluiterUser() && (
                <div className="information">
                  <h1 className="text-16 c-1 subtitle">
                    <strong className="black">
                      {t('change-photo-project')}
                    </strong>
                  </h1>
                  <div className="form-group col-sm-12 flex flex-y-center">
                    <div style={{ width: '100%' }}>
                      <CDropzoneWithPreview
                        name={'default_cover_image_url'}
                        style={{
                          objectFit: 'contain',
                          width: '100%',
                          height: '100%',
                        }}
                        styleContainer={{ height: '240px', width: '100%' }}
                        label={t('Upload-image')}
                      />
                    </div>
                    <div>
                      <label className="form-label c-1 recommended-text">
                        {tv('file-size-max')}
                      </label>
                      <p className="form-label recommended-text">
                        {tv('recommended-dimensions2')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </FormProvider>

          <div className="divider space"></div>
          {!isRecluiterUser() && (
            <div className="information">
              <h2 className="text-16 c-1 subtitle">
                <strong className="black">{t('account-connected')}</strong>
              </h2>
              <p>{t('account-contents')}</p>
              <p className="connect-algorand">{t('algorand-connect')}</p>

              <div className="information__container">
                <div className="information__container__row">
                  <div>
                    <Image
                      src="/images/icon-algorant.png"
                      alt="icon Algorants"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="container__wallet">
                    <strong>Algorand</strong>
                    {user?.algo_address &&
                    localStorage.getItem('isConnectAlgorand') ? (
                      <button
                        className="text-conecction"
                        onClick={() => deleteAlgoAddressPost()}
                      >
                        {t('disconnect')}
                      </button>
                    ) : (
                      <button
                        className="text-conecction"
                        onClick={connectToMyAlgo}
                      >
                        {t('connect')}
                      </button>
                    )}
                  </div>
                </div>
                <div className="information__container__row">
                  <div>
                    <Image
                      src="/images/icon-NearProtocol.png"
                      alt="icon Algorants"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="container__wallet">
                    <strong>Near Protocol</strong>
                    {localStorage.getItem('darshana_wallet_auth_key') &&
                    user?.near_wallet ? (
                      <button
                        className="text-conecction"
                        onClick={() => {
                          deleteNearWalletPost();
                          router.push('/edit-profile');
                        }}
                      >
                        {t('disconnect')}
                      </button>
                    ) : (
                      <button
                        className="text-conecction"
                        onClick={connectAccount}
                      >
                        {t('connect')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <div className="divider space"></div> */}
          <div className="information">
            <h1 className="text-16 c-1 subtitle">
              <strong className="black">{t('change-password')}</strong>
            </h1>
            <FormProvider {...methodsChangePassword}>
              <form
                id="formChangePassword"
                className="form"
                onSubmit={methodsChangePassword.handleSubmit(
                  onSubmitChangePassword
                )}
              >
                <div className="row">
                  <CInput
                    classNameDiv="col-sm-12 col-md-6 form-group"
                    name="newPassword"
                    label={t('new-password')}
                    placeholder={tc('write-here')}
                    type="password"
                  />
                  <CInput
                    classNameDiv="col-sm-12 col-md-6 form-group"
                    name="repeatPassword"
                    label={t('repeat-new-password')}
                    placeholder={tc('write-here')}
                    type="password"
                  />
                </div>
                <CButton
                  label={tc('save-button')}
                  loading={methodsChangePassword.formState.isSubmitting}
                  classNameButton="btn btn--stroke save-button"
                  type="submit"
                  form="formChangePassword"
                  colorSpinner="#446b34" //optional
                />
              </form>
            </FormProvider>
          </div>
          <div className="divider space"></div>
          <div className="information">
            <h1 className="text-16 c-1 subtitle">
              <strong className="black">{t('delete-account')}</strong>
            </h1>
            <p>{t('delete-account-text')}</p>
            <button
              className="btn btn--stroke save-button"
              onClick={onDeleteAccount}
            >
              {tc('delete-account-button')}
            </button>
          </div>
        </section>
        <section className="col-sm-12 col-md-4 section content__right">
          <h1 className="text-16 message text-center">
            <strong className="black">{t('profile-text')}</strong>
          </h1>
          <CButton
            label={tc('save-button')}
            loading={methodsPersonalInfo.formState.isSubmitting}
            classNameButton="btn btn--primary btn--full"
            type="submit"
            form="formPersonalInfo"
          />
        </section>
      </div>
    </div>
  );
};

export default React.memo(ProfilePersonalData);
