import { Api_Host } from "../api";

export const getAllCotizacion = () => Api_Host.get('/cotizacion/');

export const updateCotizacion = (id, data) => Api_Host.patch(`/cotizacion/${id}/`, data);

export const createCotizacion = (data) => Api_Host.post('/cotizacion/', data);

export const deleteCotizacion = (id) => Api_Host.delete(`/cotizacion/${id}/`);

export const getCotizacionById = async (id) => Api_Host.get(`/cotizacion/${id}/`);

export const getAllcotizacionesdata = async (id) => Api_Host.get(`/allcotizacionesdata/${id}/`);//`//${id}/`

export const getDetallecotizaciondataById = async (id) => Api_Host.get(`/detallecotizaciondata/${id}/`);

export const getDuplicarCotizacion =(id, idCliente, nombreusuario)=> Api_Host.get(`/duplicarCotizacion/${id}/?cliente=${idCliente}&nombreusuario=${nombreusuario}`);

export const getAllCotizacionByCliente = (id) => Api_Host.get(`/listaClientes/${id}/`);

export const getDataCotizacionBy = (id) => Api_Host.get(`/crearFactura/${id}/`);

export const getIdCotizacionBy = (id) => Api_Host.get(`primera_cotizacion/${id}/`);