import React from 'react';
import { Button, Collapse, Input, Typography, Row, Col} from 'antd';

const { Title } = Typography;
const { Panel } = Collapse;

const DoTaskCustodiaInterna = () => {
  const renderInputs = () => (
    <>
      {[1, 2, 3].map((_, idx) => (
        <Row key={idx} gutter={16} align="middle" style={{ marginBottom: 12 }}>
          <Col span={6}>
            <span><strong>dfjgldfk :</strong></span>
          </Col>
          <Col span={12}>
            <Input placeholder="Add text" />
          </Col>
          <Col span={6}>
            <Button type="primary">Botón</Button>
          </Col>
        </Row>
      ))}
    </>
  );

  return (
    <div style={{ padding: 32 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Title level={4} underline>ID laboratorio</Title>
        <Button type="primary">Realizado</Button>
      </Row>

      {[1, 2, 3].map((_, idx) => (
        <Collapse key={idx} defaultActiveKey={['1']} style={{ marginBottom: 16 }}>
          <Panel header="Bitacoras del parámetro" key="1">
            {renderInputs()}
          </Panel>
        </Collapse>
      ))}
    </div>
  );
};

export default DoTaskCustodiaInterna;
