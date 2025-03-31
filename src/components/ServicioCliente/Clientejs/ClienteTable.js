import React, { useMemo } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";

// Componente memoizado para evitar renders innecesarios
const ClienteTable = React.memo(({ clientes, showAlertModal }) => {
  // Memoiza los filtros para "Cliente"
  const clienteFilters = useMemo(() => {
    return Array.from(new Set(clientes.map(item => item.Cliente))).map(value => ({ text: value, value }));
  }, [clientes]);

  // Memoiza los filtros para "Empresa"
  const empresaFilters = useMemo(() => {
    return Array.from(new Set(clientes.map(item => item.Empresa))).map(value => ({ text: value, value }));
  }, [clientes]);

  // Memoiza la definición de columnas, actualizando solo cuando los filtros o showAlertModal cambien
  const columns = useMemo(() => [
    { 
      title: "#", 
      dataIndex: "key", 
      key: "key",
      sorter: (a, b) => a.key - b.key,
      sortDirections: ['ascend', 'descend'],
    },
    { 
      title: "Cliente", 
      dataIndex: "Cliente", 
      key: "Cliente",
      filters: clienteFilters,
      onFilter: (value, record) => record.Cliente === value,
      filterSearch: true,
    },
    { 
      title: "Empresa", 
      dataIndex: "Empresa", 
      key: "Empresa",
      filters: empresaFilters,
      onFilter: (value, record) => record.Empresa === value,
      filterSearch: true,
    },
    { title: "Correo", dataIndex: "Correo", key: "Correo" },
    {
      title: "Acción",
      key: "action",
      render: (_, record) => (
        <div className="action-buttons">
          <Link to={`/crear_cotizacion/${record.key}`}>
            <Button className="action-button-cotizar">Cotizar</Button>
          </Link>
          <Link to={`/EditarCliente/${record.key}`}>
            <Button className="action-button-edit">
              <EditOutlined />
            </Button>
          </Link>
          <Button
            className="action-button-delete"
            onClick={() => showAlertModal(record.key)}
          >
            <CloseOutlined />
          </Button>
        </div>
      ),
    },
  ], [clienteFilters, empresaFilters, showAlertModal]);

  return (
    <Table
      columns={columns}
      dataSource={clientes}
      rowClassName={(record) => (record.incompleto ? "row-incompleto" : "")}
      pagination={{ pageSize: 5 }}
    />
  );
});

export default ClienteTable;
