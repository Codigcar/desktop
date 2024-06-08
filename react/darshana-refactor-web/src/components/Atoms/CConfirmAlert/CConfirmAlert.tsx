import React from 'react';
import styles from './CConfirmAlert.module.scss';

export const CConfirmAlert = React.memo((props: any) => {
  const { title, message, buttons, onClose } = props;
  const buttonList = [];
  for (const item of buttons){
    buttonList.push(<button
      onClick={() => {
        item.action();
        onClose();
      }}
      key={item.key ? item.key : item.index}
    >
      {item.label}
    </button>);
  }

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <br></br>
      <p>{message}</p>
      <br></br>
      {buttonList}
    </div>
  );
});

CConfirmAlert.displayName = 'CConfirmAlert';
