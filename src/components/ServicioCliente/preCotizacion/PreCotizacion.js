import React, { useState, useEffect } from "react";
import { Table, Button, Space, message, Input } from "antd";
import { Link } from "react-router-dom";
import { FileTwoTone, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import "./PrecotizacionData.css";
//import { getAllPrecotizacion } from "../../apis/ApisServicioCliente/PrecotizacionApi";
import {getAllPrecotizacion} from "../../../apis/ApisServicioCliente/PrecotizacionApi";
import {getAllEstado} from "../../../apis/ApisServicioCliente/EstadoApi";

const PreCotizacionData = () => { 
  const [preCotizaciones, setPreCotizaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [estados, setEstados] = useState({});

  // Obtener el ID de la organización del usuario desde el local storage
  const organizationId = parseInt(localStorage.getItem("organizacion_id"), 10);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 🔹 Obtener estados
        const estadosResponse = await getAllEstado();
        const estadosMap = estadosResponse.data.reduce((acc, estado) => {
          acc[estado.id] = estado.nombre; // Mapea { 1: "Pendiente", 2: "Aprobado", etc. }
          return acc;
        }, {});

        setEstados(estadosMap);

        // 🔹 Obtener pre-cotizaciones
        const response = await getAllPrecotizacion();
        const filteredPreCotizaciones = response.data.filter(
          (item) => item.organizacion === organizationId &&
            (item.estado !== 7 || item.estado !== 8) // 🔹 Filtrar pre-cotizaciones canceladas o rechazadas
        );

        const data = filteredPreCotizaciones.map((item) => ({
          key: item.id,
          id: item.id,
          cliente: `${item.nombreCliente} ${item.apellidoCliente}`,
          empresa: item.nombreEmpresa,
          estado: estadosMap[item.estado] || "Desconocido", // 🔹 Mostrar nombre del estado
        }));

        setPreCotizaciones(data);
      } catch (error) {
        message.error("Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [organizationId]);

  // Definir las columnas de la tabla
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 80,
      sorter:(a, b) => a.id - b.id,
    },
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Buscar cliente"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()} // Filtrar al presionar Enter
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
           <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: "100%" }}
          >
            Buscar
          </Button>
        </div>
          ),
          onFilter: (value, record) =>
            record.cliente.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Empresa",
      dataIndex: "empresa",
      key: "empresa",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      filters: [
        { text: "Validado", value: "Validado" },
        { text: "No validado", value: "No validado" },
      ], // 🔹 Filtro basado en los nombres de los estados
      onFilter: (value, record) => record.estado === value,
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space>
          <Link to={`/preCotizacionDetalles/${record.id}`}>
            <Button type="primary" icon={<FileTwoTone />} />
          </Link>
        </Space>
      ),
      width: 150,
    },
  ];

  return (
    <div className="container">
      <h1 className="title">Pre-Cotizaciones</h1>

      <div className="button-container">
        <Link to="/CrearPreCotizacion">
          <Button type="primary" icon={<PlusOutlined />}>
            Añadir Pre-Cotización
          </Button>
        </Link>
      </div>

      <Table 
        className="custom-table"
        columns={columns} 
        dataSource={preCotizaciones} 
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }} 
        bordered
      />
    </div>
  );
};

export default PreCotizacionData;
