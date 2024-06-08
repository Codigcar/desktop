import styles from './AButton.module.scss';

export const AButton = (props: any) => {
  const { text, loading, action, disable, outline, ...rest } = props;
  
  return (
    <div className={styles.container} >
      <button
        className={`${styles['button__save']} ${(disable || loading) && 'disable'}`}
        disabled={disable || loading}
        {...rest}
      >
        { loading ? (<div className={`loader`}></div>) : (text)}
      </button>
    </div>
  );
};
