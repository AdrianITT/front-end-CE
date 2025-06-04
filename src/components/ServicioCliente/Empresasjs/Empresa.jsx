// Empresa.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Modal, message, Spin } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './Empresa.css';


import { getAllEmpresas, createEmpresas, deleteEmpresa, updateEmpresa, getEmpresaById, getAllEmpresasData } from '../../../apis/ApisServicioCliente/EmpresaApi';
import { getAllRegimenFiscal } from '../../../apis/ApisServicioCliente/Regimenfiscla';
import { getAllUsoCDFI } from '../../../apis/ApisServicioCliente/UsocfdiApi';


// Componentes separados
import EmpresaTable from './EmpresaTable';
import CreateEmpresaModal from './CrearEmpresaModal';
import EditEmpresaModal from './EditarEmpresaModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const Empresa = () => {
  const [empresas, setEmpresas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);        // Modal de crear
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal de editar
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Empresa a editar
  const [empresaToEdit, setEmpresaToEdit] = useState(null);
  // Empresa a eliminar
  const [empresaIdToDelete, setEmpresaIdToDelete] = useState(null);

  // Para el modal de éxito (opcional)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Estados para formulario
  const [regimenFiscal, setRegimenFiscal] = useState([]);
  const [loading, setLoading] = useState(false);


  // NUEVO: Estado para almacenar los usos CFDI
  const [usosCfdi, setUsosCfdi] = useState([]);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");


  // Cargar lista de empresas
  const loadEmpresas = useCallback(async () => {
    setLoading(true);
    try {
      const userOrganizationId = parseInt(localStorage.getItem("organizacion_id"), 10);
      const res = await getAllEmpresasData(userOrganizationId); // NUEVO ENDPOINT
  
      const dataTabla = res.data.map((empresa) => {
        const incompleta =
          !empresa.calle || !empresa.numeroExterior || !empresa.colonia ||
          !empresa.ciudad || !empresa.estado || !empresa.codigoPostal;
  
        return {
          key: empresa.id,
          numero:empresa.numero,
          Empresa: empresa.nombre,
          RFC: empresa.rfc,
          Direccion: empresa.direccioncompleta || "Sin dirección",
          Organizacion: empresa.organizacion || "No disponible",
          incompleta,
        };
      });
  
      // Ordenar para mostrar primero las incompletas
      dataTabla.sort((a, b) => b.incompleta - a.incompleta);
      setEmpresas(dataTabla);
    } catch (error) {
      console.error("Error al cargar empresas desde getAllEmpresasData:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  

  // Cargar régimen fiscal
  const loadRegimenFiscal = useCallback(async () => {
    try {
      const response = await getAllRegimenFiscal();
      setRegimenFiscal(response.data || []);
    } catch (error) {
      console.error("Error al cargar regimen fiscal", error);
    }
  }, []);

  const loadUsosCfdi = useCallback(async () => {
    try {
      const response = await getAllUsoCDFI();
      setUsosCfdi(response.data || []);
    } catch (error) {
      console.error("Error al cargar usos CFDI:", error);
    }
  }, []);

  useEffect(() => {
    loadEmpresas();
    loadRegimenFiscal();
    loadUsosCfdi();
  }, [loadEmpresas, loadRegimenFiscal,loadUsosCfdi]);

  // 1. ABRIR modal de crear
  const handleOpenCreate = () => {
    setIsModalOpen(true);
  };

  // 2. CREAR nueva empresa
  const handleCreateEmpresa = async (values, form) => {
    try {
      const userOrgId = parseInt(localStorage.getItem("organizacion_id"));
      const payload = { ...values, organizacion: userOrgId };
  
      const nombreDuplicado = empresas.some((e) =>
        e.Empresa.toLowerCase().trim() === payload.nombre.toLowerCase().trim()
      );
      const rfcDuplicado = empresas.some((e) =>
        e.RFC.toLowerCase().trim() === payload.rfc.toLowerCase().trim()
      );
  
      if (nombreDuplicado || rfcDuplicado) {
        setErrorModalMessage(
          nombreDuplicado
            ? "Ya existe una empresa con ese nombre."
            : "Ya existe una empresa con ese RFC."
        );
        setErrorModalVisible(true);
        return;
      }
  
      const response = await createEmpresas(payload);
      if (response && response.data) {
        message.success("Empresa creada correctamente");
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
        form.resetFields();
        loadEmpresas();
      }
    } catch (error) {
      console.error("Error al crear la empresa:", error);
      message.error("Error al crear la empresa");
    }
  };
  

  // 3. ABRIR modal de editar
  const handleOpenEdit = async (id) => {
    setIsEditModalOpen(true);
    // Obtener datos de la empresa
    try {
      const res = await getEmpresaById(id);
      if (res && res.data) {
        setEmpresaToEdit(res.data);
      }
    } catch (error) {
      console.error("Error al obtener datos de empresa", error);
    }
  };

  // 4. EDITAR empresa
  const handleEditEmpresa = async (values, form) => {
    if (!empresaToEdit) return;
    try {
      const userOrgId = parseInt(localStorage.getItem("organizacion_id"));
      const payload = { ...values, organizacion: userOrgId };
      const response = await updateEmpresa(empresaToEdit.id, payload);
      if (response && response.data) {
        message.success("Empresa actualizada correctamente");
        setIsEditModalOpen(false);
        setIsSuccessModalOpen(true);
        form.resetFields();
        loadEmpresas();
      }
    } catch (error) {
      console.error("Error al editar la empresa:", error);
      message.error("Error al editar la empresa");
    }
  };

  // 5. CONFIRMACIÓN de borrado
  const handleOpenDelete = (id) => {
    setEmpresaIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // 6. ELIMINAR empresa
  const handleDelete = async () => {
    try {
      if (empresaIdToDelete) {
        await deleteEmpresa(empresaIdToDelete);
        message.success("Empresa eliminada");
        setIsDeleteModalOpen(false);
        loadEmpresas();
      }
    } catch (error) {
      console.error("Error al eliminar la empresa:", error);
      message.error("Error al eliminar la empresa");
    }
  };

  return (
    <div><Spin spinning={loading} tip="Cargando datos...">
      <div className="content-center">
        <h1>Empresas</h1>
      </div>
      <div className="button-ends">
      <Button type="primary" onClick={handleOpenCreate}>Añadir Empresa</Button>
      </div>

      {/* TABLA */}
      <div className="table-center">
      <EmpresaTable
        dataSource={empresas}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      /></div>

      {/* MODAL CREAR */}
      <CreateEmpresaModal
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onCreate={handleCreateEmpresa}
        regimenFiscal={regimenFiscal}
        usosCfdi={usosCfdi}
      />

      {/* MODAL EDITAR */}
      <EditEmpresaModal
        visible={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onEdit={handleEditEmpresa}
        regimenFiscal={regimenFiscal}
        empresa={empresaToEdit}
        usosCfdi={usosCfdi}
      />

      {/* MODAL CONFIRMACIÓN BORRADO */}
      <DeleteConfirmModal
        visible={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />

      {/* MODAL ÉXITO */}
      <Modal
        title="Empresa creada/actualizada con éxito"
        open={isSuccessModalOpen}
        onOk={() => setIsSuccessModalOpen(false)}
        onCancel={() => setIsSuccessModalOpen(false)}
        footer={[
          <Button key="cerrar" type="primary" onClick={() => setIsSuccessModalOpen(false)}>
            Cerrar
          </Button>,
        ]}
      >
        <p>¡La operación se ha realizado correctamente!</p>
      </Modal>
      <Modal
        title="Error de Creacion"
        open={errorModalVisible}
        onOk={() => setErrorModalVisible(false)}
        onCancel={() => setErrorModalVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setErrorModalVisible(false)}>
            Cerrar
          </Button>
        ]}
      >
        <p>{errorModalMessage}</p>
      </Modal>

    </Spin></div>
  );
};

export default Empresa;
