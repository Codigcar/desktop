import { useContext, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import * as yup from 'yup';
// import { useGoogleAuth } from 'react-gapi-auth2';

import { CButton, CCheckbox, CInput } from '@components/Atoms';
import { AuthContext } from '@contexts/auth';
import LayoutAuth from '@layouts/LayoutAuth';
import i18nConfig from '../../constants/i18n';
import { toastMessage, useYupValidationResolver } from '@utils';
import GoogleLogin from 'react-google-login';

type FormData = {
  email: string;
  password: string;
  checkboxKeepSession: boolean;
};

type ExtraQueryParams = {
  authuser: string;
};

type FormDataGoogle = {
  profileObj: {
    email: string;
    familyName: string;
    givenName: string;
    googleId: string;
    imageUrl: string;
    name: string;
  };
};

const Login: NextPage = () => {
  const { t } = useTranslation('auth');
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');

  const { loginUser, loginGoogle } = useContext(AuthContext);
  const router = useRouter();
  const { board, type } = router.query;
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email(tv('invalid-email'))
          .required(tv('required-field')),
        password: yup.string().required(tv('required-field')),
      }),
    [tv],
  );

  const resolver = useYupValidationResolver(validationSchema);

  const methods = useForm<FormData>({
    mode: 'onChange',
    resolver,
  });
  const { isSubmitting } = methods.formState;

  /* TODO: Functions */

  const onSubmit = async ({
    email,
    password,
    checkboxKeepSession,
  }: FormData) => {
    const { hasError, message, data } = await loginUser(
      email,
      password,
      checkboxKeepSession,
    );

    if (hasError) {
      toastMessage('error', message);
      return;
    }

    toastMessage('success', message);

    if (router.query?.projectId) {
      router.replace(`/talent/project/${router.query?.projectId}`);
    } else if (router.query?.jobId) {
      router.replace(`/talent/job/${router.query?.jobId}`);
    } else {
      const isRecruiter = data?.workplaces.find(
        (workplace) => workplace.enable_business,
      );
      if (board) {
        return router.replace(`/${board}`);
      }
      if (type === 'chat') {
        return router.replace('/chat');
      }
      if (isRecruiter) {
        return router.replace('/profile/my-profile');
      }
      if (data?.is_talent) {
        return router.replace('/profile/my-profile');
      } else {
        return router.replace('/profile/my-profile');
      }
    }
  };

  const onSuccessGoogle = async (response: any) => {
    const { profileObj }: FormDataGoogle = response;

    const { hasError, message, data } = await loginGoogle(
      profileObj.email,
      profileObj.givenName,
      profileObj.familyName,
      response.tokenId,
      profileObj.imageUrl,
    );

    if (hasError) {
      toastMessage('error', message);
      return;
    }

    // if(data){
    //   if (data?.is_talent) {
    //     router.replace('/talent/dashboard');
    //   } else {
    //     router.replace('/recruiter/dashboard');
    //   }
    // }

    toastMessage('success', message);
  };

  const onFailureGoogle = (response: any) => {
    console.error({ response });
  };

  return (
    <LayoutAuth className="login" title="Login">
      <p className="text-center">
        {t('register-here-1')}{' '}
        <Link href="/auth/create-account">
          <a>
            <strong>{t('register-here-2')}</strong>
          </a>
        </Link>
      </p>
      <h1 className="text-40 title">
        <strong className="black">{t('sign-in')}</strong>
      </h1>

      <p className="description">{t('sign-in-description')}</p>
      <p className="description message-wallet">{t('sign-in-description2')}</p>

      <FormProvider {...methods}>
        <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <CInput
            classNameLabel="form-label"
            classNameInput="form-control"
            name="email"
            label={t('sign-in-email')}
            placeholder={tc('write-here')}
          />
          <CInput
            classNameLabel="form-label"
            classNameInput="form-control"
            type="password"
            name="password"
            label={t('password')}
            placeholder={tc('write-here')}
          />
          <CCheckbox
            name="checkboxKeepSession"
            label={t('keep-session')}
            value={false}
          />

          <div className="forgot">
            <Link href="/auth/forgot-password">
              <a className="text-14">
                <b>{t('forgot-password')}</b>
              </a>
            </Link>
          </div>

          <CButton
            label={tc('login-button')}
            loading={isSubmitting}
            classNameButton="btn btn--primary btn--full"
            type="submit"
          />

          <div className="continue-with">
            <p className="text-with">
              <span>{t('continue')}</span>
            </p>
            <GoogleLogin
              clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
              render={(renderProps) => (
                <button
                  className="btn btn--stroke btn--full d-20"
                  onClick={renderProps.onClick}
                  style={{ marginTop: 20, marginBottom: 20 }}
                >
                  <Image
                    className="icon"
                    src="/images/icons/google.svg"
                    alt={t('google')}
                    width={16}
                    height={16}
                  />
                  {tc('google')}
                </button>
              )}
              onSuccess={onSuccessGoogle}
              onFailure={onFailureGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
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
      i18nConfig,
    )),
  },
});

export default Login;
