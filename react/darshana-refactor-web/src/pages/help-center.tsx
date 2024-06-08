import { NextPage } from 'next';

import Layout from '@layouts/Layout';
import { DISCORD_URL } from '../constants/links';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../constants/i18n';
import React, { useContext, useMemo, useState } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import { toastMessage, useYupValidationResolver } from '@utils';
import { FormProvider, useForm } from 'react-hook-form';
import usePostData from '@hooks/usePostData';
import { CInput } from '@components/Atoms';
import { CTextArea } from '@components/Atoms/CTextArea/CTextArea';
import { AuthContext } from '@contexts/auth';
import LayoutCore from '@layouts/LayoutCore';
import { Accordion } from '@components';
import { qaReponse, qaResponseEn } from '../constants/qa';

type FormData = {
  title: string;
  email: string;
  query_type: string;
  description: string;
};

const HelpCenter: NextPage = () => {
  const { t, i18n } = useTranslation('profile');
  const lang = i18n.language;
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const { t: tauth } = useTranslation('auth');
  const { executePost } = usePostData();
  const [step, setStep] = useState('step1');
  const { isLoggedIn } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('help');
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email(tv('invalid-email'))
          .required(tv('required-field')),
        title: yup.string().required(tv('required-field')),
        description: yup.string().required(tv('required-field')),
      }),
    [tv],
  );

  const resolver = useYupValidationResolver(validationSchema);

  const methods = useForm<FormData>({
    mode: 'onChange',
    resolver,
  });

  const onSubmit = async ({
    title,
    email,
    query_type,
    description,
  }: FormData) => {
    const { hasError, message } = await executePost('/leads', {
      title,
      email,
      query_type,
      description,
    });
    if (hasError) {
      toastMessage('error', message);
      return;
    }
    toastMessage('success', message);
    setStep('step2');
    await methods.reset();
  };

  return (
    <>
      {isLoggedIn ? (
        <LayoutCore id="help-center" title="Help Center">
          <section id="hero">
            <h1 className="text-40">
              <b>{tc('help-center')}</b>
            </h1>
          </section>

          <section id="content">
            <div className="flex-x-center" style={{ marginBottom: '32px' }}>
              <div className="buttons-tabs">
                <button
                  className={`btn ${activeTab === 'q&a' ? 'active' : ''}`}
                  onClick={() => setActiveTab('q&a')}
                >
                  {tc('Q&A')}
                </button>
                <button
                  className={`btn ${activeTab === 'help' ? 'active' : ''}`}
                  onClick={() => setActiveTab('help')}
                >
                  {tc('contact-us')}
                </button>
              </div>
            </div>
            <div className="container">
              <div className="row">
                {activeTab === 'q&a' && (
                  <div className="col-md-8 mx-auto">
                    <Accordion
                      data={lang === 'en' ? qaResponseEn : qaReponse}
                    />
                  </div>
                )}
                {activeTab === 'help' && (
                  <div className="col-md-8 mx-auto">
                    <h2
                      className="text-center text-40"
                      style={{ marginBottom: 30 }}
                    >
                      <b className="black">{tc('help-title')}</b>
                    </h2>

                    <FormProvider {...methods}>
                      <form
                        className="form"
                        onSubmit={methods.handleSubmit(onSubmit)}
                      >
                        <div
                          className="form-content"
                          style={{
                            display: step === 'step1' ? 'block' : 'none',
                          }}
                        >
                          <div className="row">
                            <CInput
                              classNameDiv="col-md-6 form-group"
                              name="title"
                              label={t('name')}
                              placeholder={tc('write-here')}
                            />
                            <CInput
                              classNameDiv="col-md-6 form-group"
                              name="email"
                              label={t('email')}
                              placeholder={tc('write-here')}
                            />
                          </div>

                          <div className="row">
                            <CInput
                              classNameDiv="col-md-6 form-group"
                              name="query_type"
                              label={t('subject')}
                              placeholder={tc('write-here')}
                            />
                          </div>
                          <CTextArea
                            classNameDiv="form-group"
                            name="description"
                            label={t('message')}
                            placeholder={tc('write-here')}
                          />

                          <div className="button-center">
                            <button className="btn btn--primary" type="submit">
                              {tauth('send')}
                            </button>
                          </div>
                        </div>

                        <div
                          className="form-success"
                          style={{
                            display: step === 'step2' ? 'block' : 'none',
                          }}
                        >
                          <h3 className=" text-24 text-center c-brand-1">
                            <b>{tc('help-message-1')},</b>
                          </h3>

                          <div className="text-24 text-center form-success--description">
                            {tc('help-message-2')}
                          </div>

                          <div className="button-center">
                            <button
                              className="btn btn--primary"
                              type="button"
                              onClick={() => setStep('step1')}
                            >
                              {tc('write-again')}
                            </button>
                          </div>
                        </div>
                      </form>
                    </FormProvider>
                    <h3 className="text-center note">
                      <b>{tc('help-message-3')}</b>
                    </h3>

                    <div className="button-center">
                      <a
                        className="btn btn--stroke"
                        href={DISCORD_URL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {tc('discord-channel')}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </LayoutCore>
      ) : (
        <Layout id="help-center" headerType="secondary" title="Help Center">
          <section id="hero">
            <h1 className="text-40">
              <b>{tc('help-center')}</b>
            </h1>
          </section>

          <section id="content">
            <div className="flex-x-center" style={{ marginBottom: '32px' }}>
              <div className="buttons-tabs">
                <button
                  className={`btn ${activeTab === 'q&a' ? 'active' : ''}`}
                  onClick={() => setActiveTab('q&a')}
                >
                  {tc('Q&A')}
                </button>
                <button
                  className={`btn ${activeTab === 'help' ? 'active' : ''}`}
                  onClick={() => setActiveTab('help')}
                >
                  {tc('contact-us')}
                </button>
              </div>
            </div>
            <div className="container">
              <div className="row">
                {activeTab === 'q&a' && (
                  <div className="col-md-8 mx-auto">
                    <Accordion
                      data={lang === 'en' ? qaResponseEn : qaReponse}
                    />
                  </div>
                )}
                {activeTab === 'help' && (
                  <div className="col-md-8 mx-auto">
                    <h2
                      className="text-center text-40"
                      style={{ marginBottom: 30 }}
                    >
                      <b className="black">{tc('help-title')}</b>
                    </h2>

                    {/* <p className="text-center description">
                      Nulla ullamcorper mattis augue, at finibus mi. Maecenas at
                      diam metus.
                    </p> */}

                    <FormProvider {...methods}>
                      <form
                        className="form"
                        onSubmit={methods.handleSubmit(onSubmit)}
                      >
                        <div
                          className="form-content"
                          style={{
                            display: step === 'step1' ? 'block' : 'none',
                          }}
                        >
                          <div className="row">
                            <CInput
                              classNameDiv="col-md-6 form-group"
                              name="title"
                              label={t('name')}
                              placeholder={tc('write-here')}
                            />
                            <CInput
                              classNameDiv="col-md-6 form-group"
                              name="email"
                              label={t('email')}
                              placeholder={tc('write-here')}
                            />
                          </div>

                          <div className="row">
                            <CInput
                              classNameDiv="col-md-6 form-group"
                              name="query_type"
                              label={t('subject')}
                              placeholder={tc('write-here')}
                            />
                          </div>
                          <CTextArea
                            classNameDiv="form-group"
                            name="description"
                            label={t('message')}
                            placeholder={tc('write-here')}
                          />

                          <div className="button-center">
                            <button className="btn btn--primary" type="submit">
                              {tauth('send')}
                            </button>
                          </div>
                        </div>

                        <div
                          className="form-success"
                          style={{
                            display: step === 'step2' ? 'block' : 'none',
                          }}
                        >
                          <h3 className=" text-24 text-center c-brand-1">
                            <b>{tc('help-message-1')},</b>
                          </h3>

                          <div className="text-24 text-center form-success--description">
                            {tc('help-message-2')}
                          </div>

                          <div className="button-center">
                            <button
                              className="btn btn--primary"
                              type="button"
                              onClick={() => setStep('step1')}
                            >
                              {tc('write-again')}
                            </button>
                          </div>
                        </div>
                      </form>
                    </FormProvider>
                    <h3 className="text-center note">
                      <b>{tc('help-message-3')}</b>
                    </h3>

                    <div className="button-center">
                      <a
                        className="btn btn--stroke"
                        href={DISCORD_URL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {tc('discord-channel')}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </Layout>
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
      i18nConfig,
    )),
  },
});

export default HelpCenter;
