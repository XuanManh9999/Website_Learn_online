import React from "react";
import "./FooterLearning.scss";
import { Button } from "antd";
import { LeftOutlined, RightOutlined, ArrowRightOutlined } from "@ant-design/icons";
function FooterLearning() {
  return (
    <footer className="container-footer-learning">
      <Button
        className="container-footer-learning__prev-subject"
        icon={<LeftOutlined />}
      >
        Bài trước
      </Button>
      <Button
        className="container-footer-learning__next-subject"
        type="primary"
      >
        Bài tiếp theo <RightOutlined />
      </Button>
      <div className="container-footer-learning__track-title">
        <h3>1. Khái niệm kỹ thuật cần biết</h3>
        <div className="container-footer-learning__track-title__icon">
          <ArrowRightOutlined />
        </div>
      </div>
    </footer>
  );
}

export default FooterLearning;
