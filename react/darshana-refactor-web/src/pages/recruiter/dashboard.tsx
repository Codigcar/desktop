import { NextPage } from 'next';

import Link from 'next/link';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LayoutCore from '@layouts/LayoutCore';
import { CardJob, CardProfile, CardProject } from '@components';
import { BannerSearch, Summary } from '@components/pages/dasboard';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@contexts/auth';
import { useFetchSWR, useGetData } from '@hooks';
import Skeleton from 'react-loading-skeleton';
import { nanoid } from 'nanoid';
import { IResponse } from '@interfaces/response';
import { getTimeAgo } from '@utils';
import i18nConfig from '@constants/i18n';
import { useTranslation } from 'next-i18next';
import { darshanaApiNoToken } from '../../api/darshanaApiNoToken';
// @ts-ignore
const Dashboard: NextPage = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('jobs');
  const { data: talents, isLoading: isLoadingTalents } = useFetchSWR(
    'talents?order[][column]=profile_percentage&order[][dir]=desc&length=8'
  );
  const { t: tc } = useTranslation('common');
  const [, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;

  // for pagination
  const { executeGet, isLoading, data, meta } = useGetData();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    localStorage.setItem('CURRENT_DASHBOARD_TAB', activeTab);
    executeGet(
      `${activeTab}?user_uuid=${user?.user_uuid}&order[][dir]=desc&length=5&page=${currentPage}`
    );
  }, [activeTab, currentPage]);

  return (
    <LayoutCore id="dashboard" title="Dashboard">
      <div className="container">
        <div className="row">
          <aside className="col-md-3 aside">
            <Summary role="recruiter" />
          </aside>

          <section className="col-md-9 section">
            <h2 className="text-24">
              <b>{tc('my-posts')}:</b>
            </h2>

            <div className="nav-tabs">
              <div className="buttons-tabs">
                <button
                  className={`btn ${activeTab === 'jobs' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('jobs');
                    setCurrentPage(1);
                  }}
                >
                  {tc('jobs')}
                </button>
                <button
                  className={`btn ${activeTab === 'projects' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('projects');
                    setCurrentPage(1);
                  }}
                >
                  {tc('projects')}
                </button>
              </div>

              <Link href="/recruiter/myPublish">
                <a className="btn btn--return icon-right">
                  <span>{tc('see-all')}</span>

                  <Image
                    className="icon"
                    src="/images/icons/arrow-right.svg"
                    alt="back"
                    width={16}
                    height={16}
                  />
                </a>
              </Link>
            </div>

            {activeTab === 'projects' && (
              <>
                <div className="content-cards">
                  {isLoading ? (
                    <>
                      {[...Array(2)].map((_, i) => (
                        <Skeleton key={nanoid()} className="skeleton" />
                      ))}
                    </>
                  ) : (
                    <>
                      {data &&
                        user &&
                        data?.map((project: any) => (
                          <CardProject
                            key={nanoid()}
                            idProject={project?.id}
                            image={project?.image_url}
                            mobileImage={project?.mobile_image_url}
                            title={project?.name}
                            company={
                              project?.business?.workplace?.workplace_name
                            }
                            time={getTimeAgo(
                              new Date(),
                              project?.created_at,
                              lang
                            )}
                            location={project?.country?.name}
                            isFavorite={project?.favorite}
                            ownerUuid={project?.owner?.user_uuid}
                            summary={project.description}
                          />
                        ))}
                    </>
                  )}
                </div>
              </>
            )}

            {activeTab === 'jobs' && (
              <>
                <div className="content-cards">
                  {isLoading ? (
                    <>
                      {[...Array(2)].map((_, i) => (
                        <Skeleton key={nanoid()} className="skeleton" />
                      ))}
                    </>
                  ) : (
                    <>
                      {data &&
                        user &&
                        data?.map((job: any) => (
                          <CardJob
                            key={nanoid()}
                            idJob={job?.id}
                            title={job?.name}
                            company={job?.business?.workplace?.workplace_name}
                            description={job?.summary}
                            time={getTimeAgo(new Date(), job?.created_at, lang)}
                            location={job?.country?.name}
                            image={job?.owner?.profile_picture_url}
                            showFavorite={true}
                            isFavorite={job?.favorite}
                            ownerUuid={job?.owner?.user_uuid}
                          />
                        ))}
                    </>
                  )}
                </div>
              </>
            )}

            <h2 className="text-24">
              <b>{tc('suggestions')}:</b>
            </h2>
            <div className="content-cards suggested-profiles">
              {isLoadingTalents ? (
                <>
                  {[...Array(2)].map((_, i) => (
                    <Skeleton key={nanoid()} className="skeletonTalents" />
                  ))}
                </>
              ) : (
                <>
                  {talents &&
                    (talents as IResponse).data?.map((talent: any) => (
                      <CardProfile
                        key={nanoid()}
                        idTalent={talent?.id}
                        image={
                          talent?.profile_picture_url ||
                          'https://cdn.whiz.pe/api/v2/image/e5b8f779-06a6-45a7-b121-88e62182b8f3/png'
                        }
                        name={`${talent?.full_name}`}
                        profession={talent?.subtitle}
                        summary={talent?.summary}
                        user_uuid={talent?.user_uuid}
                      />
                    ))}
                </>
              )}
            </div>

            <BannerSearch />
          </section>
        </div>
      </div>
    </LayoutCore>
  );
};
export const getServerSideProps = async ({ locale }: any) => {
  const data = await darshanaApiNoToken('/talents');
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'notifications', 'validation'],
        i18nConfig
      )),
      talents: data.data,
    },
  };
};

export default Dashboard;
