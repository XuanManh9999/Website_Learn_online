import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../../services/private/user";
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
    dataIndex: "id",
    width: 150,
  },
  {
    title: "Tên người dùng",
    dataIndex: "user_name",
    width: 100,
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    width: 200,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 200,
  },
  {
    title: "Số Điện Thoại",
    dataIndex: "phonenumber",
    width: 150,
  },
  {
    title: "Ảnh đại diện",
    dataIndex: "avatar",
    width: 200,
    render: (_, object) => {
      return <img src={object?.avatar} alt={object?.user_name} />;
    },
  },
  {
    title: "Ảnh bìa",
    dataIndex: "cover_photo",
    width: 200,
    render: (_, object) => {
      return <img src={object?.cover_photo} alt={object?.cover_photo} />;
    },
  },
  {
    title: "Số điểm tích lũy",
    dataIndex: "point",
    width: 200,
  },
  {
    title: "Trạng thái tài khoản",
    dataIndex: "actice",
    width: 200,
    render: (_, { actice }) => (
      <>
        <Tag color={actice == 1 ? "success" : "error"}>
          {actice == 1 ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      </>
    ),
  },
  {
    title: "Quyền",
    key: "role",
    dataIndex: "role",
    width: 150,
  },
  {
    title: "Ngày tạo tài khoản",
    dataIndex: "createAt",
    width: 200,
  },
  {
    title: "Ngày cập nhật gần nhất",
    dataIndex: "updateAt",
    width: 200,
  },
  {
    title: "Hành động",
    key: "action",
    width: 150,
    render: (_, record) => (
      <>
        <Space size="middle">
          <Button>Chi tiết người dùng</Button>
          <Button>Cập nhật người dùng</Button>
        </Space>
        <Space>
          <Button>Xóa người dùng</Button>
        </Space>
      </>
    ),
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

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0, // Tổng số bản ghi
  });

  const fetchData = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await fetchUsers(page, pageSize);
      // Giả sử server trả về { data, total }
      setUsers(response);
      setPagination({
        ...pagination,
        current: page,
        pageSize: pageSize,
        total: response.result.total_user, // Tổng số bản ghi
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);

  const handleOnchangeInput = (value, option) => {
    if (option) {
      const name = option.name || option.props.name;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const { name, value: valueData } = value?.target;
      setFormData((prev) => ({
        ...prev,
        [name]: valueData,
      }));
    }
  };

  console.log("Xuan manh check ", users);

  return (
    <div className="manage-user">
      <h1 className="manage-user__title">Quản lý người dùng</h1>
      <div className="manage-user__infoes">
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số người dùng trong hệ thống"
                value={users?.result?.total_user || 0}
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
                value={users?.result?.total_register_course || 0}
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
                value={users?.result?.total_unregister_course || 0}
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
                value={users?.result?.total_user_disable || 0}
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
          className="manage-user__list__table"
          bordered
          columns={columns}
          dataSource={users?.result?.users ?? []}
          scroll={{
            x: 100,
          }}
          rowKey={(record) => record.id} // Khóa duy nhất cho từng hàng
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}

export default ManageUser;
