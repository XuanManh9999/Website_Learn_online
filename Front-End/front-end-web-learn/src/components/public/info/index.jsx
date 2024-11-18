import React from "react";
import { useSelector } from "react-redux";
import { RightOutlined } from "@ant-design/icons";
import "./Info.scss";
import { selectorUser } from "../../../redux/selector";
function Info() {
  const {
    payload: {id, user_name, avatar, email},
  } = useSelector(selectorUser);
  return (
    <div className="container-setting-info">
      <h1>Thông tin cá nhân</h1>
      <p className="p-h1">Quản lý thông tin cá nhân của bạn</p>

      <h2>Thông tin cơ bản</h2>
      <p className="p-h2">
        Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.
      </p>
      <div className="container-setting-info--section">
        <div className="container-setting-info--section__content">
          <h4>Email</h4>
          <span>{email}</span>
        </div>
        <RightOutlined className="container-setting-info--section__content--item" />
      </div>
      <div className="container-setting-info--section">
        <div className="container-setting-info--section__content">
          <h4>Tên người dùng</h4>
          <span>{user_name}</span>
        </div>
        <RightOutlined className="container-setting-info--section__content--item" />
      </div>
      <div className="container-setting-info--section">
        <div className="container-setting-info--section__content">
          <h4>Giới thiệu</h4>
          <span>Chưa cập nhật</span>
        </div>
        <RightOutlined className="container-setting-info--section__content--item" />
      </div>
      <div className="container-setting-info--section">
        <div className="container-setting-info--section__content">
          <h4>Ảnh đại diện</h4>
          <img
            src={avatar}
            alt="avatar"
          />
        </div>
        <RightOutlined className="container-setting-info--section__content--item" />
      </div>
      <div className="container-setting-info--section">
        <div className="container-setting-info--section__content">
          <h4>Ảnh bìa</h4>
          <span>Chưa cập nhật</span>
        </div>
        <RightOutlined className="container-setting-info--section__content--item" />
      </div>

      <h2>Thông tin mạng xã hội</h2>
      <p className="p-h2">
        Quản lý liên kết tới các trang mạng xã hội của bạn.
      </p>
      <div className="container-setting-info--section">
        <div className="container-setting-info--section__content">
          <h4>Trang web cá nhân</h4>
          <span>Chưa cập nhật</span>
        </div>
        <RightOutlined className="container-setting-info--section__content--item" />
      </div>
      <div className="container-setting-info--section">
        <div className="container-setting-info--section__content">
          <h4>Github</h4>
          <span>Chưa cập nhật</span>
        </div>
        <RightOutlined className="container-setting-info--section__content--item" />
      </div>
      <div className="container-setting-info--section">
        <div className="container-setting-info--section__content">
          <h4>LinkedIn</h4>
          <span>Chưa cập nhật</span>
        </div>
        <RightOutlined className="container-setting-info--section__content--item" />
      </div>
      <div className="container-setting-info--section">
        <div className="container-setting-info--section__content">
          <h4>Facebook</h4>
          <span>Chưa cập nhật</span>
        </div>
        <RightOutlined className="container-setting-info--section__content--item" />
      </div>
      <div className="container-setting-info--section">
        <div className="container-setting-info--section__content">
          <h4>Youtube</h4>
          <span>Chưa cập nhật</span>
        </div>
        <RightOutlined className="container-setting-info--section__content--item" />
      </div>
      <div className="container-setting-info--section">
        <div className="container-setting-info--section__content">
          <h4>TikTok</h4>
          <span>Chưa cập nhật</span>
        </div>
        <RightOutlined className="container-setting-info--section__content--item" />
      </div>
    </div>
  );
}

export default Info;
