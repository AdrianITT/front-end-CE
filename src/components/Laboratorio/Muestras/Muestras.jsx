import React, { useState } from 'react';
import { Button, Table, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import CrearCustodiaModal from './CrearCustodiaModal';
import { EditOutlined, CloseOutlined } from "@ant-design/icons";

const columns = [
  {
    title: 'Header A',
    dataIndex: 'headerA',
    key: 'headerA',
    align: 'center',
  },
  {
    title: 'Header B',
    dataIndex: 'headerB',
    key: 'headerB',
    align: 'center',
  },
  {
    title: 'Header C',
    dataIndex: 'headerC',
    key: 'headerC',
    align: 'center',
  },
      {
        title: "Acción",
        key: "action",
        render: (_, record) => (
          <div className="action-buttons">
            <Link to={"/DoTaskCustodiaInterna"}>
              <Button className="action-button-cotizar">Realizar</Button>
            </Link>
          </div>
        ),
      },
];

const data = [
  { key: '1', headerA: 'Cell A', headerB: 'Cell B', headerC: 'Cell C' ,},
  { key: '2', headerA: 'Cell A', headerB: 'Cell B', headerC: 'Cell C' },
  { key: '3', headerA: 'Cell A', headerB: 'Cell B', headerC: 'Cell C' },
  { key: '4', headerA: 'Cell A', headerB: 'Cell B', headerC: 'Cell C' },
];

const Muestras = () => {
  // Estado para controlar si el modal está abierto
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Abre el modal
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  // Cierra el modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // Se ejecuta al presionar "OK" (guardar) en el modal
  const handleOkModal = () => {
    // Aquí puedes manejar la lógica de guardado o validación adicional
    console.log('Custodia externa creada');
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Usamos Row y Col para centrar y definir anchos responsivos */}
      <Row justify="center">
        <Col xs={24} sm={24} md={22} lg={18}>
          <h1 style={{ textAlign: 'center', marginBottom: 16 }}>
            Custodia Externas
          </h1>
          {/* Contenedor centrado para el botón */}
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <Button type="primary" onClick={handleOpenModal} style={{ float: 'right', marginBottom: 16 }}>
              Crear custodia externa
            </Button>
          </div>
          <Table columns={columns} dataSource={data} pagination={false} />
          <CrearCustodiaModal
            visible={isModalVisible}
            onCancel={handleCloseModal}
            onOk={handleOkModal}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Muestras;
