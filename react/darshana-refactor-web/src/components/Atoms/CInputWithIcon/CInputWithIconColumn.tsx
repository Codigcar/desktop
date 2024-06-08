import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

export const CInputWithIconColumn = (props: any) => {
  const {
    name,
    label,
    placeholder,
    classNameLabel = 'form-label',
    classNameInput = 'form-control icon',
    classNameDiv = 'form-group',
    classNameDivIcon = 'input-icon icon-left',
    imageUrl = '',
    disable = false,
    showImageIcon = true,
    icon = '',
    ...rest
  } = props;
  const { register, formState } = useFormContext();

  return (
    <>
      <div className={`${classNameDiv} ${disable && 'disable'} `}>
        <div className="flex flex-y-center">
          <label
            className={classNameLabel}
            style={{ margin: 0, paddingRight: '8px' }}
          >
            {label}
          </label>
          <div className={classNameDivIcon}>
            <input
              autoComplete="off"
              className={`${classNameInput} ${
                formState.errors[name] && 'border-error'
              }  `}
              type="text"
              placeholder={placeholder}
              disabled={disable}
              {...register(name)}
              {...rest}
            />
            <i>
              {showImageIcon ? (
                <Image src={imageUrl} width={16} height={16} alt="Darshana" />
              ) : (
                <i>{icon}</i>
              )}
            </i>
          </div>
        </div>
        <div className="message-error">
          <ErrorMessage errors={formState.errors} name={name} />
        </div>
      </div>
    </>
  );
};
