import React from "react";
import { NextPage } from "next";
import styles from "./about.module.scss";
import { Layout } from "../../components/layouts";
import Image from "next/image";

const About: NextPage = () => {
  return (
    <Layout>
      <div style={{ marginBottom: 100 }}>
        <header>
          <h1 className={styles["header__title"]}>ACERCA DE NOSOTROS...</h1>
        </header>

        <section className={styles["card"]}>
          <h2 className={styles["card__title"]}>
            BML Controls nace como un proyecto creado por dos estudiantes
            universitarios de la universidad peruana de ciencias aplicadas
            (upc). CON LA MOTIVACIÓN DE CREAR UN MODELO CAPAZ DE MEDIR LA
            MADUREZ BANCARIA DE LOS CONTROLES ACTUALES Y SER CAPACES DE
            OPTIMIZARLA.
          </h2>

          <h2 className={styles["card__title"]}>
            Para llegar a lo que ahora somos, se tuvieron que pasar por tres
            fases, siendo:
          </h2>

          <ul className={styles.indicaciones}>
            <li>
              La investigación de los procesos de pago con tarjetas de pago.{" "}
            </li>
            <li>
              Búsqueda y análisis de las CONTROLES, políticas Y regulaciones a
              nivel nacional e internacional.
            </li>
            <li>
              DESARROLLO DEL MODELO DE MAPA DE CONTROLES CON SU NIVEL DE MADUREZ
              PARA LAS REGULACIONES NACIONALES E INICIATIVAS EXTRANJERAS. tras
              estas fases, finalmente nació bml controls
            </li>
          </ul>

          <h2 className={styles["card__title"]}>
            TRAS ESTAS FASES, FINALMENTE NACIÓ BML CONTROLS
          </h2>
          <div style={{ display: "flex", marginTop: 50 }}>
            <div style={{ marginRight: 30 }}>
              <Image
                src={"/imgs/bml-footer.png"}
                width={240}
                height={240}
                objectFit="contain"
                alt="imagen"
              />
            </div>
            <div>
              <h1 style={{ fontSize: 30 }}>BML Controls -</h1>
              <h1 style={{ fontSize: 30 }}>Mide la madurez</h1>
              <h1 style={{ fontSize: 30 }}>de tus tecnologias</h1>
            </div>
          </div>
        </section>

        <section
          className={`${styles["card"]} ${styles["flex-x-center"]}`}
          style={{
            textAlign: "center",
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 className={styles["card__title"]} style={{ fontSize: 30 }}>
            CONOCE AL EQUIPO DETRÁS DE <br />
            BML CONTROLS
          </h2>
          <div
            className={styles["flex-x-center"]}
            style={{ textAlign: "center", display:'flex', justifyContent:'space-evenly' }}
          >
            <div>
              <Image
                src={"/imgs/pj2.jpeg"}
                width={180}
                height={180}
                alt="imagen"
                style={{ borderRadius:'50%', objectFit:'cover' }}
              ></Image>
              <h1>
                Ian Vallejos <br/>
                Ingeniero de Sistemas <br />
                Project Manager
              </h1>
            </div>
            <div>
              <Image
                src={"/imgs/pj1.jpg"}
                width={180}
                height={180}
                alt="imagen"
                style={{ borderRadius:'50%', objectFit:'cover' }}
              ></Image>
              <h1>
                Mauricio De La Flor <br />
                Ingeniero de Sistemas <br />
                Scrum Master
              </h1>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
