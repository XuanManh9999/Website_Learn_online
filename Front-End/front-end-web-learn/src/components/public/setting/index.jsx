import React, { useEffect } from "react";
import {
  CloseOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { Link, Outlet } from "react-router-dom";
import Layout from "antd/es/layout/layout";
import "./Setting.scss";
import { Col, Row, Segmented, Menu } from "antd";
export default function Setting() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/setting/my-info");
  }, []);
  return (
    <main className="main-container-setting">
      <Layout className="container-setting">
        <Row className="container-setting__content">
          <Col span={8} className="container-setting__content--left">
            <img
              src="https://i.ibb.co/WGwmWhQ/DALL-E-2024-10-24-18-11-13-A-logo-of-a-circular-shape-resembling-a-stylized-C-in-harmonious-gradient.webp"
              alt="Logo"
            />
            <h1>Cài đặt tài khoản</h1>
            <p>
              Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt
              bảo mật, quản lý thông báo, v.v.
            </p>
            <Menu
              className="container-setting__content--left__menu"
              defaultSelectedKeys={"sub1"}
              items={[
                {
                  key: "sub1",
                  label: <Link to={"my-info"}>Thông tin cá nhân</Link>,
                  icon: <UserOutlined />,
                },
                {
                  key: "sub2",
                  label: (
                    <Link to={"change-password"}>Mật khẩu và bảo mật</Link>
                  ),
                  icon: <SafetyCertificateOutlined />,
                },
              ]}
            />
          </Col>
          <Col span={16} className="container-setting__content--reight">
            <Link to={"/"} className="container-setting__content--reight-icon">
              <CloseOutlined className="container-setting__content--reight-icon__close" />
            </Link>
            <Outlet />
          </Col>
        </Row>
      </Layout>
    </main>
  );
}
