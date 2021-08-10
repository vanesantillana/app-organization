import React from "react";
import { Row, Col, Statistic, Empty, Card } from "antd";
import {
  getNominalTotal,
  isSameMonth,
  getPeopleHired,
} from "../functions/helper";

const ResumeVíew = ({ data, selectedDate }) => {
  const newData = data.filter((item) => isSameMonth(item.month, selectedDate));
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <Statistic
            title="Número de Contradados"
            value={getPeopleHired(newData).length || 0}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Nómina Total"
            value={getNominalTotal(newData)}
            precision={2}
          />
        </Card>
      </Col>
    </Row>
  );
};

const Resume = ({ data, selectedDate }) =>
  !!data ? (
    <ResumeVíew data={data} selectedDate={selectedDate} />
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );

export default Resume;
