import type { NextPage } from "next";
import Image from "next/image";
import styles from "./home.module.scss";
import { AButton } from "../../components/atom/button/AButton";
import { Layout } from "../../components/layouts";
import { useRouter } from "next/router";

const Home: NextPage = () => {
    const router = useRouter();

    return (
        <Layout title="BML">
          <>
            <h1 className={styles["home__title"]}>
              ¡Bienvenido!
            </h1>
            <div className={styles["home__cards"]}>
              <div className={styles["home__cards__card"]}>
                <div className={styles["home__cards__card-text"]}>
                  <p>INICIA UNA NUEVA MEDICIÓN DE NIVEL DE MADUREZ</p>
                  <AButton
                    loading={false}
                    text="Control BML"
                    style={{ width: "100%" }}
                    onClick={() => {
                      router.push("/darshboard/form")
                    }}
                  />
                </div>
                <div className={styles["home__cards__card-img"]}>
                  <Image src={"/imgs/home-1.png"} width={500} height={500} alt="imagen"></Image>
                </div>
              </div>
              <div className={styles["home__cards__card"]}>
                <div className={styles["home__cards__card-text"]}>
                  <p>PUEDES REVISAR TUS ÚLTIMOS RESULTADOS AQUÍ</p>
                  <AButton
                    loading={false}
                    text="Mis Resultados"
                    style={{ width: '100%' }}
                    onClick={() => {
                      router.push(`/darshboard/${localStorage.getItem("id") || ''}`)
                    }}
                  />
                </div>
                <div className={styles["home__cards__card-img"]}>
                  <Image src={"/imgs/business.png"} width={500} height={500} style={{borderRadius:60}} alt="imagen"></Image>
                </div>
              </div>
            </div>
          </>
        </Layout>
      );
};

export default Home;

