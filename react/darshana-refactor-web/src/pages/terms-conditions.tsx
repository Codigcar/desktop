import { NextPage } from 'next';

import Layout from '@layouts/Layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../constants/i18n';
import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';

import { AuthContext } from '@contexts/auth';
import LayoutCore from '@layouts/LayoutCore';
import styles from '../styles/pages/_termsConditions.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const TermsConditions: NextPage = () => {
  const { t: tc } = useTranslation('common');
  const { t: tr } = useTranslation('terms');
  const { isLoggedIn } = useContext(AuthContext);
  const handleFindTalents = () => {
    localStorage.setItem('select_opportunities', 'talents');
  };
  return (
    <>
      {isLoggedIn ? (
        <LayoutCore id="help-center" title="Help Center">
          <section id="hero">
            <h1 className="text-40">
              <b>{tc('terms-and-conditions')}</b>
            </h1>
          </section>

          <section id="content">
            <div className="container">
              <div className="row">
                <div className="col-md-8 mx-auto">
                  <h2 className={styles.subtitle}>
                    {tr('title-introduction')}
                  </h2>
                  <p className={styles.paragraph}>{tr('first-paragraph')}</p>
                  <p className={styles.paragraph}>{tr('agreement')}</p>
                  <p className={styles.paragraph}>{tr('second-paragraph')}</p>
                  <p className={styles.paragraph}>{tr('third-paragraph')}</p>
                  <p className={styles.paragraph}>{tr('understand')}</p>
                  <ol type="a" className={styles.list}>
                    <li>{tr('agreement-a')}</li>
                    <li>{tr('agreement-b')}</li>
                    <li>{tr('agreement-c')}</li>
                    <li>{tr('agreement-d')}</li>
                    <li>{tr('agreement-e')}</li>
                    <li>{tr('agreement-f')}</li>
                    <li>
                      {tr('agreement-g')}
                      <ol type="i" className={styles.list2}>
                        <li>{tr('agreement-g-1')}</li>
                        <li>{tr('agreement-g-2')}</li>
                        <li>{tr('agreement-g-3')}</li>
                        <li>{tr('agreement-g-4')}</li>
                      </ol>
                    </li>
                    <p>{tr('agreement-g-paragraph')}</p>
                    <li>{tr('agreement-h')}</li>
                    <li>{tr('agreement-i')}</li>
                  </ol>
                  <h3 className={styles.subtitle}>{tr('privacy')}</h3>
                  <p className={styles.paragraph}>{tr('privacy-paragraph')}</p>
                  <p className={styles.paragraph}>{tr('privacy-paragraph2')}</p>
                  <ol type="i" className={styles.list2}>
                    <li>{tr('privacy-1')}</li>
                    <li>{tr('privacy-2')}</li>
                    <li>{tr('privacy-3')}</li>
                    <li>{tr('privacy-4')}</li>
                    <p>{tr('Furthermore')}</p>
                    <li>{tr('privacy-5')}</li>
                    <li>{tr('privacy-6')}</li>
                  </ol>
                  <h3 className={styles.subtitle}>{tr('limitation')}</h3>
                  <p className={styles.paragraph}>
                    {tr('limitation-paragraph')}
                  </p>
                  <p className={styles.paragraph}>
                    {tr('limitation-paragraph2')}
                  </p>
                  <h3>{tr('termination-of-Use')}</h3>
                  <p className={styles.paragraph}>{tr('termination')}</p>
                  <h3 className={styles.subtitle}>{tr('governing')}</h3>
                  <p className={styles.paragraph}>
                    {tr('governing-paragraph')}
                  </p>
                  <p className={styles.paragraph}>
                    {tr('governing-paragraph2')}
                  </p>
                  <p className={styles.paragraph}>
                    {tr('governing-paragraph3')}
                  </p>
                  <h3 className={styles.subtitle}>{tr('contact')}</h3>
                  <p className={styles.paragraph}>
                    {tr('contact-information')}
                  </p>
                  <p className={styles.paragraph}>{tr('contact-email')}</p>
                  <p className={styles.paragraph}>{tr('contact-address')}</p>
                </div>
              </div>
              <div className="row flex-x-center">
                <section id="banner-talent-search">
                  <div className="container">
                    <div className="row flex-y-center">
                      <div className="col-md-6">
                        <Image
                          src="/images/search-bg.png"
                          alt=""
                          width={640}
                          height={360}
                          layout="responsive"
                        />
                      </div>

                      <div className={`col-md-6 ${styles.information}`}>
                        <div className={`${styles.content}`}>
                          <h2 className="text-40 title">
                            <strong>{tc('need-talent')}</strong>
                          </h2>

                          <Link href="/opportunities">
                            <a
                              className="btn btn--primary"
                              onClick={handleFindTalents}
                            >
                              {tc('find-talent')}
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </LayoutCore>
      ) : (
        <Layout id="help-center" headerType="secondary" title="Help Center">
          <section id="hero">
            <h1 className="text-40">
              <b>{tc('terms-and-conditions')}</b>
            </h1>
          </section>

          <section id="content">
            <div className="container">
              <div className="row">
                <div className="col-md-8 mx-auto">
                  <h2 className={styles.subtitle}>
                    {tr('title-introduction')}
                  </h2>
                  <p className={styles.paragraph}>{tr('first-paragraph')}</p>
                  <p className={styles.paragraph}>{tr('agreement')}</p>
                  <p className={styles.paragraph}>{tr('second-paragraph')}</p>
                  <p className={styles.paragraph}>{tr('third-paragraph')}</p>
                  <p className={styles.paragraph}>{tr('understand')}</p>
                  <ol type="a" className={styles.list}>
                    <li>{tr('agreement-a')}</li>
                    <li>{tr('agreement-b')}</li>
                    <li>{tr('agreement-c')}</li>
                    <li>{tr('agreement-d')}</li>
                    <li>{tr('agreement-e')}</li>
                    <li>{tr('agreement-f')}</li>
                    <li>
                      {tr('agreement-g')}
                      <ol type="i" className={styles.list2}>
                        <li>{tr('agreement-g-1')}</li>
                        <li>{tr('agreement-g-2')}</li>
                        <li>{tr('agreement-g-3')}</li>
                        <li>{tr('agreement-g-4')}</li>
                      </ol>
                    </li>
                    <p>{tr('agreement-g-paragraph')}</p>
                    <li>{tr('agreement-h')}</li>
                    <li>{tr('agreement-i')}</li>
                  </ol>
                  <h3 className={styles.subtitle}>{tr('privacy')}</h3>
                  <p className={styles.paragraph}>{tr('privacy-paragraph')}</p>
                  <p className={styles.paragraph}>{tr('privacy-paragraph2')}</p>
                  <ol type="i" className={styles.list2}>
                    <li>{tr('privacy-1')}</li>
                    <li>{tr('privacy-2')}</li>
                    <li>{tr('privacy-3')}</li>
                    <li>{tr('privacy-4')}</li>
                    <p>{tr('Furthermore')}</p>
                    <li>{tr('privacy-5')}</li>
                    <li>{tr('privacy-6')}</li>
                  </ol>
                  <h3 className={styles.subtitle}>{tr('limitation')}</h3>
                  <p className={styles.paragraph}>
                    {tr('limitation-paragraph')}
                  </p>
                  <p className={styles.paragraph}>
                    {tr('limitation-paragraph2')}
                  </p>
                  <h3>{tr('termination-of-Use')}</h3>
                  <p className={styles.paragraph}>{tr('termination')}</p>
                  <h3 className={styles.subtitle}>{tr('governing')}</h3>
                  <p className={styles.paragraph}>
                    {tr('governing-paragraph')}
                  </p>
                  <p className={styles.paragraph}>
                    {tr('governing-paragraph2')}
                  </p>
                  <p className={styles.paragraph}>
                    {tr('governing-paragraph3')}
                  </p>
                  <p>
                    {tr("open-ia")}
                  </p>
                  <a href={tr("open-ia-link")} style={{color:'blue',textDecoration:"underline"}}>{tr("open-ia-link")}</a>
                  <h3 className={styles.subtitle}>{tr('contact')}</h3>
                  <p className={styles.paragraph}>
                    {tr('contact-information')}
                  </p>
                  <a className={styles.paragraph} href={`mailto:${tr("contact-email")}`}>{tr('contact-email')}</a>
                  <p className={styles.paragraph}>{tr('contact-address')}</p>
                </div>
              </div>
              <div className="row flex-x-center">
                <section id="banner-talent-search">
                  <div className="container">
                    <div className="row flex-y-center">
                      <div className="col-md-6">
                        <Image
                          src="/images/search-bg.png"
                          alt=""
                          width={640}
                          height={360}
                          layout="responsive"
                        />
                      </div>

                      <div className={`col-md-6 ${styles.information}`}>
                        <div className={`${styles.content}`}>
                          <h2 className="text-40 title">
                            <strong>{tc('need-talent')}</strong>
                          </h2>

                          <Link href="/opportunities">
                            <a
                              className="btn btn--primary"
                              onClick={handleFindTalents}
                            >
                              {tc('find-talent')}
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
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
      ['common', 'profile', 'validation', 'notifications', 'terms'],
      i18nConfig
    )),
  },
});

export default TermsConditions;
