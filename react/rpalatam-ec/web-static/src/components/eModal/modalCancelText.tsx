import React from 'react'

const cancelationDataText = {
  elcomercio: {
    initialize: () => (
      <>
        <p>
          <b>
            Queremos que sepas que gracias a tu suscripción podemos reforzar
            nuestro compromiso con el periodismo de calidad.
          </b>
        </p>
        <p>
          Nuestro trabajo periodístico va más allá de mantenerte informado.
          Queremos darte una opción de análisis para que tomes decisiones a
          través de contenidos exclusivos y notas de valor agregado
          especialmente creados para ti.
        </p>
        <p>
          Gracias a lectores como tú renovamos a diario nuestro deber con la
          información veraz y confiable que nos permiten mantener más de 180
          años de trayectoria.
        </p>
      </>
    ),
    benefits: () => (
      <>
        <p>
          <b>¿De qué te perderás si cancelas tu suscripción?</b>
        </p>
        <p>
          Acceso exclusivo a reportajes, entrevistas, artículos de opinión,
          suplementos, informes y la mejor selección de historias elaboradas por
          El Comercio, todo creado especialmente para ti.
        </p>
        <p>Navegación ilimitada desde todos tus dispositivos.</p>
      </>
    ),
  },
  gestion: {
    initialize: () => (
      <>
        <p>
          Lamentamos mucho que estés por tomar la decisión de cancelar tu
          suscripción con Gestión y quieras dejar de formar parte de nuestro
          selecto grupo de suscriptores.
        </p>
        <p>
          Durante todo el tiempo que estás con nosotros, un experimentado equipo
          de 50 periodistas trabaja intensamente para ofrecerte primicias y una
          selección de las noticias más importantes de economía y negocios del
          Perú y el mundo, lo que incluye a alrededor de 600 artículos mensuales
          Plus G exclusivos para suscriptores.
        </p>
      </>
    ),
    benefits: () => (
      <>
        <p>
          <b>¿De qué te perderás si cancelas tu suscripción?</b>
        </p>
        <p>Contenido premium Plus G exclusivo para suscriptores</p>
        <p>
          Lectura ilimitada del contenido abierto desde todos tus dispositivos.
        </p>
        <p>
          La mejor selección de artículos e informes elaborados por el diario
          Gestión, The Economist y la agencia Bloomberg.
        </p>
      </>
    ),
  },
}

export default cancelationDataText
