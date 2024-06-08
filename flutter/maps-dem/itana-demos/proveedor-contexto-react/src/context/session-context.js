import React, { useEffect, useState } from 'react';

export const KEY_SESSION = "session";

const SessionContext = React.createContext({
  codUsuario: '',
  nombre: '',
  correo: '',
  urlAvatar: ''
});

export default SessionContext;

export const SessionContextProvider = (props) => {
  const [session, setSession] = useState({
    codUsuario: '',
    nombre: '',
    correo: '',
    urlAvatar: ''
  });
  
  useEffect(() => {
    const infoSession = JSON.parse(sessionStorage.getItem(KEY_SESSION));
    if (infoSession) {
      setSession(infoSession);
    }
  }, []);

  return (
    <SessionContext.Provider value={{ 
      codUsuario: session.codUsuario, 
      nombre: session.nombre, 
      correo: session.correo, 
      urlAvatar: session.urlAvatar }}>
      {props.children}
    </SessionContext.Provider>
  );
};
  
  