import { useContext } from 'react';
import type { GetStaticPaths, NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import i18nConfig from '@constants/i18n';

import { AuthContext } from '@contexts/auth';

import LayoutCore from '@layouts/LayoutCore';
import { MessageContainer } from '@components/pages/message';

const Message: NextPage = () => {
  const router = useRouter();
  const { user: fromUser } = useContext(AuthContext);
  const { t: tc } = useTranslation('common');

  const { id } = router.query as { id: string | string[] };
  const paramUser_uuid = id ? id[0] : '';

  return (
    <LayoutCore id="message" title="Message">
      <div className="container">
        <button className="btn btn--return" onClick={() => router.back()}>
          <Image
            className="icon"
            src="/images/icons/arrow-left.svg"
            alt="back"
            width={16}
            height={16}
          />

          <span>{tc('go-back')}</span>
        </button>

        <h1 className="text-40 page-title">
          <strong className="black">{tc('messages')}</strong>
        </h1>

        <MessageContainer
          paramUser_uuid={paramUser_uuid}
          fromUser={fromUser}
          placeholder={tc('find')}
        />
      </div>
    </LayoutCore>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

// @ts-ignore
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'validation', 'profile', 'notifications'],
        i18nConfig
      )),
    },
  };
};

export default Message;
