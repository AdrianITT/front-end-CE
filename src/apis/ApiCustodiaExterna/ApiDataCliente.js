import { Api_Host } from "../api";


export const getDataClienteById = (id) => Api_Host.get(`/cliente-por-cotizacion/${id}/`);
