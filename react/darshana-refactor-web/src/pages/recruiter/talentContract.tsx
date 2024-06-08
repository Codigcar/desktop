// @ts-nocheck
/* eslint-disable */
import { Job, ProfileInviteModal, Project } from '@components';
import LayoutCore from '@layouts/LayoutCore';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { useContext, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '@constants/i18n';
import { useTranslation } from 'next-i18next';
import CardRating from '../../components/CardRating/CardRating';
import { useFetchSWR, useGetData } from '@hooks';
import { AuthContext } from '@contexts/auth';
import CPagination from '@components/Atoms/Pagination/CPagination';
import { ProjectRating } from '@interfaces/index';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const talentContract: NextPage = () => {
  const { user } = useContext(AuthContext);
  // const isUserMe = user?.id == idUser ? true : false;
  const { executeGet, isLoading, data, meta } = useGetData();

  const [currentPage, setCurrentPage] = useState(1);
  const { t: tc } = useTranslation('common');
  useEffect(() => {
    executeGet(
      `project_applications/all?$project.user_uuid$=${user?.user_uuid}&$project.project_status_id$=3&accepted=2&length=9&page=${currentPage}`
    );
  }, [currentPage]);

  return (
    <LayoutCore id="myPublish" title="Talent Rating">
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
          <h2 className="text-40 title">{tc('talents-rating')}</h2>
        </div>
      </section>
      <div className="line" />
      <section className="containter-jobData">
        <div className="content-cards">
          {data.map((item: ProjectRating, index) => (
            <CardRating
              key={index}
              fullName={item?.project_application?.user_detail?.full_name}
              subtitle={item?.project_application?.user_detail?.subtitle}
              comment={item?.project_talent_qualifications?.comment}
              ProjectTitle={item?.project_application?.project?.name}
              projectTalentQualification={item?.project_talent_qualifications}
              idUser={item?.project_application?.user_detail?.id}
              user_detail={item?.project_application?.user_detail}
              projectId={item?.project_application.project_id}
              executeGet={() =>
                executeGet(
                  `project_applications/all?$project.user_uuid$=${user?.user_uuid}&$project.project_status_id$=3&accepted=2&length=9&page=${currentPage}`
                )
              }
            />
          ))}
        </div>
      </section>
      <CPagination
        isLoading={isLoading}
        meta={meta}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
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

export default talentContract;
