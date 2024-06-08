import i18nConfig from '@constants/i18n';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

const Cancelled: NextPage = () => {
  return <div>cancelled</div>;
};

// @ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ['common', 'profile', 'validation', 'notifications', 'terms'],
      i18nConfig,
    )),
  },
});

export default Cancelled;
