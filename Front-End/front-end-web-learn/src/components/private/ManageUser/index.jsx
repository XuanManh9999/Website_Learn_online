import React, { useState } from "react";
import {
  Input,
  Select,
  Button,
  Tag,
  Table,
  Space,
  Card,
  Col,
  Row,
  Statistic,
} from "antd";
const { TextArea } = Input;
import "./ManageUser.scss";
const columns = [
  {
    title: "ID",
    dataIndex: "key",
    key: "key",
    width: 150,
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tên người dùng",
    dataIndex: "user_name",
    key: "user_name",
    width: 100,
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    key: "gender",
    width: 200,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 200,
  },
  {
    title: "Số Điện Thoại",
    dataIndex: "phonenumber",
    key: "phonenumber",
    width: 150,
  },
  {
    title: "Ảnh đại diện",
    dataIndex: "avatar",
    key: "avatar",
    width: 200,
  },
  {
    title: "Ảnh bìa",
    dataIndex: "cover_photo",
    key: "cover_photo",
    width: 200,
  },
  {
    title: "Ảnh bìa",
    key: "tags",
    dataIndex: "tags",
    width: 150,
  },
  {
    title: "Số điểm tích lũy",
    dataIndex: "point",
    key: "point",
    width: 200,
  },
  {
    title: "Trạng thái tài khoản",
    dataIndex: "point",
    key: "point",
    width: 200,
  },
  {
    title: "Quyền",
    key: "role",
    dataIndex: "role",
    width: 150,
  },
  {
    title: "Ngày tạo tài khoản",
    dataIndex: "created_at",
    key: "created_at",
    width: 200,
  },
  {
    title: "Ngày cập nhật gần nhất",
    dataIndex: "updated_at",
    key: "updated_at",
    width: 200,
  },
  {
    title: "Hành động",
    key: "action",
    width: 150,
    render: (_, record) => (
      <Space size="middle">
        <Button>Cập nhật người dùng</Button>
        <Button>Xóa người dùng</Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: 1,
    user_name: "Nguyễn Xuân Mạnh",
    gender: "Nam",
    email: "20210794@eaut.edu.vn",
    phonenumber: "0559517003",
    description: "Tôi là mạnh tôi 20 tuổi",
    avatar: "img",
    cover_photo: "cover_photo",
    point: 0,
    role: "ADMIN",
    active: "Hoạt động",
    created_at: "20/11/2024",
    updated_at: "21/11/2024",
  },
  {
    key: 1,
    user_name: "Nguyễn Xuân Mạnh",
    gender: "Nam",
    email: "20210794@eaut.edu.vn",
    phonenumber: "0559517003",
    description: "Tôi là mạnh tôi 20 tuổi",
    avatar: "img",
    cover_photo: "cover_photo",
    point: 0,
    role: "ADMIN",
    active: "Hoạt động",
    created_at: "20/11/2024",
    updated_at: "21/11/2024",
  },
  {
    key: 1,
    user_name: "Nguyễn Xuân Mạnh",
    gender: "Nam",
    email: "20210794@eaut.edu.vn",
    phonenumber: "0559517003",
    description: "Tôi là mạnh tôi 20 tuổi",
    avatar: "img",
    cover_photo: "cover_photo",
    point: 0,
    role: "ADMIN",
    active: "Hoạt động",
    created_at: "20/11/2024",
    updated_at: "21/11/2024",
  },
  {
    key: 1,
    user_name: "Nguyễn Xuân Mạnh",
    gender: "Nam",
    email: "20210794@eaut.edu.vn",
    phonenumber: "0559517003",
    description: "Tôi là mạnh tôi 20 tuổi",
    avatar: "img",
    cover_photo: "cover_photo",
    point: 0,
    role: "ADMIN",
    active: "Hoạt động",
    created_at: "20/11/2024",
    updated_at: "21/11/2024",
  },
  {
    key: 1,
    user_name: "Nguyễn Xuân Mạnh",
    gender: "Nam",
    email: "20210794@eaut.edu.vn",
    phonenumber: "0559517003",
    description: "Tôi là mạnh tôi 20 tuổi",
    avatar: "img",
    cover_photo: "cover_photo",
    point: 0,
    role: "ADMIN",
    active: "Hoạt động",
    created_at: "20/11/2024",
    updated_at: "21/11/2024",
  },
  {
    key: 1,
    user_name: "Nguyễn Xuân Mạnh",
    gender: "Nam",
    email: "20210794@eaut.edu.vn",
    phonenumber: "0559517003",
    description: "Tôi là mạnh tôi 20 tuổi",
    avatar: "img",
    cover_photo: "cover_photo",
    point: 0,
    role: "ADMIN",
    active: "Hoạt động",
    created_at: "20/11/2024",
    updated_at: "21/11/2024",
  },
];
function ManageUser() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    gender: "",
    phonenumber: "",
    avatar: "",
    cover_photo: "",
    role: "",
    active: "",
    description: "",
  });

  const handleOnchangeInput = (value, option) => {
    if (option) {
      const name = option.name || option.props.name;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const { name, value:valueData } = value?.target;
      setFormData((prev) => ({
        ...prev,
        [name]: valueData,
      }));
    }
  };

  return (
    <div className="manage-user">
      <h1 className="manage-user__title">Quản lý người dùng</h1>
      <div className="manage-user__infoes">
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số người dùng trong hệ thống"
                value={300}
                valueStyle={{
                  color: "#3f8600",
                }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Số người dùng đã đăng ký khóa học"
                value={200}
                valueStyle={{
                  color: "#3f8600",
                }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Số tài khoản chưa đăng ký khóa học"
                value={100}
                valueStyle={{
                  color: "#cf1322",
                }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Số tài khoản bị vô hiệu hóa"
                value={100}
                valueStyle={{
                  color: "#cf1322",
                }}
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div className="manage-user__content">
        <div className="manage-user__item">
          <label htmlFor="username">Tên đăng nhập</label>
          <Input
            key={"username"}
            onChange={handleOnchangeInput}
            name="username"
            showCount
            maxLength={255}
          />
        </div>
        <div className="manage-user__item">
          <label htmlFor="password">Mật khẩu</label>
          <Input.Password
            onChange={handleOnchangeInput}
            name="password"
            showCount
            maxLength={255}
          />
        </div>
        <div className="manage-user__item">
          <label htmlFor="email">Email</label>
          <Input
            onChange={handleOnchangeInput}
            name="email"
            showCount
            maxLength={255}
          />
        </div>
        <div className="manage-user__item">
          <label htmlFor="gender">Giới tính</label>
          <Select
            name="gender"
            onChange={(value) => handleOnchangeInput(value, { name: "gender" })}
            options={[
              { value: "Nam", label: "Nam" },
              { value: "Nữ", label: "Nữ" },
              { value: "Khác", label: "Khác" },
            ]}
          />
        </div>
        <div className="manage-user__item">
          <label htmlFor="phonenumber">Số điện thoại</label>
          <Input
            onChange={handleOnchangeInput}
            name="phonenumber"
            showCount
            maxLength={255}
          />
        </div>

        <div className="manage-user__item">
          <label htmlFor="avatar">Ảnh đại diện</label>
          <Input
            onChange={(e) => {
              handleOnchangeInput(e);
              document.querySelector(".preview_avatar").src = e.target.value;
            }}
            name="avatar"
          />
          <img src="" className="preview_avatar" alt="preview_avatar" />
        </div>
        <div className="manage-user__item">
          <label htmlFor="cover_photo">Ảnh bìa</label>
          <Input
            onChange={(e) => {
              handleOnchangeInput(e);
              document.querySelector(".preview_cover_photo").src =
                e.target.value;
            }}
            name="cover_photo"
          />
          <img
            src=""
            className="preview_cover_photo"
            alt="preview_cover_photo"
          />
        </div>
        <div className="manage-user__item">
          <label htmlFor="role">Vai trò</label>
          <Select
            name={"role"}
            onChange={(value) => handleOnchangeInput(value, { name: "role" })}
            style={{
              width: 120,
            }}
            options={[
              {
                value: "ADMIN",
                label: "Admin",
              },
              {
                value: "USER",
                label: "User",
              },
            ]}
          />
        </div>
        <div className="manage-user__item">
          <label htmlFor="active">Trạng thái tài khoản</label>
          <Select
            name={"active"}
            onChange={(value) => handleOnchangeInput(value, { name: "active" })}
            style={{
              width: 120,
            }}
            options={[
              {
                value: "1",
                label: "Hoạt động",
              },
              {
                value: "0",
                label: "Không hoạt động",
              },
            ]}
          />
        </div>
        <div className="manage-user__item">
          <label htmlFor="description">Mô tả</label>
          <TextArea
            name="description"
            onChange={handleOnchangeInput}
            showCount
            maxLength={255}
            autoSize={{
              minRows: 4,
              maxRows: 6,
            }}
          />
        </div>
      </div>
      <div className="manage-user__button">
        <Button type="primary">Tạo mới người dùng</Button>
        <Button type="primary">Tìm kiếm</Button>
      </div>
      <h2 className="manage-user__list-user">Danh sách người dùng</h2>
      <div className="manage-user__list">
        <Table
          pagination={{
            pageSize: 5, // Hiển thị 5 hàng mỗi trang
          }}
          className="manage-user__list__table"
          bordered
          columns={columns}
          dataSource={data}
          scroll={{
            x: 50,
          }}
        />
      </div>
    </div>
  );
}

export default ManageUser;
