import React from 'react';
import style from './MForm.module.scss';

const MForm = (props: any) => {
  const { formState, register, handleSubmit, children, onSubmit, control } =
    props;
  // const { handleSubmit, handleSubmit } = useForm({ defaultValues });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className={style.container}
    >
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    formState,
                    control,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
};

export default MForm;
