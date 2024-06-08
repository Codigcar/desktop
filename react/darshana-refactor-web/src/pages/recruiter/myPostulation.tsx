import LayoutCore from '@layouts/LayoutCore';
import { NextPage } from 'next';
import Image from 'next/image';
import { CardJob, CardProject } from '@components';
import React, { useContext, useEffect, useState } from 'react';
import { useGetData } from '@hooks';
import Skeleton from 'react-loading-skeleton';
import { nanoid } from 'nanoid';
import { IResponse } from '@interfaces/response';
import { getTimeAgo } from '@utils';
import Link from 'next/link';
import { AuthContext } from '@contexts/auth';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '@constants/i18n';
import CPagination from '@components/Atoms/Pagination/CPagination';
import { useSWRConfig } from 'swr';

const MyPostulation: NextPage = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('project_applications');
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const [, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;
  const { executeGet, isLoading, data, meta } = useGetData();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    executeGet(
      `${activeTab}?user_uuid=${user?.user_uuid}&order[][dir]=desc&length=5&page=${currentPage}`
    );
  }, [activeTab, currentPage]);
  return (
    <LayoutCore id="myPostulation" title="My Postulation">
      <div className="container">
        <div className="return-to">
          <Link href="/opportunities">
            <a className="btn btn--return">
              <Image
                className="icon"
                src="/images/icons/arrow-left.svg"
                alt="back"
                width={16}
                height={16}
              />

              <span>{tc('go-back')}</span>
            </a>
          </Link>
        </div>

        <section>
          <h1 className="text-40 title">
            <strong className="black">{tc('my-applications')}</strong>
          </h1>

          <div className="nav-tabs">
            <div className="buttons-tabs">
              <button
                className={`btn ${
                  activeTab === 'project_applications' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('project_applications')}
              >
                {tc('projects')}
              </button>
              <button
                className={`btn ${
                  activeTab === 'job_applications' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('job_applications')}
              >
                {tc('jobs')}
              </button>
            </div>
          </div>

          {activeTab === 'job_applications' && (
            <>
              <div className="content-cards">
                {isLoading ? (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={nanoid()} height={150} width={748} />
                    ))}
                  </>
                ) : (
                  <>
                    {data.length > 0 ? (
                      data &&
                      user &&
                      data?.map((job: any) => (
                        <CardJob
                          key={nanoid()}
                          idJob={job?.job_id}
                          title={job?.job?.name}
                          company={
                            job?.job?.business?.workplace?.workplace_name
                          }
                          description={job?.job?.summary}
                          time={getTimeAgo(new Date(), job?.created_at, lang)}
                          location={job?.job?.country?.name}
                          image={job?.job?.owner?.profile_picture_url}
                          ownerUuid={job?.job?.owner?.user_uuid}
                        />
                      ))
                    ) : (
                      <div>{tv('empty-jobs')}</div>
                    )}
                  </>
                )}
              </div>
              <CPagination
                isLoading={isLoading}
                meta={meta}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}

          {activeTab === 'project_applications' && (
            <>
              <div className="content-cards">
                {isLoading ? (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={nanoid()} height={150} width={748} />
                    ))}
                  </>
                ) : (
                  <>
                    {data.length > 0 ? (
                      data &&
                      user &&
                      data?.map((project: any) => (
                        <CardProject
                          key={nanoid()}
                          idProject={project?.project_id}
                          image={project?.project?.image_url}
                          mobileImage={project?.project?.mobile_image_url}
                          title={project?.project?.name}
                          company={
                            project?.project?.business?.workplace
                              ?.workplace_name
                          }
                          time={getTimeAgo(
                            new Date(),
                            project?.created_at,
                            lang
                          )}
                          location={project?.project?.country?.name}
                          ownerUuid={project?.project?.owner?.user_uuid}
                          summary={project?.project?.description}
                        />
                      ))
                    ) : (
                      <div>{tv('empty-projects')}</div>
                    )}
                  </>
                )}
              </div>
              {/* Pagination */}
              {!isLoading && (
                <CPagination
                  isLoading={isLoading}
                  meta={meta}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </>
          )}
        </section>
      </div>
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

export default MyPostulation;
