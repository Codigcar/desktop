import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import styles from './projectFiles.module.scss';
import Image from 'next/image';
import DropFile from '@components/Dropzone/DropFile';
import { FormProvider, useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { IProjectData } from '@interfaces/projects';
import {
  convertDateToDDMMYYYY,
  modalDeleteFile,
  sizeInMb,
  toastMessage,
  useYupValidationResolver,
} from '@utils';
import axios from 'axios';
import { darshanaApi } from '@api/darshanaApi';
import { AuthContext } from '@contexts/auth';
import { CButton, CInput } from '@components/Atoms';
import * as yup from 'yup';
import { OwnerProject } from '@api/getProjectDetailById';

interface Props {
  projects?: IProjectData;
  projectMutate?: any;
  accepted?: number | boolean;
  owner?: OwnerProject;
}
interface Files {
  icon: string;
  name: string;
  size: string;
  uploadDate: string;
  owner: string;
  link: string;
  id?: number;
}
const ProjectFiles: FC<Props> = ({
  projects,
  projectMutate,
  accepted,
  owner,
}) => {
  const [t, i18nConfig] = useTranslation();
  const [files, setFiles] = useState<Array<Files> | undefined>([]);
  const { t: tb } = useTranslation('board');
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const { user } = useContext(AuthContext);
  const isOwner = user?.user_uuid == owner?.user_uuid ? true : false;
  const isVisible = isOwner || accepted;
  const isFinishProject = projects?.project_status_id === 3 ? true : false;
  const methods = useForm({
    mode: 'onChange',
    defaultValues: { filesUpdate: projects?.files || [] },
  });
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        inputLink: yup.string().url().required(tv('required-field')),
        nameLink: yup.string().required(tv('required-field')),
        fontLink: yup.string().required(tv('required-field')),
      }),
    [tv]
  );
  const resolver = useYupValidationResolver(validationSchema);
  const methodsAddFileLink = useForm({
    mode: 'onSubmit',
    defaultValues: { inputLink: '', fontLink: '', nameLink: '' },
    resolver,
  });
  useEffect(() => {
    const filesData = projects?.files.map((file) => ({
      icon: '/images/icons/file.svg',
      name: file.file_name,
      size: isNaN(parseInt(file.file_size))
        ? file.file_size
        : ` ${sizeInMb(parseInt(file.file_size))} Mb`,
      uploadDate: convertDateToDDMMYYYY(file.created_at),
      owner: `${file.user.name} ${file.user.last_name[0].toUpperCase()}.`,
      link: file.file_url,
      id: file.id,
    }));
    setFiles(filesData);
    let defaultValues: any = {};
    defaultValues.filesUpdate = projects?.files || [];
    methods.reset({ ...defaultValues });
  }, [projects]);
  const filesUpdate = methods.watch('filesUpdate');
  useEffect(() => {
    const filesData = filesUpdate.map((file) => ({
      icon: '/images/icons/file.svg',
      name: file.file_name,
      size: isNaN(parseInt(file.file_size))
        ? file.file_size
        : ` ${sizeInMb(parseInt(file.file_size))} Mb`,
      uploadDate: convertDateToDDMMYYYY(file.created_at),
      owner: `${file.user.name} ${file.user.last_name[0].toUpperCase()}.`,
      link: file.file_url,
      id: file.id,
    }));
    setFiles(filesData);
  }, [filesUpdate]);

  const downloadFile = (link: string, name: string) => {
    if (link.includes('https')) {
      window.open(link, '_blank');
    } else {
      axios({
        url: `${process.env.NEXT_PUBLIC_API}/api/file/${link}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', name);
        document.body.appendChild(fileLink);

        fileLink.click();
        fileLink?.parentNode?.removeChild(fileLink);
      });
    }
  };
  const UpdateFilesPerLink = async (values: any) => {
    const filesData = {
      icon: '/images/icons/link.svg',
      name: values.nameLink,
      size: values.fontLink,
      uploadDate: convertDateToDDMMYYYY(new Date()),
      owner: `${user?.person.name} ${user?.person.last_name[0].toUpperCase()}.`,
      link: values.inputLink,
    };
    const dataFiles: {
      file_name: string;
      file_url: string;
      file_size: string;
    } = {
      file_name: values.nameLink,
      file_url: values.inputLink,
      file_size: values.fontLink,
    };

    const updateFilesList = [...files!];
    updateFilesList.push(filesData);
    setFiles(updateFilesList);
    const updateFiles = [...projects!.files, dataFiles];
    const projectUpdate = {
      id: projects!.id,
      business_id: projects!.business.id,
      work_modality_id: projects!.work_modality_id,
      country_id: projects!.country_id,
      files: updateFiles,
    };
    const resp = await darshanaApi.patch('/projects', projectUpdate);
    toastMessage('success', tv('file-success'));
    methodsAddFileLink.reset();
  };
  const remove = async (file: Files) => {
    const responseDelete = await modalDeleteFile(styles, tc);
    if (!responseDelete) {
      return;
    }
    const newFiles: Files[] = [...files!];
    const updateNewFiles = newFiles.filter((item) => item.id !== file.id);

    const updateFiles = projects?.files.filter(
      (project) => project.id != file.id
    );
    const projectUpdate = {
      id: projects!.id,
      business_id: projects!.business.id,
      work_modality_id: projects!.work_modality_id,
      country_id: projects!.country_id,
      files: updateFiles,
    };
    const mutateProject = {
      data: { ...projects, files: updateFiles },
      message: 'Listando datos',
      status: true,
    };
    setFiles(updateNewFiles);
    projectMutate(mutateProject);
    const resp = await darshanaApi.patch('/projects', projectUpdate);
    if (!resp.status) {
      return;
    }
  };
  const onSubmit = async (values: any) => {
    UpdateFilesPerLink(values);
  };
  return (
    <div className={`card ${styles.projectFilesContainer}`}>
      <div className={styles.projectFilesTable}>
        <table>
          <thead>
            <tr>
              <th>{tb('name')}</th>
              <th>{tb('upload-date')}</th>
              <th>{tb('owner')}</th>
              <th>{tb('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {files &&
              files.map((file) => (
                <tr key={nanoid()}>
                  <td>
                    <div className={styles.file}>
                      <Image
                        className={styles.fileLogo}
                        src={file.icon}
                        width={24}
                        height={24}
                        alt="Corporación"
                      />
                      <div className={styles.fileDescription}>
                        <h3 className={`text-16 c-1 ${styles.fileName}`}>
                          {file.name}
                        </h3>
                        <p className={`text-14 c-2 ${styles.fileSize}`}>
                          {file.size}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{file.uploadDate}</td>
                  <td>{file.owner}</td>
                  <td>
                    <div className={styles.icons}>
                      <i>
                        <Image
                          src={'/images/icons/download.svg'}
                          width={16}
                          height={16}
                          alt="Darshana"
                          onClick={() => downloadFile(file.link, file.name)}
                        />
                      </i>
                      {isOwner && (
                        <i>
                          <Image
                            src={'/images/icons/trash.svg'}
                            width={16}
                            height={16}
                            alt="Darshana"
                            onClick={() => remove(file)}
                          />
                        </i>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {isVisible && !isFinishProject && (
        <div className={styles.projectFilesUpload}>
          <h1 className="text-16">
            <strong>{tb('upload-files')}</strong>
          </h1>
          <FormProvider {...methods}>
            <form>
              <DropFile
                placeholder={tb('upload-message')}
                acceptTypeFiles={{
                  'image/*': ['.png', '.jpeg', '.jpg'],
                  'application/*': ['.pdf', '.docx', '.txt'],
                  // 'application/octet-stream': ['.pdf', '.docx', '.txt'],
                }}
                name="filesUpdate"
                type="files"
                translationCommon={t}
                project={projects}
                projectMutate={projectMutate}
              />
            </form>
          </FormProvider>
        </div>
      )}
      {isVisible && !isFinishProject && (
        <div className={styles.projectFilesLink}>
          <h1 className="text-16 c-2">{tb('upload-link')}</h1>
          <FormProvider {...methodsAddFileLink}>
            <form onSubmit={methodsAddFileLink.handleSubmit(onSubmit)}>
              <div className={styles.inputLink}>
                <CInput
                  name="nameLink"
                  label={tb('nameLink')}
                  placeholder={tc('write-here')}
                />
                <CInput
                  name="fontLink"
                  label={tb('fontLink')}
                  placeholder={tc('write-here')}
                />
                <CInput
                  name="inputLink"
                  label={tb('link')}
                  placeholder={tb('paste-link')}
                  type="url"
                />
                <CButton
                  classNameButton="btn btn--primary btn--full"
                  loading={methodsAddFileLink.formState.isSubmitting}
                  label={tc('add')}
                  type="submit"
                />
              </div>
            </form>
          </FormProvider>
        </div>
      )}
      <div className={styles.projectfilesMobile}>
        {files &&
          files.map((file) => (
            <div key={nanoid()} className={styles.fileContainer}>
              <div className={styles.separator} />
              <div className={styles.fileRow}>
                <div className={styles.row}>
                  <Image
                    className={styles.fileLogo}
                    src={file.icon}
                    width={24}
                    height={24}
                    alt="Corporación"
                  />
                  <div className={styles.fileDescription}>
                    <h3 className={`text-16 c-1 `}>{file.name}</h3>
                    <p className={`text-14 c-2 `}>{file.size}</p>
                  </div>
                </div>
                <div className={styles.icons}>
                  <i>
                    <Image
                      src={'/images/icons/trash.svg'}
                      width={32}
                      height={32}
                      alt="Darshana"
                      onClick={() => remove(file)}
                    />
                  </i>
                </div>
              </div>

              <div className={styles.fileRow}>
                <div>Fecha de Publicación:</div>
                <div>{file.uploadDate}</div>
              </div>
              <div className={styles.fileRow}>
                <div>Propietario:</div>
                <div>{file.owner}</div>
              </div>

              <div
                className={styles.download}
                onClick={() => downloadFile(file.link, file.name)}
              >
                <button className="btn btn--stroke">Descargar</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default ProjectFiles;
