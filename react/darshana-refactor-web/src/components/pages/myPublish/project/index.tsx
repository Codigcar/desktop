import React, { FC, useContext, useEffect, useState } from 'react';
import ListProject from './ListProject';
import { AuthContext } from '@contexts/auth';
import { useRouter } from 'next/router';
import { useGetData } from '@hooks';
import { useTranslation } from 'next-i18next';
import CPagination from '@components/Atoms/Pagination/CPagination';

const Project: FC = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('1');
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');

  // for pagination
  const { executeGet, isLoading, data, meta } = useGetData();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    executeGet(
      `projects?user_uuid=${user?.user_uuid}&order[][dir]=desc&length=8&page=${currentPage}&project_status_id=${activeTab}`
    );
  }, [activeTab, currentPage]);

  return (
    <>
      <div className="container-button">
        <select
          className="form-control form-select"
          onChange={(e) => setActiveTab(e.target.value)}
        >
          <option value="1">{tc('published')}</option>
          <option value="2">{tc('in-process')}</option>
          <option value="3">{tc('finished')}</option>
        </select>
        <div className="buttons-tabs">
          <button
            className={`btn ${activeTab === '1' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('1');
              setCurrentPage(1);
            }}
          >
            {tc('published')}
          </button>
          <button
            className={`btn ${activeTab === '2' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('2');
              setCurrentPage(1);
            }}
          >
            {tc('in-process')}
          </button>
          <button
            className={`btn ${activeTab === '3' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('3');
              setCurrentPage(1);
            }}
          >
            {tc('finished')}
          </button>
        </div>
        <div className="new-post">
          <button
            className="btn btn--stroke"
            onClick={() => router.push('/recruiter/addProject')}
          >
            {tc('new-post')}
          </button>
        </div>
      </div>
      {activeTab === '1' && (
        <ListProject
          isLoading={isLoading}
          projects={
            data &&
            user &&
            data?.filter((element: any) => element.project_status_id === 1)
          }
          emptyProjectMessage={tv('empty-projects')}
        />
      )}
      {activeTab === '2' && (
        <ListProject
          isLoading={isLoading}
          projects={
            data &&
            user &&
            data?.filter((element: any) => element.project_status_id === 2)
          }
          emptyProjectMessage={tv('empty-projects')}
        />
      )}
      {activeTab === '3' && (
        <ListProject
          isLoading={isLoading}
          projects={
            data &&
            user &&
            data?.filter((element: any) => element.project_status_id === 3)
          }
          emptyProjectMessage={tv('empty-projects')}
        />
      )}

      <CPagination
        isLoading={isLoading}
        meta={meta}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div style={{ marginBottom: 50 }}></div>
    </>
  );
};

export default Project;
