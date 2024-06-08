import { useContext, useMemo } from 'react';

import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';

import LayoutAuth from '@layouts/LayoutAuth';
import { CInput } from '@components/Atoms';
import { AuthContext } from '@contexts/auth';
import { useYupValidationResolver, toastMessage } from '@utils/index';
import i18nConfig from '../../constants/i18n';

type FormData = {
  email: string;
};

const ForgotPassword: NextPage = () => {
  const { t } = useTranslation('auth');
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');

  const { recoveryEmail } = useContext(AuthContext);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email(tv('invalid-email'))
          .required(tv('required-field')),
      }),
    [tv]
  );

  const resolver = useYupValidationResolver(validationSchema);

  const methods = useForm<FormData>({
    mode: 'onChange',
    resolver: resolver,
  });

  /* TODO: Functions */

  const onSubmit = async ({ email }: FormData) => {
    const { hasError, message } = await recoveryEmail(email);
    if (hasError) {
      toastMessage('error', message);
      return;
    }
    toastMessage('success', message);
  };

  return (
    <LayoutAuth
      className="forgot-password"
      background="forgot-password-bg"
      backgroundMobile="forgot-password-bg-mobile"
      title="Forgot Password"
    >
      <h1 className="text-40 title">
        <strong className="black">{t('forgot-password-title')}</strong>
      </h1>

      <p className="description">{t('forgot-password-subtitle')}</p>

      <FormProvider {...methods}>
        <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <CInput
            classNameLabel="form-label"
            classNameInput="form-control"
            name="email"
            label={t('email')}
            placeholder={tc('write-here')}
          />

          <button className="btn btn--primary btn--full">{t('send')}</button>
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
      ['common', 'auth', 'validation'],
      i18nConfig
    )),
  },
});

export default ForgotPassword;
