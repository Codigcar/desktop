import axios from "axios";

const BASE_URL = "http://localhost:8080";

const apiInstance = axios.create({ baseURL: BASE_URL });

apiInstance.interceptors.request.use(
  (request) => {
    request.headers["IP"] = "IP_DEL_COMPUTADOR";
    return request;
  },
  (err) => err
);

apiInstance.interceptors.response.use(
  (response) => response,
  (err) => { 
    if(!err.response) {
      return Promise.reject({
        status: 999,
        timestamp: new Date(),
        message: "Se ha producido un error inesperado",
        error: "Error inesperado"
      });
    }
    return Promise.reject(err.response.data);
  }
);


export default apiInstance;
