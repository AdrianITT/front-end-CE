import React, {useEffect, useState} from 'react';
import { Table, Button, Typography, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import { getAllCustodiaExterna } from '../../apis/ApiCustodiaExterna/ApiCustodiaExtern';
import { getAllPrioridad } from '../../apis/ApiCustodiaExterna/ApiPrioridad';

const { Title } = Typography;

const CustodiasExterna = () => {
  const [custodias, setCustodias] = useState([]);
  const [prioridades, setPrioridades] = useState([]);
  useEffect(() => {
    getAllCustodiaExterna()
      .then((response) => {
        console.log("Datos:", response.data);
        setCustodias(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener custodias:", error);
      });
          // 2. Cargar prioridades
    getAllPrioridad().then(res => {
      setPrioridades(res.data); // [{ id:1, codigo:'A', descripcion:'(15) Días hábiles'}, ...]
    });
  }, []);

    // Crear el array de filtros para prioridad
  // (texto = "A - (15) Días hábiles", value = ID)
  const priorityFilters = prioridades.map((p) => ({
    text: `${p.codigo} - ${p.descripcion}`,
    value: p.id,
  }));

  const columns = [
    {
      title: 'Contacto',
      dataIndex: 'contacto',
      key: 'contacto',
    },
    {
      title: 'Fecha Final',
      dataIndex: 'fechaFinal',
      key: 'fechaFinal',
      sorter : (a,b)=> new Date(a.fechaFinal) - new Date(b.fechaFinal), 
      sortDirections:["ascend","descend"],
    },
    {
      title: 'Hora Final',
      dataIndex: 'horaFinal',
      key: 'horaFinal',
      
    },
    {
      title: 'Prioridad',
      dataIndex: 'prioridad',
      key: 'prioridad',
      filters: priorityFilters,
      onFilter: (filterValue, record) => {
        // record.prioridad es el ID; si coincide, lo muestra
        return record.prioridad === filterValue;
      },
      render: (prioridadId) => {
        // Buscar el objeto prioridad en el array prioridades
        const p = prioridades.find(item => item.id === prioridadId);
        // Si existe, retornar "codigo - descripcion"
        return p ? `${p.codigo} - ${p.descripcion}` : 'Sin asignar';
      },
    },
    {
      title: "Acción",
      key: "action",
      render: (_, record) => (
        <Link to={`/DetallesCustodiaExternas/${record.id}`}>
          <Button>Detalles</Button>
        </Link>
      ),
    },
  ];
  


  return (
    <div style={{ padding: 32 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={3}>Custodia Externas</Title>
        </Col>
        <Col><Link to="/crearCustodiaExterna">
          <Button type="primary">Crear custodia externa</Button>
        </Link>
        </Col>
      </Row>

      <Table columns={columns} dataSource={custodias} rowKey="id" pagination={{ pageSize: 5 }}/>
    </div>
  );
};

export default CustodiasExterna;
