import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import "./StatisticView.scss"
function StatisticView({ data = [] }) {
  return (
    <div className="manage-statistic">
      <Row gutter={16}>
        {(data || []).map((item, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic
                title={item.title}
                value={item.value}
                valueStyle={{
                  color: "#3f8600",
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default StatisticView;
