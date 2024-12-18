import React, { useEffect, useRef, useState } from "react";
import useNotify from "../../share/Notification";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../../utils/validation";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUserByUserName,
} from "../../../services/private/user";
import { Input, Select, Button, Tag, Table, Space, Modal } from "antd";
import StatisticView from "../share/StatisticView";
const { TextArea } = Input;
import "./ManageUser.scss";

function ManageUser() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const { contextHolder, notify } = useNotify();
  const [currId, setCurrId] = useState();
  const inputRefSubmid = useRef();
  const [formData, setFormData] = useState({
    id: "",
    userName: "",
    password: "",
    email: "",
    gender: "",
    phonenumber: "",
    avatar: "",
    cover_photo: "",
    role: "USER",
    active: 1,
    description: "",
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRenderData, setIsRenderData] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2,
    total: 0, // Tổng số bản ghi
  });

  const fetchData = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await fetchUsers(page, pageSize);
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
  }, [isRenderData]);

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

  const handleSubmid = async () => {
    const { id, userName, password, email, phonenumber } = formData;
    if (!userName || userName.length < 4) {
      notify("warning", "Tên người dùng tối thiểu phải từ 4 ký tự trở lên");
      return;
    }
    if (!email || !validateEmail(email)) {
      notify("warning", "Địa chỉ email không hợp lệ, vui lòng kiểm tra lại");
      return;
    }
    if (phonenumber && !validatePhoneNumber(phonenumber)) {
      notify("warning", "Định dạng số điện thoại không hợp lệ");
      return;
    }
    if (id) {
      const response = await updateUser(
        {
          ...formData,
          password,
        },
        id
      );
      if (response && response.status === 200) {
        notify("success", "Cập nhật người dùng thành công");
        setIsRenderData(!isRenderData);
      } else {
        notify("error", response.message);
      }
      setFormData({
        id: "",
        userName: "",
        password: "",
        email: "",
        gender: "",
        phonenumber: "",
        avatar: "",
        cover_photo: "",
        role: "",
        active: 0,
        description: "",
      });
      inputRefSubmid.current.textContent = "Tạo mới người dùng";
    } else {
      if (!password || validatePassword(password)) {
        notify("warning", "Mật khẩu phải có tối thiểu từ 6 kí tự trở lên");
        return;
      }
      const response = await createUser(formData);
      if (response && response.status === 200) {
        notify("success", "Thêm người dùng mới thành công");
        setIsRenderData(!isRenderData);
        setFormData({
          id: "",
          userName: "",
          password: "",
          email: "",
          gender: "",
          phonenumber: "",
          avatar: "",
          cover_photo: "",
          role: "",
          active: 0,
          description: "",
        });
      } else {
        notify("error", response.message);
      }
      inputRefSubmid.current.textContent = "Tạo mới người dùng";
    }
  };

  const handleUpdateUser = (user) => {
    inputRefSubmid.current.textContent = "Cập nhật người dùng";
    setFormData({
      ...user,
      userName: user?.user_name,
    });
  };

  const handleDisabledAcount = (id) => {
    setCurrId(id);
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleSubmidDisabledAcount = async () => {
    if (currId) {
      const response = await deleteUser(currId);
      if (response && response.status === 200) {
        notify("success", "Vô hiệu hóa tài khoản thành công");
        setIsShowModal(false);
        setIsRenderData(!isRenderData);
      } else {
        notify("error", response.message);
      }
    }
  };

  const handleOnchangeInputSearch = (event) => {
    setInputSearch(event.target.value);
  };

  const handleSearch = async () => {
    const { status, message, result } = await searchUserByUserName(inputSearch);
    if (status === 200) {
      setUsers((prev) => ({
        ...prev,
        result: {
          ...prev.result,
          users: result,
        },
      }));

      setPagination({
        ...pagination,
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: result.length, // Tổng số bản ghi
      });
    } else {
      notify("error", message);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="manage-user">
        <h1 className="manage-user__title">Quản lý người dùng</h1>
        <StatisticView
          data={[
            {
              title: "Tổng số người dùng trong hệ thống",
              value:
                users && users?.result?.users?.length > 0
                  ? users.result.total_user
                  : 0,
            },
            {
              title: "Số người dùng đã đăng ký khóa học",
              value:
                users && users?.result?.users?.length > 0
                  ? users.result.total_register_course
                  : 0,
            },
            {
              title: "Số tài khoản chưa đăng ký khóa học",
              value:
                users && users?.result?.users?.length > 0
                  ? users.result.total_unregister_course
                  : 0,
            },
            {
              title: "Số tài khoản bị vô hiệu hóa",
              value:
                users && users?.result?.users?.length > 0
                  ? users.result.total_user_disable
                  : 0,
            },
          ]}
        />
        <div className="manage-user__content">
          <div className="manage-user__item">
            <label htmlFor="username">
              Tên đăng nhập
              <span>*</span>
            </label>
            <Input
              key={"username"}
              onChange={handleOnchangeInput}
              value={formData.userName}
              name="userName"
              showCount
              minLength={4}
              maxLength={50}
            />
          </div>
          <div className="manage-user__item">
            <label htmlFor="password">
              Mật khẩu
              <span>*</span>
            </label>
            <Input.Password
              value={formData.password}
              onChange={handleOnchangeInput}
              name="password"
              showCount
              maxLength={100}
            />
          </div>
          <div className="manage-user__item">
            <label htmlFor="email">
              Email
              <span>*</span>
            </label>
            <Input
              onChange={handleOnchangeInput}
              value={formData.email}
              name="email"
              showCount
              maxLength={255}
            />
          </div>
          <div className="manage-user__item">
            <label htmlFor="gender">Giới tính</label>
            <Select
              name="gender"
              onChange={(value) =>
                handleOnchangeInput(value, { name: "gender" })
              }
              value={formData.gender}
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
              value={formData.phonenumber}
              name="phonenumber"
              showCount
              maxLength={20}
            />
          </div>

          <div className="manage-user__item">
            <label htmlFor="avatar">Ảnh đại diện</label>
            <Input
              onChange={(e) => {
                handleOnchangeInput(e);
                document.querySelector(".preview_avatar").src = e.target.value;
              }}
              value={formData.avatar}
              name="avatar"
            />
            {formData.avatar && (
              <img
                src={formData.avatar}
                className="preview_avatar"
                alt="preview_avatar"
              />
            )}
          </div>
          <div className="manage-user__item">
            <label htmlFor="cover_photo">Ảnh bìa</label>
            <Input
              onChange={(e) => {
                handleOnchangeInput(e);
                document.querySelector(".preview_cover_photo").src =
                  e.target.value;
              }}
              value={formData.cover_photo}
              name="cover_photo"
            />
            {formData.cover_photo && (
              <img
                src={formData.cover_photo}
                className="preview_cover_photo"
                alt="preview_cover_photo"
              />
            )}
          </div>
          <div className="manage-user__item">
            <label htmlFor="role">
              Vai trò
              <span>*</span>
            </label>
            <Select
              name={"role"}
              onChange={(value) => handleOnchangeInput(value, { name: "role" })}
              style={{
                width: 120,
              }}
              value={formData.role}
              defaultValue={"USER"}
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
            <label htmlFor="active">
              Trạng thái tài khoản
              <span>*</span>
            </label>
            <Select
              name={"active"}
              onChange={(value) =>
                handleOnchangeInput(value, { name: "active" })
              }
              value={formData.active}
              style={{
                width: 120,
              }}
              defaultValue={1}
              options={[
                {
                  value: 1,
                  label: "Hoạt động",
                },
                {
                  value: 0,
                  label: "Không hoạt động",
                },
              ]}
            />
          </div>
          <div className="manage-user__item">
            <label htmlFor="description">Mô tả</label>
            <TextArea
              name="description"
              value={formData.description}
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
          <Button type="primary" ref={inputRefSubmid} onClick={handleSubmid}>
            Tạo mới người dùng
          </Button>
        </div>
        <div className="manage-user__search">
          <Input
            placeholder="Nhập vào tên người dùng..."
            value={inputSearch}
            onChange={handleOnchangeInputSearch}
          />
          <Button type="primary" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </div>
        <h2 className="manage-user__list-user">Danh sách người dùng</h2>
        <div className="manage-user__list">
          <Table
            className="manage-course__list__table"
            bordered
            columns={[
              {
                title: "ID",
                dataIndex: "id",
              },
              {
                title: "Tên người dùng",
                dataIndex: "user_name",
                minWidth: 150,
              },
              {
                title: "Giới tính",
                dataIndex: "gender",
                minWidth: 100,
              },
              {
                title: "Email",
                dataIndex: "email",
                minWidth: 200,
              },
              {
                title: "Số Điện Thoại",
                dataIndex: "phonenumber",
                minWidth: 150,
              },
              {
                title: "Ảnh đại diện",
                dataIndex: "avatar",
                minWidth: 150,
                render: (_, object) => {
                  return <img src={object?.avatar} alt={object?.user_name} />;
                },
              },
              {
                title: "Ảnh bìa",
                dataIndex: "cover_photo",
                minWidth: 150,
                render: (_, object) => {
                  return (
                    <img src={object?.cover_photo} alt={object?.cover_photo} />
                  );
                },
              },
              {
                title: "Số điểm tích lũy",
                dataIndex: "point",
                minWidth: 100,
              },
              {
                title: "Trạng thái tài khoản",
                dataIndex: "active",
                minWidth: 100,
                render: (_, { active }) => (
                  <>
                    <Tag color={active == 1 ? "success" : "error"}>
                      {active == 1 ? "Hoạt động" : "Không hoạt động"}
                    </Tag>
                  </>
                ),
              },
              {
                title: "Quyền",
                key: "role",
                dataIndex: "role",
                minWidth: 100,
              },
              {
                title: "Mô tả",
                key: "description",
                dataIndex: "description",
                minWidth: 200,
              },
              {
                title: "Ngày tạo tài khoản",
                dataIndex: "createAt",
                minWidth: 200,
              },
              {
                title: "Ngày cập nhật gần nhất",
                dataIndex: "updateAt",
                minWidth: 200,
              },
              {
                title: "Hành động",
                key: "action",
                minWidth: 200,
                render: (_, record) => (
                  <>
                    <Space size="middle">
                      <Button>Chi tiết người dùng</Button>
                      <Button onClick={() => handleUpdateUser(record)}>
                        Cập nhật người dùng
                      </Button>
                      <Button onClick={() => handleDisabledAcount(record.id)}>
                        Vô hiệu hóa tài khoản
                      </Button>
                    </Space>
                  </>
                ),
              },
            ]}
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
      <Modal
        open={isShowModal}
        onCancel={handleCloseModal}
        onClose={handleCloseModal}
        title={<h1>Thông báo</h1>}
        centered
        okText={"Tôi đồng ý"}
        cancelText={"Thoát"}
        className="manage-warn"
        onOk={handleSubmidDisabledAcount}
      >
        <strong>
          Việc bạn vô hiệu hóa tài khoản sẽ dẫn tới tài khoản đó sẽ không thể
          tham gia học tập cũng như trải nhiệm các dịch vụ của hệ thống. Bạn có
          chắc chắn điều này không?
        </strong>
      </Modal>
    </>
  );
}

export default ManageUser;
