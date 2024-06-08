import { Job, Project } from '@components';
import LayoutCore from '@layouts/LayoutCore';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '@constants/i18n';
import { useTranslation } from 'next-i18next';

const MyPublish: NextPage = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const { t: tc } = useTranslation('common');

  return (
    <LayoutCore id="myPublish" title="My Publish">
      <Link href="/opportunities" passHref>
        <button className="return">
          <div className="returnIcon">
            <Image
              src="/images/icons/arrow-left.svg"
              alt="back"
              width={16}
              height={16}
            />
          </div>
          <span>{tc('go-back')}</span>
        </button>
      </Link>
      <section>
        <div className="container-row">
          <h2 className="text-40 title">{tc('my-posts')}</h2>
          <div className="buttons-tabs">
            <button
              className={`btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              {tc('projects')}
            </button>
            <button
              className={`btn ${activeTab === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveTab('jobs')}
            >
              {tc('jobs')}
            </button>
          </div>
        </div>
      </section>
      <div className="line" />
      <section className="containter-jobData">
        {activeTab === 'jobs' && <Job />}
        {activeTab === 'projects' && <Project />}
      </section>
    </LayoutCore>
  );
};

// @ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ['common', 'notifications', 'validation'],
      i18nConfig
    )),
  },
});

export default MyPublish;
