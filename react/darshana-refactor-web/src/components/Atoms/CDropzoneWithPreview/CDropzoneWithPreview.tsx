import { ErrorMessage } from "@hookform/error-message";
import { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import BeatLoader from "react-spinners/BeatLoader";
import { useFormContext } from "react-hook-form";

import { css } from "@emotion/react";
import { uploadImage } from '@api/uploadImage';

import {BiImageAdd} from "react-icons/bi";
import styles from './CDroponeWithPreview.module.scss';
import { sizeInMb } from "@utils";

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
)

const CDropzoneWithPreview = (props: any) => {
  const {
    width = "90%",
    height = "200",
    style,
    label,
    styleContainer,
    name,
    maxSize = 3150000,
    ...rest
  } = props;
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [failedImages, setFailedImages] = useState<any>([]);

  const { register, formState, setValue, watch } = useFormContext();

  useEffect(() => {
    if (typeof watch(`${name}`) === "string") {
      setImagePreview(watch(`${name}`));
    }
  }, []);


  const uploadImageFetch = async (image: any) => {
    setLoading(true);
    try {
      const resp = await uploadImage(image);

      if (resp) {
        setImagePreview(resp);
        setValue(`${name}`, resp);
        setLoading(false);
        return resp;
      }
      if (!resp) {
        console.error('Error al subir la imagen');
        setLoading(false);
        return null;
      }
    } catch (error) {
      console.error({ error });
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setValue(`${name}`, "");
  };

  return (
    <div style={styleContainer}>
      <div
        className={`${styles['container-dropzone']} ${styles['card']} `}
      >
        {imagePreview === "" && (
          <div className={`${styles['flex-center']}  `}>

            {
                loading ?
                (
                    <div className={styles.loading} >
                        <BeatLoader
                            color={'#1a3447'}
                        />
                    </div>
                ) : (
                    <>
                        <input
                            className={`${styles['file-upload-input']}`}
                            type="file"
                            id={name}
                            accept="image/*, application/pdf"
                            multiple
                            {...register(name)}
                            onChange={async (e: any) => {
                              const {name, size} = e.target.files[0];

                              if(size < maxSize){
                                setFailedImages([]);
                                uploadImageFetch(e.target.files[0]).then((resp: any) => {
                                });
                              } else {
                                setFailedImages([{
                                  name,
                                  size
                                }])
                              }

                            }}
                        />
                        <div className={styles.contain}>
                            <BiImageAdd size={20} />
                            <label htmlFor={name}>
                                {label}
                            </label>
                        </div>
                    </>
                )
            }
          </div>
        )}
        {imagePreview.length > 0 && (
          <img src={imagePreview} width={width} height={height} style={style} />
        )}
        {/* {!imagePreview && (
          <div className="error-message w-100">
            <ErrorMessage errors={formState.errors} name={name} />
          </div>
        )} */}
        <div>
          {imagePreview  && (
            <div style={{ position:'absolute', top:0, right: 0, marginTop:-10, marginRight: -10, cursor:'pointer' }}>
                <IoIosCloseCircle
                    className="delete"
                    size={30}
                    color={"#DA1E28"}
                    onClick={removeImage}
                />
            </div>
          )}
        </div>

      </div>
      {
            failedImages.length > 0 &&
            (
              <ErrorMessageFile>
                {failedImages[0].name} ({sizeInMb(failedImages[0].size)} {'Mb'}) {'X'}
              </ErrorMessageFile>
            )
          }
    </div>
  );
};

export default CDropzoneWithPreview;
