import React, { useEffect, useState } from "react";
//import "./index.css";
import "./App.css";
import { Card, Col, Row, Badge, Space, Progress } from "antd";
import { getAllCotizacion } from "./apis/ApisServicioCliente/CotizacionApi";
import { getAllCliente } from "./apis/ApisServicioCliente/ClienteApi";
import { getAllEmpresas } from "./apis/ApisServicioCliente/EmpresaApi";
import { getAllContarCotizaciones } from "./apis/ApisServicioCliente/contarcotizacionesAp";
import {
  ReconciliationOutlined,
  SettingOutlined,
  UserAddOutlined,
  AuditOutlined,
  ClearOutlined,
  ShopFilled,
  UsergroupAddOutlined,
  EditOutlined,
  ThunderboltTwoTone,
  DollarTwoTone,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
//prueba
const App = () => {
  const [countCotizaciones, setCountCotizaciones] = useState(0);
  const [totalCotizaciones, setTotalCotizaciones] = useState(0);
  const [cotizacionesAceptadas, setCotizacionesAceptadas] = useState(0);
  const [contarCotizaciones, setContarCotizaciones] = useState(0);

  useEffect(() => {
    console.log(getAllContarCotizaciones);
    const fetchCount = async () => {
      try {
        // Obtén el ID de la organización del usuario desde localStorage
        const organizationId = parseInt(localStorage.getItem("organizacion_id"), 10);

        // Realiza las peticiones a las APIs: cotizaciones, clientes y empresas
        const [cotResponse, clientesResponse, empresasResponse, ContarCotizaciones] = await Promise.all([
          getAllCotizacion(),
          getAllCliente(),
          getAllEmpresas(),
          getAllContarCotizaciones(),
        ]);

        const cotizaciones = cotResponse.data || [];
        const clientes = clientesResponse.data || [];
        const empresas = empresasResponse.data || [];
        //const Cc=
        //console.log(ContarCotizaciones.data);
        setContarCotizaciones(ContarCotizaciones.data);

        // Filtrar las empresas que pertenecen a la organización actual
        const filteredEmpresas = empresas.filter(
          (empresa) => empresa.organizacion === organizationId
        );

        // Filtrar los clientes que pertenecen a una de las empresas filtradas
        const filteredClientes = clientes.filter((cliente) =>
          filteredEmpresas.some((empresa) => empresa.id === cliente.empresa)
        );

        // Filtrar las cotizaciones cuyos clientes están en el listado filtrado
        const filteredCotizaciones = cotizaciones.filter((cotizacion) =>
          filteredClientes.some((cliente) => cliente.id === cotizacion.cliente)
        );

        // 1. Cotizaciones con estado = 1
        const estadoUno = filteredCotizaciones.filter((cot) => cot.estado === 1);
        setCountCotizaciones(estadoUno.length);

        // 2. Total de cotizaciones filtradas
        const total = filteredCotizaciones.length;
        setTotalCotizaciones(total);

        // 3. Cotizaciones aceptadas (estado >= 2)
        const aceptadas = filteredCotizaciones.filter((cot) => cot.estado >= 2).length;
        setCotizacionesAceptadas(aceptadas);
      } catch (error) {
        console.error("Error al obtener las cotizaciones", error);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="App">
      {/* Contenedor para la barra de progreso */}
      <div className="justi-card">
        <Card className="custom-card-bar">
          <div className="progress-bar-container">
            <Progress percent={(contarCotizaciones.cotizacionesnoaceptadas / contarCotizaciones.cotizacionestotales) * 100} status="active" />
          </div>
          <div className="text-container">
            <p>Total de cotizaciones: {contarCotizaciones.cotizacionesnoaceptadas}</p>
            <p>Cotizaciones Aceptadas: {contarCotizaciones.cotizacionestotales}</p>
          </div>
        </Card>
      </div>
      {/* Contenedor centrado para las tarjetas de navegación */}
      <div className="content-center">
        <br />
        <Space size={0}>
          <Row gutter={[0, 0]} justify="center">
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <Link to="/empresa">
                <Card className="card-custom" title="Empresas" bordered={false}>
                  <div className="icon-container">
                    <ShopFilled />
                  </div>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <Link to="/cliente">
                <Card className="card-custom" title="Clientes" bordered={false}>
                  <div className="icon-container">
                    <UserAddOutlined />
                  </div>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <Link to="/servicio">
                <Card className="card-custom" title="Servicios" bordered={false}>
                  <div className="icon-container">
                    <ClearOutlined />
                  </div>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <Link to="/cotizar">
                <Card className="card-custom" title="Cotizaciones" bordered={false}>
                  <div className="badge-container">
                    <Badge count={countCotizaciones} />
                  </div>
                  <div className="icon-container">
                    <EditOutlined />
                  </div>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <Link to="/generar_orden">
                <Card className="card-custom" title="Ordenes de Trabajo" bordered={false}>
                  <div className="icon-container">
                    <ReconciliationOutlined />
                  </div>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <Link to="/usuario">
                <Card className="card-custom" title="Usuarios" bordered={false}>
                  <div className="icon-container">
                    <UsergroupAddOutlined />
                  </div>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <Link to="/configuracionorganizacion">
                <Card
                  className="card-custom"
                  title="Configuración"
                  bordered={false}
                  headStyle={{
                    whiteSpace: "normal",
                    overflow: "visible",
                    textOverflow: "clip",
                  }}
                >
                  <div className="icon-container">
                    <SettingOutlined />
                  </div>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <Link to="/factura">
                <Card className="card-custom" title="Facturas" bordered={false}>
                  <div className="icon-container">
                    <AuditOutlined />
                  </div>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <Link to="/preCotizacion">
                <Card className="card-custom" title="Pre-Cotizaciones" bordered={false}>
                  <div className="icon-container">
                    <ThunderboltTwoTone />
                  </div>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <Link to="/Pagos">
                <Card className="card-custom" title="Pagos" bordered={false}>
                  <div className="icon-container">
                    <DollarTwoTone />
                  </div>
                </Card>
              </Link>
            </Col>
          </Row>
        </Space>
      </div>
    </div>
  );
};

export default App;
