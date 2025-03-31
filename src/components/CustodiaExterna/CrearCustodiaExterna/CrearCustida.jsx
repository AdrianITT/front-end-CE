import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Collapse,
  Row,
  Col,
  Typography,
  DatePicker,
  Card,
  Descriptions, 
  Checkbox, 
  TimePicker,
  Switch,
  InputNumber,
  ConfigProvider,
  Radio
} from 'antd';
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { CheckOutlined, CloseOutlined,DownOutlined } from '@ant-design/icons';
import { createCustodiaExterna, getCustodiaExternaById } from '../../../apis/ApiCustodiaExterna/ApiCustodiaExtern';
import { createMuestra, getMuestraById } from '../../../apis/ApiCustodiaExterna/ApiMuestra';
import { createpreservadormuestra } from '../../../apis/ApiCustodiaExterna/ApiPreservadorMuestra';
import { getAllOrdenesTrabajo } from '../../../apis/ApisServicioCliente/OrdenTrabajoApi';
import { getAllPrioridad } from '../../../apis/ApiCustodiaExterna/ApiPrioridad';
import {getAllContenedor} from '../../../apis/ApiCustodiaExterna/ApiContenedor'
import { getAllPreservador } from '../../../apis/ApiCustodiaExterna/ApiPreservador';
import { getAllMatriz } from '../../../apis/ApiCustodiaExterna/ApiMatriz';
import { getAllClave } from '../../../apis/ApiCustodiaExterna/ApiClave';
import { getAllParametro } from '../../../apis/ApiCustodiaExterna/ApiParametros';
import { getAlldataordentrabajo } from '../../../apis/ApisServicioCliente/DataordentrabajoApi';

const { Title } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
//const { TextArea } = Input;

const CrearCustodiaExterna = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [bitacoras, setBitacoras] = useState([0]); // Comienza con una bitácora
  const [activeKey, setActiveKey] = useState([0]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const MAX_PRESERVADORES = 3;
  const modificacionOrdenTrabajo=Form.useWatch("modificacionOrdenTrabajo", form);
  const [ordenesTrabajo, setOrdenesTrabajo] = useState([]);
  const [prioridades, setPrioridades] = useState([]);
  const [contenedores, setContenedores] = useState([]);
  const [preservadores, setPreservadores] = useState([]);
  const [claves, setClaves] = useState([]);
  const [matrices, setMatrices] = useState([]);
  const [parametros, setParametros] = useState([]);
  const [tipoMuestras, setTipoMuestra] = useState(null);
  const [dataOrdenTrabajo, setDataOrdenTrabajo] = useState(null);
  const [muestras, setMuestras] = useState([]);
  // Al seleccionar la orden:
  //const ordenSeleccionadaData = ordenesTrabajo.find(orden => orden.id === ordenSeleccionada);
  //const cotizacionId = ordenSeleccionadaData.cotizacionId;
  useEffect(() => {
    if (id) {  // id es la custodiaExterna ID
      getMuestraById(id)
      .then((res) => {
        console.log("res.data: ",res.data);
        const data = res.data;
        // Convertir fechas a moment
        data.fechaMuestreo = data.fechaMuestreo
          ? moment(data.fechaMuestreo, "YYYY-MM-DD")
          : null;
        data.horaMuestreo = data.horaMuestreo
          ? moment(data.horaMuestreo, "HH:mm:ss")
          : null;
    
        // Precarga el formulario con un solo objeto
        // (si tu form usa 'bitacoras[0]', lo pones dentro de un array)
        form.setFieldsValue({ bitacoras: [data] });
        setBitacoras([0]);
      })
      .catch((err) => console.error("Error al obtener muestras:", err));
    
    }
  }, [id, form]);
  
  
  useEffect(() => {
    if (id) {
      getCustodiaExternaById(id)
        .then((res) => {
          const data = res.data;
          console.log("Custodia Externa: ",res.data);
          // Si hay campos de fecha/hora, conviértelos a objetos moment()
          if (data.fechaFinal) {
            data.fechaFinal = moment(data.fechaFinal, "YYYY-MM-DD");
          }
          if (data.horaFinal) {
            data.horaFinal = moment(data.horaFinal, "HH:mm:ss");
          }
          // Precarga el formulario
          form.setFieldsValue({
            ...data,
            // Si tu data tiene un nombre de propiedad diferente para ordenTrabajo, ajústalo
            ordenTrabajo: data.ordenTrabajo,
            // Si usas tipoMuestra, por ejemplo:
            // tipoMuestra: data.tipoMuestra,
          });
          // Si necesitas actualizar estados locales, hazlo:
          setOrdenSeleccionada(data.ordenTrabajo);
          // setTipoMuestra(data.tipoMuestra);
        })
        .catch((err) => console.error("Error al obtener custodia externa:", err));
    }
  }, [id, form]);
  
  useEffect(() => {
    if (!ordenSeleccionada) return; // No hacemos nada si no hay orden seleccionada
  
    getAlldataordentrabajo(ordenSeleccionada)
      .then((res) => {
        // Aquí obtienes la información de la OT, cliente, etc.
        console.log("Datos de getAlldataordentrabajo:", res.data);
        // Guarda la data en el estado
        setDataOrdenTrabajo(res.data);
      })
      .catch((err) => console.error("Error al obtener datos de OT:", err));
  }, [ordenSeleccionada]);
  useEffect(() => {
    getAllOrdenesTrabajo()
      .then((res) => {
        const filtradas = res.data.filter(orden => orden.estado === 2);
        setOrdenesTrabajo(filtradas);
      })
      .catch((err) => {
        console.error("Error al obtener órdenes de trabajo:", err);
      });
  }, []);
  useEffect(() => {
    getAllPrioridad()
      .then((res) => {
        setPrioridades(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener prioridades:", err);
      });
  }, []);
  useEffect(() => {
    getAllContenedor()
      .then(res => setContenedores(res.data))
      .catch(err => console.error("Error al obtener contenedores:", err));
  
    getAllPreservador()
      .then(res => setPreservadores(res.data))
      .catch(err => console.error("Error al obtener preservadores:", err));
  
    getAllMatriz()
      .then(res => setMatrices(res.data))
      .catch(err => console.error("Error al obtener matrices:", err));

    getAllClave()
      .then(res => setClaves(res.data))
      .catch(err => console.error("Error al obtener claves:", err));
    getAllParametro()
      .then(res => setParametros(res.data))
      .catch(err => console.error("Error al obtener matrices:", err));
  }, []);
  
  
  

  const handleAddBitacora = () => {
     const newIndex = bitacoras.length;
     setBitacoras((prev) => [...prev, newIndex]);
     setActiveKey([newIndex]);
  };

  const handleFinish = async(values) => {
    try {
      // 1. Crear la custodia externa
      const custodiaPayload = {
        contacto: values.contacto || "sin contacto",
        puntosMuestreoAutorizados: values.puntosMuestreoAutorizados || "0",
        modificacionOrdenTrabajo: values.modificacionOrdenTrabajo || false,
        observacionesModificacion: values.observacionesModificacion || "",
        muestreoRequerido: values.muestreoRequerido,
        fechaFinal: values.fechaFinal ? values.fechaFinal.format("YYYY-MM-DD") : null,
        horaFinal: values.horaFinal ? values.horaFinal.format("HH:mm:ss") : null,
        observaciones: values.observaciones,
        prioridad: values.prioridad,
        receptor: 2, // o puedes hacer esto dinámico si lo necesitas
        ordenTrabajo: values.ordenTrabajo,
        asesoriaGestionAmbiental:values.asesoriaGestionAmbiental,
      };
      console.log("Payload de custodia externa:", custodiaPayload);
  
      const custodiaRes = await createCustodiaExterna(custodiaPayload);
      const custodiaId = custodiaRes.data.id;
  
      // 2. Crear las muestras
      const bitacoras = values.bitacoras || [];
      console.log('bitacoras:', bitacoras);
  
      for (const bitacora of bitacoras) {
        const muestraPayload = {
          identificacionCampo: bitacora.IdCampo|| null,
          fechaMuestreo: bitacora.fechaMuestreo ? bitacora.fechaMuestreo.format("YYYY-MM-DD") : null,
          horaMuestreo: bitacora.HoraMuestreo? bitacora.HoraMuestreo.format("HH:mm:ss") : null,
          volumenCantidad: bitacora.volumen,
          numeroContenedor: bitacora.numeroContenedor || "1",
          origenMuestra: bitacora.origen,
          idLaboratorio: null,
          filtro: null,
          matriz: bitacora.matriz,
          contenedor: bitacora.contenedor,
          tipoMuestra: tipoMuestras||null, // si usas `Puntual` o `Compuesta` aquí puedes cambiarlo
          parametro: bitacora.metodo,
          custodiaExterna: custodiaId,
        };
        console.log("Payload de muestra:", muestraPayload);
  
        const muestraRes = await createMuestra(muestraPayload);
        const muestraId = muestraRes.data.id;
        console.log("Payload de muestra:", muestraPayload);
  
        // 3. Relacionar preservadores
        for (const preservadorId of bitacora.preservadores || []) {
          await createpreservadormuestra({
            muestra: muestraId,
            preservador: preservadorId,
          });
        }
      }
      navigate(`/DetallesCustodiaExternas/${custodiaId}`);
      console.log("✅ Todo creado correctamente");
    } catch (error) {
      console.error("❌ Error al enviar formulario:", error);
    }
    console.log('Formulario enviado:', values);
  };


   
   const renderBitacoraPanel = (index) => (
    <Panel header={`Muestras del parámetro ${index + 1}`} key={index}>
      <Row gutter={[16, 16]}>
        {/* MÉTODO */}
        <Col span={8}>
          <Form.Item label="Método" name={['bitacoras', index, 'parametro']}>
            <Select placeholder="Selecciona método">
              {parametros.map((item)=>(
                <Option key={item.id} value={item.id}>
                  {item.nombre}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
  
        {/* CONTENEDOR */}
        <Col span={8}>
          <Form.Item label="Contenedor" name={['bitacoras', index, 'contenedor']}>
          <Select placeholder="Selecciona contenedor">
            {contenedores.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.codigo} - {item.nombre}
              </Option>
            ))}
          </Select>
          </Form.Item>
        </Col>
  
        {/* PRESERVADOR */}
        <Col span={8}>
          <Form.Item label="Preservadores" name={['bitacoras', index, 'preservadores']}>
            <Select
            mode="multiple"
            maxCount={MAX_PRESERVADORES}
            placeholder="Selecciona preservador"
            suffixIcon={<DownOutlined />}
          >
            {preservadores.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.id} - {item.nombre}
              </Option>
            ))}
          </Select>
          </Form.Item>
        </Col>

  
        {/* IDENTIFICACIÓN DE CAMPO */}
        <Col span={8}>
          <Form.Item label="Identificación de campo"
          rules={[{ required: true, message: 'Ingresa identificador de campo' }]}
          name={['bitacoras', index, 'identificacionCampo']}>
            <Input/>
          </Form.Item>
        </Col>

  
        {/* MATRIZ */}
        <Col span={8}>
          <Form.Item label="Matriz" name={['bitacoras', index, 'matriz']}>
          <Select placeholder="Selecciona matriz">
            {matrices.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.codigo} - {item.nombre}
              </Option>
            ))}
          </Select>
          </Form.Item>
        </Col>
  
        {/* VOLUMEN / CANTIDAD */}
        <Col span={8}>
          <Form.Item label="Volumen / cantidad" name={['bitacoras', index, 'volumenCantidad']}>
            <Input placeholder="Ej. 500 ml" />
          </Form.Item>
        </Col>
  
        {/* ID FILTRO */}
        <Col span={8}>
          <Form.Item label="ID Filtro" name={['bitacoras', index, 'filtro']}>
            <Input placeholder="Ej. F123" />
          </Form.Item>
        </Col>
  
        {/* ORIGEN DE LA MUESTRA */}
        <Col span={8}>
          <Form.Item label="Origen de la muestra" name={['bitacoras', index, 'origenMuestra']}>
          <Input placeholder="Origen de la muestra" />
          </Form.Item>
        </Col>
  
        {/* FECHA Y HORA DE MUESTREO */}
        <Col span={8}>
          <Form.Item label="Fecha de muestreo y hora" name={['bitacoras', index, 'fechaMuestreo']}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Fecha de muestreo y hora" name={['bitacoras', index, 'horaMuestreo']}>
            <TimePicker />
          </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item label="Numero de contenedores" name={['bitacoras', index, 'numeroContenedor']}>
          <InputNumber />
        </Form.Item>
        </Col>
      </Row>
    </Panel>
  );
  
  return (
    <div style={{ 
     display: 'flex',
    justifyContent: 'center',
    padding: '32px 16px',
     }}>
      <ConfigProvider componentSize="large">
          <div style={{ width: '100%', maxWidth: 1000 }}>
               <Title level={3}>Crear Custodia Externa</Title>
               <Card title="Guía de códigos" style={{ marginBottom: 24 }}>
                <Row gutter={[16, 16]}>
                  {/* Preservadores */}
                  <Col span={8}>
                    <Title level={5}>Preservadores (P)</Title>
                    <ul style={{ paddingLeft: 20 }}>
                      <li>Hielo</li>
                      <li>H<sub>2</sub>SO<sub>4</sub></li>
                      <li>HC<sub>4</sub></li>
                      <li>HNO<sub>2</sub></li>
                      <li>K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub> 5%</li>
                      <li>NaOH</li>
                      <li>HNO<sub>3</sub></li>
                      <li>Otros (descripción en observaciones)</li>
                      <li>No Aplica</li>
                    </ul>
                  </Col>

                  {/* Matriz */}
                  <Col span={8}>
                    <Title level={5}>Matriz</Title>
                    <ul style={{ paddingLeft: 20 }}>
                      <li>S - Sólido</li>
                      <li>L - Líquido</li>
                      <li>G - Gas</li>
                      <li>O - Otros (descripción en observación)</li>
                    </ul>
                  </Col>

                  {/* Contenedores */}
                  <Col span={8}>
                    <Title level={5}>Contenedores (C)</Title>
                    <ul style={{ paddingLeft: 20 }}>
                      <li>V - Vidrio claro</li>
                      <li>F - Filtro</li>
                      <li>A - Vidrio ámbar</li>
                      <li>B - Bolsa</li>
                      <li>P - Plástico</li>
                      <li>O - Otro (descripción en observaciones)</li>
                    </ul>
                  </Col>

                  {/* Claves */}
                  <Col span={8}>
                    <Title level={5}>Claves</Title>
                    <ul style={{ paddingLeft: 20 }}>
                      <li>AR - Agua residual</li>
                      <li>AP - Agua potable</li>
                      <li>BM - Emisiones / Fuentes fijas</li>
                      <li>AL - Ambiente laboral</li>
                      <li>O - Otro (descripción en observaciones)</li>
                    </ul>
                  </Col>

                  {/* Tipo de muestra */}
                  <Col span={8}>
                    <Title level={5}>Tipo de Muestras</Title>
                    <ul style={{ paddingLeft: 20 }}>
                      <li>MP - Muestra puntual</li>
                      <li>MC - Muestra compuesta</li>
                    </ul>
                  </Col>
                </Row>
              </Card>
               <Form
               form={form}
               layout="vertical"
               onFinish={handleFinish}
               style={{ maxWidth: 900 }}
               initialValues={{
                modificacionOrdenTrabajo:false,
                asesoria:false,
               }}
               >
                <Form.Item label="ID Orden de Trabajo" name="ordenTrabajo">
                  <Select
                    showSearch
                    placeholder="Selecciona una orden"
                    optionFilterProp="children"
                    onChange={(value) => setOrdenSeleccionada(value)}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {ordenesTrabajo.map((orden) => (
                      <Option key={orden.id} value={orden.id}>
                        {orden.codigo}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {ordenSeleccionada && dataOrdenTrabajo && (
                  <Card title="Datos del cliente" style={{ marginBottom: 17 }}>
                    <Descriptions column={1}>

                      {/* Nombre Completo */}
                      <Descriptions.Item label="Nombre">
                        {dataOrdenTrabajo.Cliente["Nombre Completo"]}
                      </Descriptions.Item>

                      {/* Teléfono o Celular */}
                      <Descriptions.Item label="Teléfono">
                        {dataOrdenTrabajo.Cliente.Teléfono}
                      </Descriptions.Item>

                      {/* Dirección: concatenamos los campos dentro de dataOrdenTrabajo.Cliente.Dirección */}
                      <Descriptions.Item label="Dirección">
                        {dataOrdenTrabajo.Cliente.Dirección.Calle}{" "}
                        {dataOrdenTrabajo.Cliente.Dirección.Numero},{" "}
                        {dataOrdenTrabajo.Cliente.Dirección.Colonia},{" "}
                        {dataOrdenTrabajo.Cliente.Dirección.Ciudad},{" "}
                        {dataOrdenTrabajo.Cliente.Dirección.Estado}
                      </Descriptions.Item>

                      {/* Correo */}
                      <Descriptions.Item label="Correo">
                        {dataOrdenTrabajo.Cliente.Correo}
                      </Descriptions.Item>

                    </Descriptions>
                  </Card>
                )}
               <Row gutter={16}>
               <Col span={8}>
                  <Form.Item
                    label="Contacto: "
                    name="contacto"
                    rules={[{ required: true, message: 'Ingresa el Contacto' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Puesto/Cargo: "
                    name="PuestoCargo"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Puntos de muestreo autorizados"
                    name="puntosMuestreoAutorizados"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="modificacionOrdenTrabajo" valuePropName="checked"
                  label="¿El Cliente solicita modificación a la OT?">
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                    />
                  </Form.Item>
                </Col>
                {modificacionOrdenTrabajo&& (
                <Col span={8}>
                  <Form.Item
                      label="Modificacion solicitada:"
                      name="muestreoRequerido"
                    >
                      <Input />
                  </Form.Item>
                </Col>)}
               </Row>
               <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                      label="Muestro requerido por:"
                      name="observacionesModificacion"
                    >
                      <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Fecha de muestreo y hora" name='fechaFinal'>
                    <DatePicker name='fechaMuestra'/>
                  </Form.Item>
                  <Form.Item label="Fecha de muestreo y hora" name='horaFinal'> 
                    <TimePicker name='horaMuestra'/>
                  </Form.Item>
                </Col>

               </Row>
               <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Grado de prioridad" name="prioridad">
                  <Select placeholder="Selecciona prioridad">
                    {prioridades.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.codigo} - {item.descripcion}
                      </Option>
                    ))}
                  </Select>
                  </Form.Item>
                </Col>
               </Row>

               <Form.Item>
                <Button type="dashed" onClick={handleAddBitacora} block>
                + Agregar punto de muestreo
                </Button>
               </Form.Item>

               <Collapse activeKey={activeKey} onChange={(keys) => setActiveKey(keys)}>
                    {bitacoras.map((bitacoraId) => renderBitacoraPanel(bitacoraId))}
               </Collapse>
                <Col>
                  <Form.Item label="Muestreado por:" name="muestreado">
                    <Input />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="Observaciones" name="observaciones">
                      <Input.TextArea showCount maxLength={120} />
                  </Form.Item>
                </Col>
                    
                <Row gutter={16} style={{ marginBottom: 16 }}>
                  <Col span={24}>
                    <Form.Item name="asesoriaGestionAmbiental" valuePropName="checked"
                    label="¿El Cliente solicita asesoría/gestión ambiental?">

                        <Switch
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                        />

                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16} style={{ marginBottom: 16 }}>
                  <Col span={8}>
                    <Form.Item label="Dirigir información a:" name="dirigirInformacion">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="E-mail:" name="correo">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16} style={{ marginBottom: 16 }}>
                  <Col span={8}>
                    <Form.Item label="Temperatura de las muestras en recepción:" name="tempMuestras">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Card title="Tipo de Muestras" style={{ display: 'inline-block', marginBottom: 16 }}>
                  <Row gutter={16}>
                    <Col span={24}>
                    <Form.Item label="Tipo de muestra" name="tipoMuestra">
                    <Checkbox.Group onChange={(checkedValues) => setTipoMuestra(checkedValues[0])}>
                      <Checkbox value={2}>Muestra Compuesta</Checkbox>
                      <Checkbox value={1}>Muestra Puntual</Checkbox>
                    </Checkbox.Group>
                    </Form.Item>

                      {tipoMuestras === 2 && (
                        <Form.Item label="ID Compuesta" name="idCompuesta" rules={[{ required: true, message: 'Ingresa el ID de la muestra compuesta' }]}>
                          <Input />
                        </Form.Item>
                      )}

                      {tipoMuestras === 1 && (
                        <Form.Item label="ID Puntual" name="idPuntual" rules={[{ required: true, message: 'Ingresa el ID de la muestra puntual' }]}>
                          <Input />
                        </Form.Item>
                      )}
                    </Col>
                  </Row>
                </Card>


               <Form.Item style={{ marginTop: 17, textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                    Crear Custodia
                    </Button>
               </Form.Item>
               </Form>
          </div>
      </ConfigProvider>
    </div>
  );
};

export default CrearCustodiaExterna;
