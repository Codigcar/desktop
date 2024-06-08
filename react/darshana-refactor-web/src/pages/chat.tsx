import { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../constants/i18n';
import React, { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { toastMessage } from '@utils';
import { FormProvider, useForm } from 'react-hook-form';
import { CInput } from '@components/Atoms';
import { AuthContext } from '@contexts/auth';
import LayoutCore from '@layouts/LayoutCore';
import Head from 'next/head';
import Link from 'next/link';
import { darshanaApi } from '../api/darshanaApi';
import { SyncLoader } from 'react-spinners';
import Image from 'next/image';

type FormData = {
  prompt: string;
};

const Chat: NextPage = () => {
  // const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const { isLoggedIn, user } = useContext(AuthContext);
  const { t } = useTranslation('common');
  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    // e.preventDefault();
    try {
      // setAnswer(responseData.text.trim());
      const response = await darshanaApi.post('/chat_gpt', {
        user_uuid: user?.user_uuid,
        prompt: data?.prompt,
      });

      setAnswer(response.data.data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <LayoutCore id="chatGPT" title="DarshanaGPT+">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              // alignItems: 'center',
            }}
          >
            <div className="container-chat">
              <img src="/images/dar.png" />
              <h3 className="text-24 ">DarshanaGPT+</h3>
              <h3 className="text-24">{t('ask-darshana')} </h3>
              <form className="our-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="prompt-field"
                  type="text"
                  {...register('prompt', {
                    required: 'Please enter your question.',
                  })}
                />
                <button className="prompt-button" type="submit">
                  {formState.isSubmitting ? (
                    <SyncLoader color="#FFFFFF" size={4} />
                  ) : (
                    'Go!'
                  )}
                </button>
              </form>
              <p className={"flex flex-y-center"}>
                <Image
                  src="/images/icons/Alertdark.svg"
                  width={16}
                  height={16}

                />
                <span className='ml-2'>{t('learning-chat')}</span>
                <a href="https://www.darshana.io/how-to-use" target={"_blank"} rel="noopener noreferrer" className="ml-2 chat-link">{t("learning-chat-link")}</a>
              </p>
              <div className="answer-area">{answer}</div>
            </div>
          </div>
        </LayoutCore>
      ) : (
        <main id="chatGPT">
          <Head>
            <title>DarshanaGPT+</title>
          </Head>
          <div className="container">
            <p className="text-32">{t('alert-login')} </p>
            <Link href={`/auth/login?type=chat`}>
              <a className="btn btn--primary">{t('login')} </a>
            </Link>
          </div>
        </main>
      )}
    </>
  );
};

// @ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ['common', 'profile', 'validation', 'notifications'],
      i18nConfig
    )),
  },
});

export default Chat;
