import React, {useContext, useEffect, useState} from 'react';
import ListJob from './ListJob';
import {useFetchSWR, useGetData} from "@hooks";
import {AuthContext} from "@contexts/auth";
import {useRouter} from 'next/router';
import {useTranslation} from "next-i18next";
import CPagination from '@components/Atoms/Pagination/CPagination';

const Job = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('1');
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');

  // for pagination
  const { executeGet, isLoading, data, meta } = useGetData();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    executeGet(`jobs?user_uuid=${user?.user_uuid}&order[][dir]=desc&length=5&page=${currentPage}&job_status_id=${activeTab}`);
  }, [activeTab, currentPage]);

  return (
    <>
      <div className="container-button">
        <select className="form-control form-select" onChange={(e)=>setActiveTab(e.target.value)}>
            <option value="1">{tc('published')}</option>
            <option value="2">{tc('finished')}</option>
        </select>
        <div className="buttons-tabs">
          <button
            className={`btn ${activeTab === '1' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('1')
              setCurrentPage(1)
            }}
          >
            {tc('published')}
          </button>
          <button
            className={`btn ${activeTab === '3' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('3')
              setCurrentPage(1)
            }}
          >
            {tc('finished')}
          </button>
        </div>
        <div className="new-post">
          <button className="btn btn--stroke" onClick={()=>router.push("/recruiter/addJob")}>{tc('new-post')}</button>
        </div>
      </div>

     
      {activeTab === '1' && <ListJob isLoading={isLoading} jobs={data && user && data?.filter((element: any) => element.job_status_id === 1)} emptyJobsMessage={tv('empty-jobs')} />}
      {activeTab === '3' && <ListJob isLoading={isLoading} jobs={data && user && data?.filter((element: any) => element.job_status_id === 3)} emptyJobsMessage={tv('empty-jobs')} />}

      <CPagination
        isLoading={isLoading}
        meta={meta}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div style={{marginBottom:50}} >
      </div>
    </>
  );
};

export default Job;
