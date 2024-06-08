import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export const CTextArea = React.memo(
  (props: any) => {
    const {
      name,
      label,
      classNameLabel = 'form-label',
      classNameDiv = 'form-group',
      classNameTextArea = 'form-control',
      options = [],
      valueName,
      ...rest
    } = props;

    const { register, formState, watch } = useFormContext();
    const watchTextAreaPermit = watch('summary') || watch('description');
    return (
      <div className={classNameDiv}>
        <label className={classNameLabel}>{label}</label>
        <textarea
          className={`${classNameTextArea} ${
            formState.errors[name] && 'border-error'
          }`}
          rows={4}
          {...register(name)}
          {...rest}
        ></textarea>

        <div className="message-error">
          <ErrorMessage errors={formState.errors} name={name} />
        </div>
        <p style={{ textAlign: 'right' }}>
          {watchTextAreaPermit && `${watchTextAreaPermit.length}/255`}
        </p>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.formState?.isDirty === nextProps.formState?.isDirty,
);

CTextArea.displayName = 'CTextArea';
