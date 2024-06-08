import LayoutAuth from '@layouts/LayoutAuth';
import React, { useEffect, useRef, useState } from 'react';

import { NextPage } from 'next';

import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import OtpInput from '@components/Atoms/Otp/otp';

import i18nConfig from '../../constants/i18n';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { darshanaApiNoToken } from '@api/darshanaApiNoToken';
import LayoutOtp from '@layouts/LayoutOtp';
import Link from 'next/link';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';
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

const OtpVerification: NextPage = () => {
  const router = useRouter();
  const { email } = router.query;
  const [, i18nConfig] = useTranslation();
  const { t } = useTranslation('auth');
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const [otp, setOtp] = useState('');
  const [isDisabled, setisDisabled] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const lang = i18nConfig.language;

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const onChange = (value: string) => {
    setIsError(false);
    setOtp(value);
  };
  const handlerVerification = async () => {
    try {
      setIsLoading(true);
      const response = await darshanaApiNoToken.post('/auth/otp/verify', {
        email,
        code: otp,
      });
      if (response.data.status) {
        setIsValidate(true);
        setIsLoading(false);
      }
    } catch (error: any) {
      if (!error.response.data.status) setIsError(true);
      setIsLoading(false);
    }
  };
  const handleSendCode = async () => {
    try {
      await darshanaApiNoToken.post('/auth/otp', {
        email,
        lang,
      });
    } catch (error) {
      throw error;
    }
  };

  /* TODO: Functions */
  useEffect(() => {
    if (Number(otp) === 0) {
      setisDisabled(true);
    } else {
      setisDisabled(false);
    }
  }, [otp]);

  return (
    <LayoutOtp className="otp" title="otp" background="bg-otp" isBack={false}>
      {!isValidate ? (
        <div className="container">
          <h1 className="text-40 title">
            <strong className="black">{tc('account-verification')}</strong>
          </h1>
          <p className="message-account">
            {tc('account-email')} <span className="email"> {email}</span>
          </p>
          <div onClick={() => setisDisabled(false)} className="otp-container">
            <OtpInput
              value={otp}
              valueLength={6}
              onChange={onChange}
              isError={isError}
              isDisabled={isDisabled}
            />
            {isError && (
              <p className="error">
                <Image
                  src="/images/icons/Alert.svg"
                  width={20}
                  height={20}
                  alt="alert icon"
                />
                {tc('code-incorrect')}
              </p>
            )}
          </div>
          <p className="send-email" onClick={handleSendCode}>
            {tc('resend-email')}
          </p>
          <button
            className={`btn btn--primary ${isDisabled ? 'disable' : ''} ${
              isError ? 'disable' : ''
            }`}
            disabled={isDisabled || isLoading}
            onClick={handlerVerification}
          >
            {isLoading ? (
              <BeatLoader
                color={'#f1f0eb'}
                loading={true}
                css={override}
                size={15}
              />
            ) : (
              tc('check')
            )}
          </button>
        </div>
      ) : (
        <div className="verification-container">
          <Image
            src="/images/icons/check_state_verification.svg"
            width={120}
            height={120}
            alt="check icon"
          />
          <h1 className="title">{tc('verification-successful')}</h1>
          <p className="body">{tc('message-successful')}</p>

          <button
            className="btn btn--primary"
            onClick={() => router.replace('/auth/login')}
          >
            {tc('back-to-homepage')}
          </button>
        </div>
      )}
    </LayoutOtp>
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

export default OtpVerification;
