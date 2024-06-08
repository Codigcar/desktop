import "../styles/globals.css";
import type { AppProps } from "next/app";
import styles from "./_app.module.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div className={styles.app}>
        <Component {...pageProps} />
      </div>
  );
}

export default MyApp;
