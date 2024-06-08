import i18nConfig from '@constants/i18n';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

const Success: NextPage = () => {
  return <div>success</div>;
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

export default Success;
