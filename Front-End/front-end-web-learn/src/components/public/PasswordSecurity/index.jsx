import React, { useState } from "react";
import "./PasswordSecurity.scss";
import { RightOutlined } from "@ant-design/icons";
import CommonModel from "../../share/CommonModel";
import { apiUserChangePassword } from "../../../services/private/auth";
function PasswordSecurityInfo() {
  const [isShowModel, setIsShowModel] = useState(false);
  const [dataModel, setDataModel] = useState({});
  const handleChangePassword = () => {
    setIsShowModel(true);
    setDataModel({
      title: "Đổi mật khẩu",
      desc: "Mật khẩu của bạn phải có tối thiểu 8 ký tự, bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%...).",
      field: [
        {
          type: "password",
          label: "Mật khẩu hiện tại",
          placeholder: "Nhập mật khẩu hiện tại của bạn",
          name: "password",
        },
        {
          type: "password",
          label: "Mật khẩu mới",
          placeholder: "Nhập mật khẩu mới của bạn",
          name: "newPassword",
        },
      ],
      btnSubmid: "Đổi mật khẩu",
      funcApi: apiUserChangePassword,
    });
  };

  return (
    <>
      <div className="password_security">
        <h1 className="password_security__title">Mật khẩu và bảo mật</h1>
        <p className="password_security__desc">
          Quản lý mật khẩu và cài đặt bảo mật.
        </p>
        <div className="password_security_section">
          <div className="password_security_section__password">
            <h2 className="password_security_section__password__title">
              Đăng nhập & khôi phục
            </h2>
            <p className="password_security_section__password__desc">
              Quản lý mật khẩu
            </p>
            <div
              className="password_security_section__password__content"
              onClick={handleChangePassword}
            >
              <div className="password_security_section__password__content__left">
                <h3>Đổi mật khẩu</h3>
                <span>Chưa đổi mật khẩu</span>
              </div>
              <div className="password_security_section__password__content__right">
                <RightOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonModel
        open={isShowModel}
        data={dataModel}
        setIsShowModel={setIsShowModel}
      />
    </>
  );
}

export default PasswordSecurityInfo;
