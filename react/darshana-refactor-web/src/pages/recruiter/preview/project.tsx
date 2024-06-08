import { useState } from 'react';
import type { GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import LayoutCore from '@layouts/LayoutCore';
import { CardDescription, CardDetail, ProjectFiles } from '@components';
import { DataProject, getProjectByIdResponse } from '@api/index';
import { convertDateNow, convertDateToMMDDYYYY } from '@utils';
import i18nConfig from 'src/constants/i18n';

import styles from '../../../styles/pages/_projectDetail.module.scss';
import { useTranslation } from 'next-i18next';

type links = { text: string; href: string };
const links: links[] = [];

const ProjectDetail: NextPage = () => {
  const [activeTab, setActiveTab] = useState('detail');
  const data = localStorage.getItem('projectPreview')!;
  const {
    workplace_name = ' ',
    description = ' ',
    name = ' ',
    min_salary = 0,
    max_salary = 0,
    hourly_wage = 0,
    skills = [],
    body = ' ',
    country_name = ' ',
    weeks = ' ',
    created_at,
    image_url = '',
  } = JSON.parse(data);
  const date = convertDateNow();
  // const { name, price, weeks, created_at, country, description, body, skills, id, business,business_id } = project as DataProject;
  const router = useRouter();
  const { t: tc } = useTranslation('common');

  return (
    <LayoutCore id="projectDetail" title="Project Preview">
      <div className="container">
        <div className={styles.returnTo}>
          <button
            className="btn btn--return"
            onClick={() => router.push('/opportunities')}
          >
            <Image
              className="icon"
              src="/images/icons/arrow-left.svg"
              alt="back"
              width={16}
              height={16}
            />

            <span>{tc('go-back')}</span>
          </button>
        </div>

        <CardDetail
          type="project"
          title={workplace_name}
          place={`${country_name}.`}
          publish={date}
          projectTime={tc('time-weeks', { weeks: weeks })}
          min_salary={min_salary}
          max_salary={max_salary}
          hourly_wage={hourly_wage}
          salary={null}
        ></CardDetail>
        <div className={`${styles.scrollTabs} buttons-Scroll`}></div>

        {activeTab === 'detail' && (
          <CardDescription
            type="project"
            title={name}
            workplaceName={workplace_name}
            place={`${country_name}.`}
            summary={description}
            body={body}
            skills={skills}
            image_url={image_url}
          />
        )}
        {/* {activeTab === 'talents' && (
          <ProjectBoard />
        )}
        {activeTab === 'files' && (
          <ProjectFiles />
        )} */}
      </div>
    </LayoutCore>
  );
};

// @ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      [
        'common',
        'validation',
        'profile',
        'notifications',
        'board',
        'postulation',
      ],
      i18nConfig
    )),
  },
});

export default ProjectDetail;
