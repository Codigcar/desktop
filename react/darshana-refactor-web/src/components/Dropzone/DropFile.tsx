import SyncLoader from 'react-spinners/SyncLoader';
import { css } from '@emotion/react';

import { uploadFile } from '@api/uploadFile';
import { uploadImage } from '@api/uploadImage';
import Image from 'next/image';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import styles from './dropFile.module.scss';
import { ErrorMessage } from '@hookform/error-message';
import { sizeInMb, toastMessage } from '@utils';
import { useTranslation } from 'next-i18next';
import { darshanaApi } from '@api/darshanaApi';
import { AuthContext } from '@contexts/auth';
import i18nConfig from '@constants/i18n';
interface Props {
  placeholder?: string;
  acceptTypeFiles: any;
  name: string;
  type: string;
  maxSize?: number;
  translationCommon: any;
  project?: any;
  projectMutate?: any;
}
interface IDocuments {
  file_name?: string;
  file_url?: string;
  file_size?: number;
}
const defaultProps = {
  placeholder: '',
  type: 'image',
  maxSize: 5240000,
};

// @ts-ignore
const ErrorMessageFile = ({ children }) => (
  <div
    style={{
      fontStyle: 'italic',
      color: 'red',
    }}
  >
    {children}
  </div>
);

const DropFile: FC<Props> = ({
  placeholder,
  acceptTypeFiles,
  name,
  type,
  maxSize,
  translationCommon,
  project,
  projectMutate,
}) => {
  const { t: tc } = useTranslation('common');
  const { t: tv } = useTranslation('validation');
  const { user } = useContext(AuthContext);
  const { register, unregister, formState, setValue, watch, getValues } =
    useFormContext();
  const documents = watch(name);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, i18nConfig] = useTranslation();
  const lang = i18nConfig.language;
  useEffect(() => {
    register(name, {
      required: 'File is required',
      minLength: { value: 1, message: 'minimo' },
    });
    return () => {
      unregister(name);
    };
  }, [register, name, unregister]);
  useEffect(() => {
    if (type === 'file' || type === 'files') {
      setValue(name, documents);
    } else {
      setValue(name, []);
    }
  }, []);
  const remove = (file: any) => {
    const newFiles = [...documents];
    newFiles.splice(newFiles.indexOf(file), 1);
    setValue(`${name}`, newFiles);
  };
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      if (type === 'image' && acceptedFiles[0].size < maxSize!) {
        setIsLoading(true);
        const response = await uploadImage(acceptedFiles[0]);
        setIsLoading(false);
        if (!response) {
          console.error('Error al subir imagen');
          return;
        }
        setValue(`${name}`, [
          {
            file_name: acceptedFiles[0].name,
            file_url: response,
            file_size: acceptedFiles[0].size,
          },
        ]);
      }
      if (type === 'file' && acceptedFiles[0].size < maxSize!) {
        setIsLoading(true);
        const response = await uploadFile(acceptedFiles[0]);
        if (!response) {
          console.error('Error al subir imagen');
          return;
        }
        setIsLoading(false);
        setValue(
          'urlFile',
          `https://darshana-refactor.whiz.pe/api/file/${response.key}`
        );
        setValue(`${name}`, [
          {
            file_name: response?.originalname,
            file_url: response?.key,
            file_size: response?.size,
          },
        ]);
      }
      if (type === 'files') {
        let arrayFiles: any = [];
        let arrayFilesAux: any = [];
        await Promise.all(
          acceptedFiles.map(async (file: File) => {
            if (file.size < maxSize!) {
              setIsLoading(true);
              const response = await uploadFile(file);
              setIsLoading(false);
              if (!response) {
                console.error('Error al subir imagen');
                return;
              }
              arrayFiles.push({
                file_name: response?.originalname,
                file_url: response?.key,
                file_size: response?.size,
                created_at: new Date(),
              });
              arrayFilesAux.push({
                file_name: response?.originalname,
                file_url: response?.key,
                file_size: response?.size,
                created_at: new Date(),
                user: {
                  name: user?.person.name,
                  last_name: user?.person.last_name,
                },
              });
            }
          })
        );
        const UpdateDocuments = [...getValues(name), ...arrayFiles];
        const UpdateDocumentsAux = [...getValues(name), ...arrayFilesAux];
        setValue(`${name}`, UpdateDocumentsAux);
        toastMessage('success', tv('file-success'));
        if (name === 'filesUpdate') {
          const projectUpdate = {
            id: project.id,
            business_id: project.business.id,
            work_modality_id: project.work_modality_id,
            country_id: project.country_id,
            files: UpdateDocuments,
            lang: lang || 'es'
          };
          const resp = await darshanaApi.patch('/projects', projectUpdate);
          if (!resp.status) {
            return;
          }
          projectMutate(resp.data);
        }
      }
    },
    [maxSize, name, setValue, type]
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: acceptTypeFiles,
  });

  const sizeInMb = (bytes: number): string =>
    (bytes / (1024 * 1024)).toFixed(2);
  const files: [] = documents?.map((file: any, index: number) => (
    <li key={index} className={styles.formControl}>
      {file.file_size > maxSize! ? (
        <ErrorMessageFile>
          {'file is too big, try with another file'}
          {file.file_name} {sizeInMb(file.size)} {'Mb'}
        </ErrorMessageFile>
      ) : (
        <>
          <Image
            src="/images/icons/file.svg"
            alt="back"
            width={22}
            height={26}
          />
          <p>
            {file.file_name} - {sizeInMb(file.file_size)} Mb
          </p>
          <Image
            src="/images/icons/trash.svg"
            alt="back"
            width={18}
            height={20}
            onClick={() => remove(file)}
          />
        </>
      )}
    </li>
  ));
  return (
    <>
      <section className={styles.sectionFile}>
        <div {...getRootProps({ className: `${styles.dropzone}` })}>
          <input {...getInputProps({ className: 'inputZone' })} />
          <div>
            {isLoading ? (
              <div className={styles.loading}>
                <SyncLoader color={'#1a3447'} size={15} />
              </div>
            ) : (
              <div className="column">
                <h2>
                  {placeholder || translationCommon('drop-file-message')}{' '}
                  {sizeInMb(maxSize!)} Mb
                </h2>
              </div>
            )}
          </div>
        </div>
        {documents?.length === 0 || name === 'filesUpdate' ? (
          ''
        ) : (
          <aside>
            {!isLoading && <ul className={styles.listFile}>{files}</ul>}
          </aside>
        )}
      </section>
      <div className="message-error">
        {documents?.length === 0 && (
          <ErrorMessage errors={formState.errors} name={name} />
        )}
      </div>
    </>
  );
};

DropFile.defaultProps = defaultProps;

export default DropFile;
