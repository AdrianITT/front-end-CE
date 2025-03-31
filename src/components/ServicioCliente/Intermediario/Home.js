import React, { useEffect, useState } from "react";
//import "./index.css";
import { Card, Col, Row, Space, Progress } from "antd";

import {

  FireTwoTone ,
  UserOutlined,
  SolutionOutlined ,
  ExperimentTwoTone,
  SignatureOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="App">
      <div className="contencenter">
        <br />
        <Space size ={0}>
          <Row gutter={[0, 0]} justify="center">
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <div>
                <Link to="/servicioCliente">
                  <Card className="card-custom" title="Servicio a Cliente" bordered={false}>
                    <div className="icon-container">
                    <SolutionOutlined />
                    </div>
                  </Card>
                </Link>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <div>
                <Link to="/CustodiaExterna">
                  <Card className="card-custom" title="Custodia Externa" bordered={false}>
                    <div className="icon-container">
                    {/* <FileTextOutlined />*/}
                    <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" fill="currentColor" class="bi bi-hammer" viewBox="0 0 16 16">
                      <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5 5 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334"/>
                    </svg>
                    </div>
                  </Card>
                </Link>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <div>
                <Link to="/HomeLaboratorio">
                  <Card className="card-custom" title="Laboratorio" bordered={false}>
                    <div className="icon-container">
                    <ExperimentTwoTone />
                    </div>
                  </Card>
                </Link>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <div>
                <Link to="/home">
                  <Card className="card-custom" title="Ambiente Laboral" bordered={false}>
                    <div className="icon-container">
                    <UserOutlined />
                    </div>
                  </Card>
                </Link>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <div>
                <Link to="/home">
                  <Card className="card-custom" title="Fuentes Fijas" bordered={false}>
                    <div className="badge-container">
                    </div>
                    <div className="icon-container">
                    <FireTwoTone />
                    </div>
                  </Card>
                </Link>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="col-style">
              <div>
                <Link to="/home">
                  <Card className="card-custom" title="Gestion Ambiental" bordered={false}>
                    <div className="badge-container">
                    </div>
                    <div className="icon-container">
                    <SignatureOutlined />
                    </div>
                  </Card>
                </Link>
              </div>
            </Col>
          </Row>

        </Space>
      </div>
    </div>
  );
};

export default Home;
