import React, { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import i18nConfig from '@constants/i18n';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import LayoutCore from '@layouts/LayoutCore';
import { useGetData } from '@hooks/index';
import { AuthContext } from '@contexts/auth';
import { CardJob, CardProfile, CardProject } from '@components';
import { nanoid } from 'nanoid';
import Skeleton from 'react-loading-skeleton';
import { getTimeAgo, typeFavorites } from '@utils';
import CPagination from '@components/Atoms/Pagination/CPagination';

const Favorite: NextPage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { t: tc } = useTranslation('common');
  const [, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;
  const [activeTab, setActiveTab] = useState('projects');

  const [option, setOption] = useState(
    `users/favorites?type=${typeFavorites.project}`
  );
  const { executeGet, isLoading, data, meta } = useGetData();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    executeGet(`${option}&order[][dir]=desc&length=8&page=${currentPage}`);
  }, [option, currentPage]);
  const isRecruiter = () => {
    const isrecruiterWork = user?.workplaces.find(
      (workplace) => workplace.enable_business
    );
    if (isrecruiterWork) {
      return true;
    }
    return !user?.is_talent ? true : false;
  };

  return (
    <LayoutCore id="dashboard" title="Favorites">
      <div className="container">
        <section>
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
        </section>

        <section className="col-md-12 section">
          <div className="nav-tabs">
            <div className="buttons-tabs">
              <button
                className={`btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('projects');
                  setOption(`users/favorites?type=${typeFavorites.project}`);
                }}
              >
                {tc('projects')}
              </button>
              <button
                className={`btn ${activeTab === 'jobs' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('jobs');
                  setOption(`users/favorites?type=${typeFavorites.job}`);
                }}
              >
                {tc('jobs')}
              </button>
              {isRecruiter() && (
                <button
                  className={`btn ${activeTab === 'talents' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('talents');
                    setOption(`users/favorites?type=${typeFavorites.talent}`);
                  }}
                >
                  {tc('talents')}
                </button>
              )}
            </div>
          </div>

          {activeTab === 'projects' && (
            <>
              <div className="content-cards suggested-profiles">
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
                          idProject={project?.favorite_uuid_detail.id}
                          image={project?.favorite_uuid_detail.image_url}
                          mobileImage={
                            project?.favorite_uuid_detail?.mobile_image_url
                          }
                          title={project?.favorite_uuid_detail.name}
                          company={project?.business?.workplace?.workplace_name}
                          time={getTimeAgo(
                            new Date(),
                            project?.favorite_uuid_detail.created_at,
                            lang
                          )}
                          location={project?.favorite_uuid_detail.country?.name}
                          isFavorite={true}
                          ownerUuid={project?.favorite_uuid_detail?.user_uuid}
                          summary={project?.description}
                        />
                      ))}
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === 'jobs' && (
            <>
              <div className="content-cards suggested-profiles">
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
                          idJob={job?.favorite_uuid_detail.id}
                          title={job?.favorite_uuid_detail.name}
                          company={
                            job?.favorite_uuid_detail.business?.workplace
                              ?.workplace_name
                          }
                          description={job?.favorite_uuid_detail.summary}
                          time={getTimeAgo(
                            new Date(),
                            job?.favorite_uuid_detail.created_at,
                            lang
                          )}
                          location={job?.favorite_uuid_detail.country?.name}
                          image={
                            job?.favorite_uuid_detail.owner?.profile_picture_url
                          }
                          showFavorite={true}
                          isFavorite={true}
                          ownerUuid={job?.favorite_uuid_detail.user_uuid}
                        />
                      ))}
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === 'talents' && (
            <>
              <div className="content-cards suggested-profiles">
                {isLoading ? (
                  <>
                    {[...Array(2)].map((_, i) => (
                      <Skeleton key={nanoid()} className="skeletonTalents" />
                    ))}
                  </>
                ) : (
                  <>
                    {data &&
                      data?.map((talent: any) => (
                        <CardProfile
                          key={nanoid()}
                          idTalent={talent?.favorite_uuid_detail.id}
                          image={
                            talent?.favorite_uuid_detail.profile_picture_url ||
                            '/images/profile-placeholder.png'
                          }
                          name={`${
                            talent?.favorite_uuid_detail.user?.person.name || ''
                          } ${
                            talent?.favorite_uuid_detail.user?.person
                              .last_name || ''
                          }`}
                          profession={talent?.favorite_uuid_detail.subtitle}
                          summary={talent?.favorite_uuid_detail.summary}
                          isFavorite={true}
                        />
                      ))}
                  </>
                )}
              </div>
            </>
          )}

          <CPagination
            isLoading={isLoading}
            meta={meta}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </section>
      </div>
    </LayoutCore>
  );
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

export default Favorite;
