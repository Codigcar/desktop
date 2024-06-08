import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import {useTranslation} from "next-i18next";

export const CSelectLocation = React.memo((props: any) => {
  const { t: tc } = useTranslation('common');
  const {
    name,
    label,
    placeholder = tc('select-value'),
    classNameLabel = 'form-label',
    classNameSelect = 'form-control form-select',
    classNameDiv = 'form-group',
    options = [],
    valueName ,
    ...rest
  } = props;

  const { register, formState } = useFormContext();
  return (
    <div className={`${classNameDiv} 'border-error'`}>
      <label className={classNameLabel}>{label}</label>
      <select className={`${classNameSelect}`} {...register(name)} {...rest} >
          <option key={-1} value={0}>
              {placeholder}
          </option>
        {options.map((value: any) => (
            <option key={value.name} value={value[`${valueName}`]}>
              {value[`${valueName}`]}
            </option>
        ))}
      </select>
      <div className="message-error">
        <ErrorMessage errors={formState.errors} name={name} />
      </div>
    </div>
  );
}
);

CSelectLocation.displayName = 'CSelect';
