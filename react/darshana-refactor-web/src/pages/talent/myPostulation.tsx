import LayoutCore from '@layouts/LayoutCore';
import { NextPage } from 'next';
import Image from 'next/image';
import { CardJob, CardProject } from '@components';
import React, { useContext, useEffect, useState } from 'react';
import { useFetchSWR, useGetData } from '@hooks';
import Skeleton from 'react-loading-skeleton';
import { nanoid } from 'nanoid';
import { IResponse } from '@interfaces/response';
import { getTimeAgo } from '@utils';
import Link from 'next/link';
import { AuthContext } from '@contexts/auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '@constants/i18n';
import { useTranslation } from 'next-i18next';
import CPagination from '@components/Atoms/Pagination/CPagination';

const MyPostulation: NextPage = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('project_applications');
  const [activeTabApplication, setActiveTabApplication] = useState(
    '$project.project_status_id$=1',
  );
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const [, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;
  // const { data: job_applications, isLoading: isLoadingJobs } = useFetchSWR(`job_applications/${user?.user_uuid}?order[][dir]=desc`);
  // const { data: project_applications, isLoading: isLoadingproject_applications } = useFetchSWR(`project_applications/${user?.user_uuid}?order[][dir]=desc`);

  // for pagination
  const { executeGet, isLoading, data, meta } = useGetData();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    executeGet(
      `${activeTab}/all?user_uuid=${user?.user_uuid}&order[][dir]=desc&length=8&page=${currentPage}&${activeTabApplication}`,
    );
  }, [activeTab, currentPage, activeTabApplication]);

  return (
    <LayoutCore id="myPostulation" title="My Postulation">
      <div className="container">
        <div className="return-to">
          <Link href="/profile/my-profile">
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
                onClick={() => {
                  setActiveTab('project_applications');
                  setCurrentPage(1);
                  setActiveTabApplication('$project.project_status_id$=1');
                }}
              >
                {tc('projects')}
              </button>
              <button
                className={`btn ${
                  activeTab === 'job_applications' ? 'active' : ''
                }`}
                onClick={() => {
                  setActiveTab('job_applications');
                  setCurrentPage(1);
                  setActiveTabApplication('$job.job_status_id$=1');
                }}
              >
                {tc('jobs')}
              </button>
            </div>
          </div>

          {activeTab === 'job_applications' && (
            <>
              <div className="container-button">
                <select
                  className="form-control form-select"
                  onChange={(e) => setActiveTabApplication(e.target.value)}
                >
                  <option value="$job.job_status_id$=1">{tc('Pending')}</option>
                  <option value="$job.job_status_id$=2&$job.job_status_id$=3&selected=2">
                    {tc('Hired')}
                  </option>
                  <option value="$job.job_status_id$=2&selected=0&selected=1">
                    {tc('Close')}
                  </option>
                </select>
                <div className="buttons-tabs">
                  <button
                    className={`btn ${
                      activeTabApplication === '$job.job_status_id$=1'
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => {
                      setActiveTabApplication('$job.job_status_id$=1');
                      setCurrentPage(1);
                    }}
                  >
                    {tc('pending')}
                  </button>
                  <button
                    className={`btn ${
                      activeTabApplication ===
                      '$job.job_status_id$=2&$job.job_status_id$=3&selected=2'
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => {
                      setActiveTabApplication(
                        '$job.job_status_id$=2&$job.job_status_id$=3&selected=2',
                      );
                      setCurrentPage(1);
                    }}
                  >
                    {tc('hired')}
                  </button>
                  <button
                    className={`btn ${
                      activeTabApplication ===
                      '$job.job_status_id$=2&selected=0&selected=1'
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => {
                      setActiveTabApplication(
                        '$job.job_status_id$=2&selected=0&selected=1',
                      );
                      setCurrentPage(1);
                    }}
                  >
                    {tc('close')}
                  </button>
                </div>
              </div>
              <div className="content-cards">
                {isLoading ? (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={nanoid()} className="skeleton" />
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
                            job?.job?.business?.user_workplace?.workplace_name
                          }
                          description={job?.job?.summary}
                          time={getTimeAgo(
                            new Date(),
                            job?.job?.createdAt,
                            lang,
                          )}
                          location={job?.job?.country?.name}
                          image={job?.job?.business?.owner?.profile_picture_url}
                          ownerUuid={job?.job?.user_uuid}
                        />
                      ))
                    ) : (
                      <div>{tv('empty-applications-jobs')}</div>
                    )}
                  </>
                )}
              </div>
              {/* Pagination */}

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
              <div className="container-button">
                <select
                  className="form-control form-select"
                  onChange={(e) => setActiveTabApplication(e.target.value)}
                >
                  <option value="$project.project_status_id$=1">
                    {tc('Pending')}
                  </option>
                  <option value="$project.project_status_id$=2&$project.project_status_id$=3&accepted=2">
                    {tc('Hired')}
                  </option>
                  <option value="$project.project_status_id$=2&accepted=0&accepted=1">
                    {tc('Close')}
                  </option>
                </select>
                <div className="buttons-tabs">
                  <button
                    className={`btn ${
                      activeTabApplication === '$project.project_status_id$=1'
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => {
                      setActiveTabApplication('$project.project_status_id$=1');
                      setCurrentPage(1);
                    }}
                  >
                    {tc('pending')}
                  </button>
                  <button
                    className={`btn ${
                      activeTabApplication ===
                      '$project.project_status_id$=2&$project.project_status_id$=3&accepted=2'
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => {
                      setActiveTabApplication(
                        '$project.project_status_id$=2&$project.project_status_id$=3&accepted=2',
                      );
                      setCurrentPage(1);
                    }}
                  >
                    {tc('hired')}
                  </button>
                  <button
                    className={`btn ${
                      activeTabApplication ===
                      '$project.project_status_id$=2&accepted=0&accepted=1'
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => {
                      setActiveTabApplication(
                        '$project.project_status_id$=2&accepted=0&accepted=1',
                      );
                      setCurrentPage(1);
                    }}
                  >
                    {tc('close')}
                  </button>
                </div>
              </div>
              <div className="content-cards">
                {isLoading ? (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={nanoid()} className="skeleton" />
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
                          idProject={project?.project_application?.project_id}
                          image={
                            project?.project_application?.project?.image_url
                          }
                          mobileImage={
                            project?.project_application?.project
                              ?.mobile_image_url
                          }
                          title={project?.project_application?.project?.name}
                          company={
                            project?.project_application?.project?.business
                              ?.user_workplace?.workplace_name
                          }
                          description={project?.project?.description}
                          time={getTimeAgo(
                            new Date(),
                            project?.project_application?.project?.createdAt,
                            lang,
                          )}
                          location={
                            project?.project_application?.project?.country?.name
                          }
                          ownerUuid={
                            project?.project_application?.project?.user_uuid
                          }
                          summary={project?.project?.description}
                        />
                      ))
                    ) : (
                      <div>{tv('empty-applications-projects')}</div>
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
      i18nConfig,
    )),
  },
});

export default MyPostulation;
