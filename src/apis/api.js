import axios from "axios";
import { Api_Hosting } from "./ApiHost";

export const Api_Host = axios.create({
  baseURL: `${Api_Hosting}api`
});

// Interceptor para agregar el token a cada solicitud
Api_Host.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
