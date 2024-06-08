import { useContext, useEffect, useMemo } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';

import LayoutAuth from '@layouts/LayoutAuth';
import {
  CButton,
  CCheckbox,
  CInput,
  CInputWithIcon,
  CSearch,
  CSelectDefault,
} from '@components/Atoms';
import { AuthContext } from '@contexts/auth';
import { useYupValidationResolver, toastMessage } from '@utils/index';
import i18nConfig from '../../constants/i18n';
import moment from 'moment';
import { darshanaApiNoToken } from '../../api/darshanaApiNoToken';

type FormData = {
  emailRegister: string;
  name: string;
  last_name: string;
  phone: string;
  password: string;
  google_id: string;
  algorand_address: string;
  profile_picture_url: string;
  contract_type?: string;
  workplace_name?: string;
  position?: string;
  start_date?: string;
};

const CreateAccount: NextPage = () => {
  const router = useRouter();
  const [, i18nConfig] = useTranslation();
  const { registerUser } = useContext(AuthContext);
  const { t } = useTranslation('auth');
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const { t: tp } = useTranslation('profile');
  const lang = i18nConfig.language;
  const regexString = new RegExp('^[ñíóáéú a-zA-Z ]+$');
  const regexPhoneNumber = new RegExp(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  );
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        emailRegister: yup
          .string()
          .email(tv('invalid-email'))
          .required(tv('required-field')),
        password: yup
          .string()
          .required(tv('required-field'))
          .min(6, tv('password-min-length')),
        name: yup
          .string()
          .required(tv('required-field'))
          .matches(regexString, tv('only-text')),
        last_name: yup
          .string()
          .required(tv('required-field'))
          .matches(regexString, tv('only-text')),
        phone: yup
          .string()
          .typeError(tv('invalid-number'))
          .matches(regexPhoneNumber, 'invalid-number')
          .required(tv('required-field'))
          .min(9, tv('invalid-minlength'))
          .max(20, tv('maxlength-phone-register')),
        checkboxTerms: yup.number().typeError(tv('required-checkbox')),
        algorand_address: yup.string().max(58, tv('invalid-algorand')),
        contract_type: yup.string().required(),
        position: yup.string().when('contract_type', {
          is: tc('recruiter'),
          then: yup.string().required(tv('required-field')),
        }),
        workplace_name: yup.string().when('contract_type', {
          is: tc('recruiter'),
          then: yup.string().required(tv('required-field')),
        }),
        start_date: yup
          .date()
          .nullable()
          .transform((curr, orig) => (orig === '' ? null : curr))
          .when('contract_type', {
            is: tc('recruiter'),
            then: yup
              .date()
              .typeError(tv('invalid-date'))
              .max(moment(new Date()).format('YYYY-MM-DD'), tv('date-max')),
          }),
      }),
    [tv]
  );

  const resolver = useYupValidationResolver(validationSchema);
  const defaultValues = {
    contract_type: tc('talent'),
    position: tc('recruiter'),
  };
  const methods = useForm<FormData>({
    mode: 'onChange',
    resolver,
    defaultValues: defaultValues,
  });
  const {
    reset,
    formState: { isSubmitting },
    watch,
  } = methods;

  useEffect(() => {
    const registerByGoogle = localStorage.getItem('registerByGoogle');
    if (registerByGoogle) {
      const user = JSON.parse(registerByGoogle);
      reset(user);
    }
  }, [reset]);
  const watchRol = watch('contract_type');
  /* TODO: Functions */
  const handleSelectionWorkplace = (workplace: string) => {
    methods.setValue('workplace_name', workplace);
  };
  const onSubmit = async ({
    emailRegister,
    name,
    last_name,
    phone,
    password,
    algorand_address,
    google_id,
    profile_picture_url,
    contract_type,
    workplace_name,
    position,
    start_date,
  }: FormData) => {
    const is_talent = contract_type === tc('talent') ? true : false;

    const email = emailRegister;
    start_date = moment(start_date).format('YYYY-MM-DD');
    const { hasError, message } = await registerUser(
      email,
      name,
      last_name,
      phone,
      password,
      algorand_address,
      is_talent,
      workplace_name,
      position,
      start_date,
      google_id,
      profile_picture_url
    );

    if (hasError) {
      toastMessage('error', message);
      return;
    }
    toastMessage('success', message);
    router.replace(`/auth/otp-verification?email=${email}`);
  };

  return (
    <LayoutAuth className="create-account" title="Create Account">
      <h1 className="text-40 title">
        <strong className="black">{t('create-account')}</strong>
      </h1>

      <p className="description">{t('create-account-message')}</p>

      <FormProvider {...methods}>
        <form
          className="form"
          onSubmit={methods.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <CSelectDefault
            name="contract_type"
            label={tc('Rol')}
            options={[
              {
                id: tc('talent'),
                name: tc('talent'),
              },
              {
                id: tc('recruiter'),
                name: tc('recruiter'),
              },
            ]}
            valueName={'name'}
          />
          {watchRol === tc('recruiter') && (
            <>
              <CSearch
                name="workplace_name"
                label={tp('company')}
                placeholder={tc('write-here')}
                handleSelection={handleSelectionWorkplace}
              />
              <CInput
                name="position"
                label={tp('position')}
                placeholder={tc('write-here')}
              />
              {/* <CInputWithIcon
                name="start_date"
                label={tp('initial-date')}
                imageUrl={'/images/icons/calendar.svg'}
                classNameDivIcon="input-icon icon-right"
                type="date"
                min="1000-01-01"
                max="2999-09-21"
              /> */}
            </>
          )}
          <CInput
            name="emailRegister"
            label={t('email')}
            placeholder={tc('write-here')}
            autoComplete="off"
          />

          {/* <CInput
            name="algorand_address"
            label={t('algorand')}
            placeholder={tc('write-here')}
          /> */}

          <CInput
            name="name"
            label={t('name')}
            placeholder={tc('write-here')}
          />

          <CInput
            name="last_name"
            label={t('lastname')}
            placeholder={tc('write-here')}
          />
          <CInput
            name="phone"
            label={t('cellphone')}
            type="number"
            placeholder={tc('placeholder-phone')}
          />
          <CInput
            type="password"
            name="password"
            label={t('password')}
            placeholder={tc('write-here')}
            autoComplete="new-password"
          />

          <CCheckbox name="checkboxTerms" label={t('terms')} value={1} />
          <p className="message-wallet">{t('sign-in-description2')}</p>

          <CButton
            label={t('register')}
            loading={isSubmitting}
            classNameButton="btn btn--primary btn--full"
            type="submit"
          />
        </form>
      </FormProvider>
    </LayoutAuth>
  );
};

// @ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ['common', 'auth', 'validation', 'profile'],
      i18nConfig
    )),
  },
});

export default CreateAccount;
