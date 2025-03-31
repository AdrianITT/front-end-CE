import { Api_Host } from "../api";


export const createMuestra = (data) => Api_Host.post('/campo/muestra/', data);