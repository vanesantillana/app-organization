import "antd/dist/antd.css";
import "./App.css";

import {
  Button,
  Col,
  DatePicker,
  Layout,
  Row,
  Modal,
  Table,
  Divider,
} from "antd";
import React, { useRef, useState } from "react";
import readXlsxFile from "read-excel-file";
import Resume from "./components/Resume";
import Tree from "./components/Tree";
import { schemaToHeader } from "./functions/helper";
import { formatExcelSchema } from "./functions/readExcel";
const { Header, Content } = Layout;

function App() {
  const [previewHeader, setPreviewHeader] = useState([]);
  const [previewContent, setPreviewContent] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orgData, setOrgData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const inputFile = useRef(null);

  function onChangeDate(date) {
    const formatDate = new Date(date);
    setSelectedDate(formatDate);
    setOrgData(null);
    setTimeout(() => {
      previewContent.length > 0 && setOrgData(previewContent);
    }, 100);
  }

  const openFileDialog = () => {
    inputFile.current.click();
  };

  const onChangeInputFile = (event) => {
    const file = event.target.files[0];
    event.target.value = null;
    const schema = formatExcelSchema();
    showModal();
    readXlsxFile(file, { schema }).then((result) => {
      const { rows } = result;
      const header = schemaToHeader(schema);
      setPreviewContent(rows);
      setPreviewHeader(header);
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log(JSON.stringify(previewContent));
    setOrgData(null);
    setTimeout(() => {
      previewContent.length > 0 && setOrgData(previewContent);
    }, 100);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="App">
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <Row justify="space-between">
            <Col span={8}>
              <DatePicker
                placeholder="Elegir el mes"
                onChange={onChangeDate}
                picker="month"
              />
            </Col>
            <Col span={8} offset={8} style={{ textAlign: "right" }}>
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={(event) => onChangeInputFile(event)}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
              <Button onClick={openFileDialog} type="primary" shape="round">
                Subir archivo
              </Button>
            </Col>
          </Row>
        </Header>

        <Content
          className="site-layout"
          style={{ padding: "0 1rem", marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: "2rem 0", minHeight: 580 }}
          >
            <div className="organigram">
              <Tree data={orgData} selectedDate={selectedDate} />
            </div>
            <Divider />
            <Resume data={orgData} selectedDate={selectedDate} />
          </div>
        </Content>

        <Modal
          title="Previsualización"
          cancelText="Cancelar"
          okText="Confirmar datos"
          visible={isModalVisible}
          onOk={handleOk}
          width={1300}
          onCancel={handleCancel}
        >
          <Table
            dataSource={previewContent}
            columns={previewHeader}
            pagination={false}
          />
        </Modal>
      </Layout>
    </div>
  );
}

export default App;
