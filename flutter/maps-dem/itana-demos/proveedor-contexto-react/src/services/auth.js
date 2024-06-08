import { KEY_SESSION } from "../context/session-context";

const AuthService = {
  login: (usuario, password) =>
    new Promise((resolve, reject) => {
      let session = {
        codUsuario: 'VPORRAS',
        nombre: 'Victor Porras Perez',
        correo: 'vporras@gmail.com',
        urlAvatar: 'https://static1.abc.es/media/summum/2021/10/01/maxi_iglesias-kXKH--620x349@abc.jpeg',
     };
     setTimeout(() =>{
      sessionStorage.setItem(KEY_SESSION, JSON.stringify(session));
      resolve("ok")
     }, 1000);
     
  }),
  logout: () => {
    sessionStorage.removeItem(KEY_SESSION);
  },
};

export default AuthService;
