import { Api_Host } from "../api";

export const getAllCustodiaExterna = () => Api_Host.get('/campo/custodiaexterna/');
export const createCustodiaExterna = (data) => Api_Host.post('/campo/custodiaexterna/', data);
export const getCustodiaExternaById = (id) => Api_Host.get(`/campo/custodiaexterna/${id}/`);