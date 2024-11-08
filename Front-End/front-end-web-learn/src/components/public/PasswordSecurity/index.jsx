import React from "react";
import "./PasswordSecurity.scss";
import { RightOutlined } from "@ant-design/icons";
function PasswordSecurityInfo() {
  return (
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
          <div className="password_security_section__password__content">
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
  );
}

export default PasswordSecurityInfo;
