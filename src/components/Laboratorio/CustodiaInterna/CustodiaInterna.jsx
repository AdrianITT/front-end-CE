import React, { useState } from 'react';
import { Button, Collapse, Form, Input, Steps } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const CustodiaInterna = () => {
  const [form] = Form.useForm();

  // Función que retorna un formulario distinto según el índice
  const getFormForStep = (index) => {
    switch (index) {
      case 0:
        return (
          <Form form={form} layout="vertical">
            <Form.Item
              label="Nombre"
              name="nombre"
              rules={[{ required: true, message: 'Por favor ingresa tu nombre!' }]}
            >
              <Input placeholder="Ingresa tu nombre" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Por favor ingresa tu email!' }]}
            >
              <Input placeholder="Ingresa tu email" />
            </Form.Item>
          </Form>
        );
      case 1:
        return (
          <Form layout="vertical">
            <Form.Item
              label="Apellido"
              name="apellido"
              rules={[{ required: true, message: 'Por favor ingresa tu apellido!' }]}
            >
              <Input placeholder="Ingresa tu apellido" />
            </Form.Item>
          </Form>
        );
      case 2:
        return (
          <Form layout="vertical">
            <Form.Item
              label="Teléfono"
              name="telefono"
              rules={[{ required: true, message: 'Por favor ingresa tu teléfono!' }]}
            >
              <Input placeholder="Ingresa tu teléfono" />
            </Form.Item>
          </Form>
        );
      case 3:
        return (
          <Form layout="vertical">
            <Form.Item
              label="Dirección"
              name="direccion"
              rules={[{ required: true, message: 'Por favor ingresa tu dirección!' }]}
            >
              <Input placeholder="Ingresa tu dirección" />
            </Form.Item>
          </Form>
        );
      case 4:
        return (
          <Form layout="vertical">
            <Form.Item
              label="Ciudad"
              name="ciudad"
              rules={[{ required: true, message: 'Por favor ingresa tu ciudad!' }]}
            >
              <Input placeholder="Ingresa tu ciudad" />
            </Form.Item>
          </Form>
        );
      case 5:
        return (
          <Form layout="vertical">
            <Form.Item
              label="País"
              name="pais"
              rules={[{ required: true, message: 'Por favor ingresa tu país!' }]}
            >
              <Input placeholder="Ingresa tu país" />
            </Form.Item>
          </Form>
        );
      default:
        return <div>No hay formulario definido para este step</div>;
    }
  };

  // Predefinimos 6 steps fijos con formularios distintos
  const initialSteps = Array.from({ length: 6 }, (_, index) => ({
    title: index === 0 ? 'Formulario Inicial' : `Formulario ${index + 1}`,
    content: getFormForStep(index),
  }));

  const [stepsData, setStepsData] = useState(initialSteps);
  const [current, setCurrent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Navegar al siguiente step (siempre que no se esté en el último)
  const next = () => {
    if (current < stepsData.length - 1) {
      setCurrent(current + 1);
    }
  };

  // Retroceder al step anterior
  const prev = () => {
    if (current > 0 && !isFinished) {
      setCurrent(current - 1);
    }
  };

  // Finalizar el proceso: en el primer step se valida el formulario; en los demás, se marca como finalizado
  const finishSteps = () => {
    if (isFinished) return;
    if (current === 0) {
      form
        .validateFields()
        .then(values => {
          console.log('Datos del formulario:', values);
          const updatedSteps = stepsData.map((step, index) =>
            index === current ? { ...step, title: 'Finalizado' } : step
          );
          setStepsData(updatedSteps);
          setIsFinished(true);
        })
        .catch(error => {
          console.error('Error de validación:', error);
        });
    } else {
      const updatedSteps = stepsData.map((step, index) =>
        index === current ? { ...step, title: 'Finalizado' } : step
      );
      setStepsData(updatedSteps);
      setIsFinished(true);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      {/* Collapse con un panel que agrupa todos los steps */}
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Collapse - Grupo de Steps 1" key="1">
          <Steps current={current}>
            {stepsData.map((item, index) => (
              <Steps.Step
                key={index}
                title={item.title}
                status={isFinished && index === current ? 'finish' : undefined}
                icon={isFinished && index === current ? <CheckOutlined /> : undefined}
              />
            ))}
          </Steps>
          <div
            style={{
              marginTop: 24,
              minHeight: '200px',
              border: '1px dashed #e9e9e9',
              padding: '24px',
            }}
          >
            {stepsData[current].content}
          </div>
          <div style={{ marginTop: 24 }}>
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={prev} disabled={isFinished}>
                Anterior
              </Button>
            )}
            {current < stepsData.length - 1 && (
              <Button type="primary" onClick={next} disabled={isFinished}>
                Siguiente
              </Button>
            )}
            {current === stepsData.length - 1 && (
              <Button type="primary" onClick={finishSteps} disabled={isFinished}>
                {isFinished ? 'Finish' : 'Finalizar'}
              </Button>
            )}
          </div>
        </Panel>
        <Panel header="Collapse - Grupo de Steps 2" key="2">
          <p>Aquí podrías colocar otro grupo de steps o contenido relacionado.</p>
        </Panel>
      </Collapse>
    </div>
  );
};

export default CustodiaInterna;
