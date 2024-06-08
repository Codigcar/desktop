import { NextPage } from "next";
import React from "react";
import { Layout } from "../../components/layouts";
import { RepositoryMenu } from "../../components/ui";
import styles from "./repository.module.scss";
import { GetServerSideProps } from "next";
import { fetchCustom } from "../../utils/fetchCustom";

const repositorio: NextPage = ({data}:any) => {

  
  const Extranjeras = data.filter((item:any) => item.category == "Regulación Extranjera");
  
  const Locales = data.filter((item:any) => item.category == "Regulación Local");

  

  return (
    <Layout>
      <>
        <header>
          <h1 className={styles["header__title"]}>
            Mapa de controles de ciberseguridad para tarjetas de pago
          </h1>

          <h2 className={styles["header__title-2"]}>
            EN ESTA SECCIÓN PODRÁS VISUALIZAR TODA LA INFORMACIÓN ANALIZADA EN
            BML CONTROLS SEPARADOS POR SU CATEGORÍA.
          </h2>
        </header>

        <section style={{background:'#3C0D77', padding: 30, borderRadius:15  }} >
          <RepositoryMenu data={Extranjeras} nameCategory={"Regulación Extranjera"} />
          <br/>
          <RepositoryMenu data={Locales} nameCategory={"Regulación Local"} />
        </section>
      </>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // const { data } = await  // your fetch function here
  // console.log({ctx});
  // console.log(ctx.params);

  // const { id } = params as { id: string };

  const data = await fetchCustom(`/files`);

  // if (!graphics) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      data,
    },
  };
};

export default repositorio;
