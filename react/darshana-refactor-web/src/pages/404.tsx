import { NextPage } from 'next';

import Layout from '@layouts/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../constants/i18n';
import React, { useContext } from 'react';

import { useTranslation } from 'next-i18next';
import { AuthContext } from '@contexts/auth';
import LayoutCore from '@layouts/LayoutCore';
import Image from 'next/image';
import Link from 'next/link';

const HelpCenter: NextPage = () => {
  const { t: tc } = useTranslation('common');
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {isLoggedIn ? (
        <LayoutCore id="page-error" title="Error 404">
          <section className="container">
            <Image
              src="/images/404.png"
              width={1000}
              height={467}
              alt="404 error"
            />
            <h1 className="text-40">
              <b>{tc('404-error')}</b>
            </h1>
            <Link href="/">
              <a className="btn btn--primary">{tc('back-to-homepage')}</a>
            </Link>
          </section>
        </LayoutCore>
      ) : (
        <Layout id="page-error" title="Error 404">
          <section className="container">
            <Image
              src="/images/404.png"
              width={1032}
              height={467}
              alt="404 error"
            />
            <h1 className="text-40">
              <b>{tc('404-error')}</b>
            </h1>
            <Link href="/">
              <a className="btn btn--primary">{tc('back-to-homepage')}</a>
            </Link>
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
      i18nConfig
    )),
  },
});

export default HelpCenter;
