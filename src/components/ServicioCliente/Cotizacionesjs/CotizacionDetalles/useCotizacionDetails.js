import { useState, useEffect } from "react";
import { getDetallecotizaciondataById, getCotizacionById } from "../../../../apis/ApisServicioCliente/CotizacionApi";

export const useCotizacionDetails = (id) => {
  const [cotizacionInfo, setCotizacionInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [servicios, setServicios] = useState([]);
  const [AllCotizacion, setalldata] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getDetallecotizaciondataById(id);
      const data = response.data;
        console.log("data: ", data);
      // Puedes darle formato si lo necesitas
      setCotizacionInfo({
        ...data,
        clienteNombre: data.cliente?.nombreCompleto,
        clienteDireccion: data.cliente?.direccion,
        empresaNombre: data.empresa?.nombre,
        empresaDireccion: data.empresa?.direccion,
        moneda: data.tipoMoneda,
        estado: data.estado,
        iva: data.iva,
        infoSistema: data.infoSistema,
        cotizacionServicio: data.cotizacionServicio,
        totales: data.valores,
        correo: data.cliente.correo,
      });
      // 🔥 AQUÍ extraes los servicios
      setServicios(data.cotizacionServicio || []);
      const respons2= await getCotizacionById(id);
      const datas = respons2.data;
      setalldata({...datas});
    } catch (error) {
      console.error("❌ Error al obtener detalles de cotización:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  return {
    cotizacionInfo,
    loading,
    servicios,
    AllCotizacion,
    refetch: fetchData,
  };
};
