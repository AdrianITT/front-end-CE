//import React, { useEffect, useState } from "react";
import "../../index.css";
import { Card, Col, Row, Space} from "antd";

import {
  UserOutlined,
  FileTextOutlined,
  FileSearchOutlined ,
  ExperimentFilled,
  BookTwoTone ,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const HomeLaboratorio = () => {

  return (
    <div className="App">
      <div className="contencenter">
        <br />
        <Space size ={0}>
          <Row gutter={[16,16]} justify="center">
            <Col xs={26} sm={14} md={10} lg={8} xl={6} className="col-style">
              <div>
                <Link to="/Muestras">
                  <Card className="card-custom" title="Muestras" bordered={false}>
                    <div className="icon-container">
                    <ExperimentFilled/>
                    </div>
                  </Card>
                </Link>
              </div>
            </Col>
            <Col xs={26} sm={14} md={10} lg={8} xl={6} className="col-style">
              <div>
                <Link to="/home">
                  <Card className="card-custom" title="Bitacoras" bordered={false}>
                    <div className="icon-container">
                    <BookTwoTone />
                    </div>
                  </Card>
                </Link>
              </div>
            </Col>
            <Col xs={26} sm={14} md={10} lg={8} xl={6} className="col-style">
              <div>
                <Link to="/CustodiaInterna">
                  <Card className="card-custom" title="Custodia interna" bordered={false}>
                    <div className="icon-container">
                    <FileSearchOutlined />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
  <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708zM2 12.707l7-7L10.293 7l-7 7H2z"/>
</svg>
                    </div>
                  </Card>
                </Link>
              </div>
            </Col>
            {/*
            <Col xs={26} sm={14} md={10} lg={8} xl={6} className="col-style">
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
             */}
          </Row>

        </Space>
      </div>
    </div>
  );
};

export default HomeLaboratorio;
