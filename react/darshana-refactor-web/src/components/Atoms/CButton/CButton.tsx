import React from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const CButton = React.memo((props: any) => {
  const { label, loading, disable, classNameDiv = '', classNameButton = '', colorSpinner="#f1f0eb", ...rest } = props;
  return (
    <div className={classNameDiv}>
      <button
        className={`${classNameButton} ${(disable || loading) && 'disable'}`}
        disabled={disable || loading}
        {...rest}
      >
        {loading ? <BeatLoader
                color={colorSpinner}
                loading={true}
                css={override}
                size={15}
              /> : label}
      </button>
    </div>
  );
});

CButton.displayName = 'CButton';
