import { Api_Host } from "../api";
export const getAlldataordentrabajo = async (id) => Api_Host.get(`/dataordentrabajo/${id}/`);