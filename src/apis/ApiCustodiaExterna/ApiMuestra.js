import { Api_Host } from "../api";


export const createMuestra = (data) => Api_Host.post('/campo/muestra/', data);

export const getMuestraById = (id) => Api_Host.get(`/campo/muestra/${id}/`);