import React from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';

/**
 * Componente que muestra el modal para crear una custodia externa.
 *
 * @param {boolean} visible - Controla si el modal está abierto o cerrado.
 * @param {function} onCancel - Función que se llama al cancelar el modal.
 * @param {function} onOk - Función que se llama al confirmar (OK) el modal.
 */
const CrearCustodiaModal = ({ visible, onCancel, onOk }) => {
  return (
    <Modal
      title="Crear Custodia Externa"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      okText="Guardar"
      cancelText="Cancelar"
    >
      <Form layout="vertical">
        {/*<Form.Item
          label="Nombre de la custodia"
          name="nombre"
          rules={[{ required: true, message: 'Ingresa un nombre para la custodia' }]}
        >
          <Input placeholder="Ejemplo: Custodia 001" />
        </Form.Item> */}

       {/* <Form.Item
          label="Descripción"
          name="descripcion"
          rules={[{ required: true, message: 'Ingresa una descripción' }]}
        >
          <Input.TextArea placeholder="Descripción de la custodia" rows={3} />
        </Form.Item> */}

        <Form.Item
          label="Fecha y hora"
          name="fechaHora"
          rules={[{ required: true, message: 'Selecciona una fecha y hora' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="ID Laboratorio"
          name="idLaboratorio"
          rules={[{ required: true, message: 'Ingresa el ID del laboratorio' }]}
        >
          <Input placeholder="Ejemplo: LAB123" />
        </Form.Item>

        {/* <Form.Item
          label="Método"
          name="metodo"
          rules={[{ required: true, message: 'Ingresa el método' }]}
        >
          <Input placeholder="Ejemplo: Método XYZ" />
        </Form.Item>*/}

        <Form.Item
          label="ID Orden de Trabajo"
          name="idOrdenTrabajo"
          rules={[{ required: true, message: 'Ingresa el ID de la orden de trabajo' }]}
        >
          <Input placeholder="Ejemplo: OT456" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CrearCustodiaModal;
