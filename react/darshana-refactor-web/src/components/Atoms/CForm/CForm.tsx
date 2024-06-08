import React from 'react';

export const CForm = React.memo((props: any) => {
  const { formState, register, handleSubmit, children, onSubmit, control, className="form" } = props;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className={className}
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
})

CForm.displayName = 'CForm';

