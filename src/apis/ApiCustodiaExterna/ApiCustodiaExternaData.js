import { Api_Host } from "../api";


export const getCustodiaExternaDataById = (id) => Api_Host.get(`/campo/custodiaexternadata/${id}/`);