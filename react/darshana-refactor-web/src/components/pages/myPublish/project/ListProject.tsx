import React, { FC } from 'react';
import { CardProject } from '@components';
import Skeleton from 'react-loading-skeleton';
import { nanoid } from 'nanoid';
import { getTimeAgo } from '@utils';
import { useTranslation } from 'next-i18next';

interface Props {
  projects: any;
  isLoading: boolean;
  emptyProjectMessage: string;
}

const ListProject: FC<Props> = ({
  projects,
  isLoading,
  emptyProjectMessage = '',
}) => {
  const [, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;
  return (
    <div className="content-cards">
      {isLoading ? (
        <>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={nanoid()} height={198} width={350} />
          ))}
        </>
      ) : (
        <>
          {projects?.length > 0 ? (
            projects &&
            projects.map((project: any) => (
              <CardProject
                key={nanoid()}
                idProject={project?.id}
                image={project?.image_url}
                mobileImage={project?.mobile_image_url}
                title={project?.name}
                company={project?.business?.workplace?.workplace_name}
                time={getTimeAgo(new Date(), project?.created_at, lang)}
                location={project?.country?.name}
                isFavorite={project?.favorite}
                ownerUuid={project?.owner?.user_uuid}
                summary={project?.description}
              />
            ))
          ) : (
            <div>{emptyProjectMessage}</div>
          )}
        </>
      )}
    </div>
  );
};

export default ListProject;
