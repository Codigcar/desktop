import { FC } from "react";
import Head from "next/head";
import { Footer, Navbar } from "../../shared/components";
import styles from "./Layout.module.scss";

interface Props {
  children: JSX.Element;
  title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "BML"}</title>
        <meta name="author" content="BML" />
        <meta name="description" content="BML" />
        <meta name="keywords" content="BML" />
        
   
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
        <script src="path/to/chartjs-plugin-annotation/dist/chartjs-plugin-annotation.min.js"></script> */}
      </Head>
      <div className={styles.container}>
        <div>
          <Navbar />
        </div>
        <div className={styles.body}>
          <main>{children}</main>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};
