import { NextPage } from "next";
import { Layout } from "../../components/layouts";
import styles from "./controlBML.module.scss";

const ControlBML: NextPage = () => {
  return (
    <Layout>
      <>
        <header>
          <h1 className={styles["header__title"]}>
            Mapa de controles de ciberseguridad para tarjetas de pago
          </h1>
          <h2 className={styles["header__title-2"]}>
            Conozca la madurez actual de su organización en temas
            deciberseguridad para sus tarjetas de pago
          </h2>
        </header>

        <section className={styles["card"]}>
          <h1>
            Antes de utilizar la herramienta es importante saber lo siguiente
          </h1>
          <h2>
            El mapa de controles será medido por niveles mediante los siguientes
            criterios:
          </h2>

          <div className={styles["flex"]}>
            <p className={styles["nivel-1"]}>Nivel 1 (Inicial): </p>
            <p className={styles["description"]}>
            &nbsp;Las condiciones de los controles están definidos pero no
              formalizados. Se cumplen insastisfactoriamente.
            </p>
          </div>
          <div className={styles["flex"]}>
            <p className={styles["nivel-2"]}>Nivel 2 (En desarrollo):  </p>
            <p className={styles["description"]}>
            &nbsp;Existe una documentación de los controles, sin embargo, se
              encuentran en desarrollo. Se cumple aceptablemente.
            </p>
          </div>
          <div className={styles["flex"]}>
            <p className={styles["nivel-3"]}>Nivel 3 (Definido):  </p>
            <p className={styles["description"]}>
            &nbsp;Las condiciones de los controles están operando, existe evidencia
              documental de su cumplimiento. Se cumple en alto grado.
            </p>
          </div>
          <div className={styles["flex"]}>
            <p className={styles["nivel-4"]}>Nivel 4 (Gestionado):  </p>
            <p className={styles["description"]}>
            &nbsp;Las condiciones del control se encuentran en operación. Existe
              evidencia documental de su eficiencia y eficacia. Por lo que se
              cumple plenamente.{" "}
            </p>
          </div>
          <div className={styles["flex"]}>
            <p className={styles["nivel-5"]}>Nivel 5 (Optimizado):  </p>
            <p className={styles["description"]}>
            &nbsp;Las condiciones de los controles están en un proceso de mejora
              continua. Existe evidencia documental de auditorías internas y
              externas que evalúan su eficiencia y eficacia.
            </p>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default ControlBML;
