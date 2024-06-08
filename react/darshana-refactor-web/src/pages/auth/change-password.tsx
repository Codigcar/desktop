import { useContext, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import i18nConfig from '../../constants/i18n';
import LayoutAuth from '@layouts/LayoutAuth';
import { CInput } from '@components/Atoms';
import { AuthContext } from '@contexts/auth';
import { useYupValidationResolver, toastMessage } from '@utils/index';

type FormData = {
  password: string;
  password_confirmation: string;
  code: string;
};

const ChangePassword: NextPage = () => {
  const { t } = useTranslation('auth');
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const router = useRouter();
  const { code } = router.query;

  const { recoverByCodeAndPassword } = useContext(AuthContext);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        password: yup
          .string()
          .required(tv('required-field'))
          .min(6, tv('password-min-length')),
        repeat_password: yup
          .string()
          .required(tv('required-field'))
          .min(6, tv('password-min-length'))
          .oneOf([yup.ref('password')], tv('password-repeat-error')),
      }),
    [tv]
  );

  const resolver = useYupValidationResolver(validationSchema);

  const methods = useForm<FormData>({
    mode: 'onChange',
    resolver: resolver,
  });

  const onSubmit = async ({ password }: FormData) => {
    const { hasError, message } = await recoverByCodeAndPassword(
      code?.toString()!,
      password
    );

    if (hasError) {
      toastMessage('error', message);
      return;
    }
    toastMessage('success', message);
    router.replace('/auth/login');
    return;
  };

  return (
    <LayoutAuth
      className="change-password"
      background="forgot-password-bg"
      backgroundMobile="forgot-password-bg-mobile"
      title="Change password"
    >
      <h1 className="text-40 title">
        <strong className="black">{t('change-password')}</strong>
      </h1>

      <p className="description">{t('change-password-message')}</p>

      <FormProvider {...methods}>
        <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <CInput
            classNameLabel="form-label"
            classNameInput="form-control"
            name="password"
            label={t('new-password')}
            type="password"
            placeholder={tc('write-here')}
          />
          <CInput
            classNameLabel="form-label"
            classNameInput="form-control"
            name="repeat_password"
            label={t('repeat-password')}
            type="password"
            placeholder={tc('write-here')}
          />
          <button className="btn btn--primary btn--full">
            {tc('login-button')}
          </button>
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
      ['common', 'auth', 'validation', 'notifications'],
      i18nConfig
    )),
  },
});

export default ChangePassword;
