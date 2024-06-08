import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/router';

export const CCheckbox = React.memo(
  (props: any) => {
    const {
      name,
      label,
      id = 'keep-logged-in',
      classNameInput = 'form-box-check',
      classNameDiv = "form-group-check",
      ...rest
    } = props;
    const { register, formState } = useFormContext();
    const router = useRouter()
    return (
      <>
        <div className={classNameDiv}>
          <input
            className={classNameInput}
            type="checkbox"
            {...register(name)}
            {...rest}
          ></input>
          <label htmlFor="keep-logged-in" className="form-label-check" onClick={()=>{

            if(name==="checkboxTerms"){
              if (typeof window !== 'undefined') {
                const hostname = window.location.origin;
                window.open(`${hostname}/terms-conditions`, '_blank');
              }
              // router.push("/terms-conditions")
            }
          }}>
            {label}
          </label>
        </div>
        <div className="message-error">
          <ErrorMessage errors={formState.errors} name={name} />
        </div>
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.formState?.isDirty === nextProps.formState?.isDirty
);

CCheckbox.displayName = 'CCheckbox';
