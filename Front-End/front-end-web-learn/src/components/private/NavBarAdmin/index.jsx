import "./NavBarAdmin.scss";
import React, { useState } from "react";
import URL from "../../../utils/url-route"
import {
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Col, Layout, Menu, Row, Dropdown, Avatar, Badge } from "antd";
import { clear_user } from "../../../redux/action/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const items = [
  {
    label: <Link to={URL.ADMIN.MANAGE_ADMIN}>Quản lý người dùng</Link>,
    key: "user",
    icon: <UserOutlined />,
  },
  {
    label:<Link to={URL.ADMIN.MANAGE_COURSE}>Quản lý khóa học</Link>,
    key: "course",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Quản lý loại khóa học",
    key: "TypeCourse",
    icon: <SettingOutlined />,
  },
  {
    label: "Quản lý lộ trình học",
    key: "menu",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Quản lý bài đăng",
    key: "post",
    icon: <AppstoreOutlined />,
  },
];

function NavBarAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clear_user());
    navigate("/");
  };
  return (
    <Layout className="home_admin">
      <Row>
        <Col xxl={20} xl={20}>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            className="container__menu_home_admin"
          />
        </Col>
        <Col xxl={4} xl={4}>
          <Dropdown
            className="container__menu_home_admin__acount"
            menu={{
              items: [
                {
                  key: "notif",
                  label: <Link>Thông báo</Link>,
                },
                {
                  label: <Link onClick={handleLogout}>Đăng xuất</Link>,
                  key: "log-out",
                },
              ],
            }}
            trigger={["click"]}
          >
            <div
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Badge count={1}>
                <Avatar
                  size={36}
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor: "#87d068",
                  }}
                />
              </Badge>

              <DownOutlined />
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Layout>
  );
}

export default NavBarAdmin;
