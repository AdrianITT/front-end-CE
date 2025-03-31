// src/hooks/useCotizacionesData.js
import { useState, useEffect } from "react";
import { getAllcotizacionesdata } from "../../../apis/ApisServicioCliente/CotizacionApi";

export const useCotizacionesData = (organizationId) => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Llamada a la API que ya retorna todos los datos listos para la tabla
        const response = await getAllcotizacionesdata(organizationId);
        console.log("getAllcotizacionesdata:", response.data);
        // Guardamos la data (o un arreglo vacío si no hay resultados)
        setCotizaciones(response.data || []);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Solo cargamos datos si existe organizationId (si lo necesitas)
    if (organizationId) {
      fetchData();
    }
  }, [organizationId]);

  return { cotizaciones, isLoading };
};
