import React from 'react'
import EError from './../../components/eError'

const NoMatch: React.FC = () => {
  return (
    <div>
      <EError
        title="Página perdida"
        content="No hemos encontrado la página que buscabas, pero te invitamos a
            visitar alguna de nuestras secciones:"
      />
    </div>
  )
}

export default NoMatch
