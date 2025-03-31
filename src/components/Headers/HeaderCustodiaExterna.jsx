import React, { useState, useEffect } from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { Menu, Button, Drawer } from 'antd';
import { Link, useLocation } from "react-router-dom";
import Logout_Api from '../../apis/ApisServicioCliente/LogoutApi';
import './Header.css';
import { getOrganizacionById } from '../../apis/ApisServicioCliente/organizacionapi';

// Definición de los items del menú
const items = [
  {
    key: 'home',
    label: (<Link to="/home" rel="noopener noreferrer">Home</Link>),
  },

  {
    key: 'CustodiaExterna',
    label: (
      <Link to="/CustodiaExterna" rel="noopener noreferrer">
        Custodia Externa
      </Link>
    ),
  },
  {
     key: 'CrearCustodiaExterna',
     label: (
       <Link to="/CrearCustodiaExterna" rel="noopener noreferrer">
         Crear Custodia Externa
       </Link>
     ),
   },
  {
    key: 'logout',
    label: (
      <div className="logout-button">
        <Button
          onClick={async () => {
            try {
              await Logout_Api.post("", {}, {
                headers: {
                  Authorization: `Token ${localStorage.getItem('token')}`,
                },
              });
              // Limpiar localStorage
              localStorage.removeItem('token');
              localStorage.removeItem('user_id');
              localStorage.removeItem('username');
              localStorage.removeItem('rol');
              localStorage.removeItem('organizacion');
              localStorage.removeItem('organizacion_id');
              // Redirige al usuario a la página principal
              window.location.href = '/';
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
            }
          }}
        >
          Cerrar sesión
        </Button>
      </div>
    ),
  },
];

const HeadersCustodiaExterna = () => {
  // Obtener el logo de la organización
  const [logoOrganizacion, setLogoOrganizacion] = useState(null);
  useEffect(() => {
    const fetchLogoOrganizacion = async () => {
      const organizationId = parseInt(localStorage.getItem("organizacion_id"), 10);
      try {
        const response = await getOrganizacionById(organizationId);
        setLogoOrganizacion(response.data);
      } catch (error) {
        console.error("Error al obtener la organización:", error);
      }
    };
    fetchLogoOrganizacion();
  }, []);

  // Control del Drawer para el menú en dispositivos móviles
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  // Utilizar useLocation para determinar la ruta activa y seleccionar la clave correspondiente
  const location = useLocation();
  const getDefaultSelectedKey = () => {
    // Recorre los items (y sub-items) para encontrar coincidencias con la ruta actual
    for (const item of items) {
      // Si el item tiene un label con Link, comprueba la propiedad "to"
      if (item.label && typeof item.label === 'object' && item.label.props && item.label.props.to) {
        if (location.pathname.startsWith(item.label.props.to)) {
          return item.key;
        }
      }
      // Si tiene hijos, comprueba cada uno
      if (item.children) {
        for (const child of item.children) {
          if (child.label && child.label.props && child.label.props.to) {
            if (location.pathname.startsWith(child.label.props.to)) {
              return child.key;
            }
          }
        }
      }
    }
    return '';
  };

  const defaultSelectedKey = getDefaultSelectedKey();

  // Control de las claves abiertas para submenús
  const [openKeys, setOpenKeys] = useState([]);
  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div className="header-container">
      <Link to="/home">
        <div className="header-logo">
          {logoOrganizacion && logoOrganizacion.logo ? (
            <img alt="Logo de la Organización" src={logoOrganizacion.logo} style={{ height: '40px', marginRight: '8px' }} />
          ) : (
            <img alt="INADE" style={{ height: '40px', marginRight: '8px' }} />
          )}
        </div>
      </Link>
      <div className="header-button">
        <Button type="primary" onClick={showDrawer}>
          Menu
        </Button>
      </div>
      <Drawer title="Menu" onClose={onClose} open={open}>
        <Menu
          mode="inline"
          selectedKeys={[defaultSelectedKey]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{ width: 256 }}
          items={items}
        />
      </Drawer>
    </div>
  );
};

export default HeadersCustodiaExterna;
