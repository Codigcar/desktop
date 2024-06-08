import { CSSProperties, useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import i18nConfig from '../constants/i18n';
import Layout from '@layouts/Layout';
import { AccordionBennefits } from '@components';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { DISCORD_URL, MAIL_TO } from '../constants/links';
import { AuthContext, initializeStore } from '@contexts/auth/index';
import { BenefitsEn, BenefitsEs } from '@constants/qa';

const indicatorStyles: CSSProperties = {
  background: '#7F8D98',
  width: 12,
  height: 12,
  display: 'inline-block',
  margin: '0 8px',
  opacity: 0.32,
  borderRadius: '32px',
};

const Home: NextPage = () => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation('common');
  const [, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;
  return (
    <Layout id="home" title="Darshana">
      <section id="hero">
        <div className="container">
          <div className="content">
            <h1 className="text-48 title">
              <b className="black">{t('landing-hero')}</b>
            </h1>
            <p className="content__description">{t('bennefits-subtitle')}</p>
            <div className="content__links">
              {user ? (
                <Link href="/profile/my-profile">
                  <a className="btn btn--primary">{t('my-dashboard')}</a>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login">
                    <a className="btn btn--primary">{t('i-recruiter')}</a>
                  </Link>

                  <Link href="/auth/login">
                    <a className="btn btn--stroke">{t('i-talent')}</a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>


      <section id="opportunities">
        <div className="container">
          <div className="row flex-x-center">
            <div className="col-xs-12 col-md-5 bennefits__container">
              <p className="bennefits__title">
                {t('beneffits-title-1')} <br />
                <span className="bennefits__green">
                  {t('beneffits-title-2')}
                </span>
              </p>
              <div className="divider" style={{marginBottom:-10, marginTop:15}} />
              <AccordionBennefits
                data={lang === 'en' ? BenefitsEn : BenefitsEs}
              />
            </div>
            <div className="col-xs-10 col-md-5 bennefits__img__container">
              <Image
                src="/images/bennefits.webp"
                alt="benefits"
                layout="fill"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="row flex-x-center" style={{ marginBottom: '80px' }}>
        <div
          className="col-xs-10 col-md-6 bennefits__img__container"
          style={{ maxWidth: '700px' }}
        >
          <Image src="/images/bennefits.webp" alt="benefits" layout="fill" />
        </div>

        <div
          style={{ marginTop: '80px', maxWidth: '800px' }}
          className="col-sm-8 col-md-4"
        >
          <p className="col-xs-11 bennefits__title text-center bennefits__verify">
            {t('verify-information-1')}{' '}
            <span className="bennefits__green">
              {t('verify-information-2')}{' '}
            </span>
            {t('verify-information-3')}
          </p>
          <p className="col-sm-11 bennefits__description">
            {t('verify-description')}
          </p>
        </div>
      </div>

      <div className="row flex-x-center" style={{ marginBottom: '72px' }}>
        <p className="col-sm-8 bennefits__title text-center bennefits__verify">
          {t('how-see-exp')}{' '}
          <span className="bennefits__green">{t('how-see-exp2')} </span>
        </p>
        <p className="col-sm-8 bennefits__description">
          {t('how-see-content')}
        </p>

        <p className="col-sm-8 bennefits__description">
          {t('how-see-content-1')}
        </p>
      </div>
      <div>
        <Carousel
          // infiniteLoop
          swipeable={true}
          useKeyboardArrows
          swipeScrollTolerance={20}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          emulateTouch={true}
          // centerMode
          // autoPlay
          className={`${'carousel-slider-steps'}`}
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            if (isSelected) {
              return (
                <li
                  style={{
                    ...indicatorStyles,
                    background: '#19A79B',
                    width: 24,
                    opacity: 1,
                  }}
                  aria-label={`Selected: ${label} ${index + 1}`}
                  title={`Selected: ${label} ${index + 1}`}
                />
              );
            }
            return (
              <li
                style={indicatorStyles}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                title={`${label} ${index + 1}`}
                aria-label={`${label} ${index + 1}`}
              />
            );
          }}
        >
          <div className="steps">
            <Image
              src="/images/steps1.webp"
              width={528}
              height={296}
              alt="step 1"
            />
            <div className="steps__content">
              <p className="steps__content__number">
                {t('steps-number', { number: 1 })}
              </p>
              <p className="steps__content__title bennefits__green">
                {t('step-title-1')}{' '}
                <span className="bennefits__dark">
                  {' '}
                  {t('step-title-1-desc')}
                </span>
              </p>
              <p className="steps__content__description">{t('step-1-body')}</p>
            </div>
          </div>
          <div className="steps">
            <Image
              src="/images/steps2.webp"
              width={528}
              height={296}
              alt="step 2"
            />
            <div className="steps__content">
              <p className="steps__content__number">
                {t('steps-number', { number: 2 })}
              </p>
              <p className="steps__content__title bennefits__green">
                {t('step-title-2')}{' '}
                <span className="bennefits__dark">
                  {' '}
                  {t('step-title-2-desc')}
                </span>
              </p>

              <p className="steps__content__description">{t('step-2-body')}</p>
            </div>
          </div>
          <div className="steps">
            <Image
              src="/images/steps3.webp"
              width={528}
              height={296}
              alt="step 1"
            />
            <div className="steps__content">
              <p className="steps__content__number">
                {t('steps-number', { number: 3 })}
              </p>
              <p className="steps__content__title bennefits__green">
                {t('step-title-3')}{' '}
                <span className="bennefits__dark">
                  {' '}
                  {t('step-title-3-desc')}
                </span>
              </p>

              <p className="steps__content__description">{t('step-3-body')}</p>
            </div>
          </div>
        </Carousel>
      </div>
      <section id="banner-talent-search">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Image
                src="/images/search-bg.png"
                alt=""
                width={640}
                height={360}
                layout="responsive"
              />
            </div>

            <div className="col-md-6 col-information">
              <div className="content">
                <h2 className="text-40 title">
                  <strong>{t('need-talent')}</strong>
                </h2>

                <Link href="/opportunities?find=talents">
                  <a className="btn btn--primary">{t('find-talent')}</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="resolve-doubts">
        <div className="container">
          <div className="box">
            <h3 className="text-24 text">
              {t('to-reply-1')}
              <b className="c-brand-1 bennefits__green">{t('to-reply-2')}</b>
              {t('to-reply-3')}
            </h3>

            <div className="buttons buttons__container">
              <a
                className="btn btn--stroke"
                href={MAIL_TO}
                style={{ display: 'flex', gap: '2px' }}
              >
                <Image
                  src="/images/icons/mail.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                hi@darshana.io
              </a>

              <a
                className="btn btn--stroke"
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', gap: '2px' }}
              >
                <Image
                  src="/images/icons/discord-dark.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                Discord
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// @ts-ignore
export const getStaticProps = async ({ locale }) => {
  const store = initializeStore({
    locale,
  });

  // store.dispatch(serverRenderClock())
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'notifications', 'auth'],
        i18nConfig,
      )),
    },
  };
};

export default Home;
