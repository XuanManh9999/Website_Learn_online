import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OptionAuth.scss";
import { Input, Button } from "antd";
import ModelOtp from "../ModelOtp";
import useNotify from "../Notification";
import {
  apiLogin,
  apiRegister,
  apiForgotPassword,
} from "../../../services/public/auth";
import { validateEmail } from "../../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { apiGetInfo } from "../../../services/private/auth";
import { save_user } from "../../../redux/action/auth";
import Cookies from "js-cookie";
import { selectorShowHide } from "../../../redux/selector";
import { hide_all, show_model_otp } from "../../../redux/action/show_hide";

export default function OptionAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(selectorShowHide);
  const { notify, contextHolder } = useNotify();
  const btnSubmid = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [dataLogin, setDataLogin] = useState({
    userName: "",
    password: "",
  });

  const [dataRegister, setDataRegister] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [dataForgotPassword, setDataForgotPassword] = useState("");

  const handleOnchangeInputLogin = (event) => {
    const { name, value } = event.target;
    setDataLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hanelOnChangeInputRegister = (event) => {
    const { name, value } = event.target;
    setDataRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmid();
    }
  };

  const handleSubmid = async () => {
    let isCheck;
    if (btnSubmid.current.textContent === "Đăng ký") {
      isCheck = true;
      const { email, username, password, confirmPassword } = dataRegister;

      if (username.length <= 4) {
        isCheck = false;
        notify("warning", "Tên người dùng phải từ 5 kí tự trở lên");
        return;
      }
      if (!validateEmail(email)) {
        isCheck = false;
        notify("warning", "Vui lòng nhập đúng định dạng email để tiếp tục");
        return;
      }

      if (!password || password.length == 0 || password.length < 6) {
        isCheck = false;
        notify("warning", "Mật khẩu phải từ 6 ký tự trở lên");
        return;
      }
      if (password !== confirmPassword) {
        isCheck = false;
        notify("warning", "Xác nhận mật khẩu không khớp vui lòng kiểm tra lại");
        return;
      }
      if (isCheck) {
        setIsLoading(true);
        setTimeout(async () => {
          const { status, message } = await apiRegister(dataRegister);
          if (status === 201 || status === 400) {
            status === 201
              ? notify("success", message, true, 4)
              : notify("warning", message, true, 4);
            setTimeout(() => {
              dispatch(show_model_otp());
            }, 4000);
          } else {
            notify("error", message);
          }
          setIsLoading(false);
        }, 1000);
      }
    } else if (btnSubmid.current.textContent === "Quên mật khẩu") {
      if (!validateEmail(dataForgotPassword)) {
        notify("warning", "Vui lòng nhập đúng định dạng email để tiếp tục");
        return;
      }
      setIsLoading(true);
      setTimeout(async () => {
        const { status, message } = await apiForgotPassword({
          email: dataForgotPassword,
        });
        if (status === 200) {
          notify("success", message, true, 4);
          setTimeout(() => {
            dispatch(show_model_otp());
          }, 4000);
        } else {
          notify("error", message);
        }
        setIsLoading(false);
      }, 1000);
    } else if (btnSubmid.current.textContent === "Đăng nhập") {
      const { userName, password } = dataLogin;
      isCheck = true;
      if (!userName || userName.length == 0 || userName.length <= 4) {
        isCheck = false;
        notify("warning", "Tên người dùng phải từ 5 kí tự trở lên");
        return;
      }

      if (!password || password.length == 0 || password.length < 6) {
        isCheck = false;
        notify("warning", "Mật khẩu phải từ 6 ký tự trở lên");
        return;
      }
      if (isCheck) {
        setIsLoading(true);
        setTimeout(async () => {
          const response = await apiLogin(dataLogin);
          if (response?.status === 200) {
            const { token } = response;
            const existingToken = Cookies.get("token");
            if (existingToken) {
              // Xóa token cũ
              Cookies.remove("token");
            }
            Cookies.set("token", token, { expires: 365, path: "/" });
            const info = await apiGetInfo();
            dispatch(save_user(info.user));
            notify("success", response?.message, true, 1.5);
            setTimeout(() => {
              dispatch(hide_all());
            }, 1500);
            setTimeout(() => {
              if (response?.role == "ADMIN") navigate("/admin");
            }, 2000);
          } else {
            notify("error", response?.message);
          }
          setIsLoading(false);
        }, 1000);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div className="container__option-auth">
        {state.isFormRegister && (
          <>
            <div className="container__option-auth--register__option">
              <label htmlFor="user-name">Tên người dùng?</label>
              <Input
                size="large"
                id="user-name"
                name="username"
                onChange={hanelOnChangeInputRegister}
                showCount
                maxLength={50}
                minLength={4}
                placeholder="Tên người dùng..."
                className="container__option-auth--login__input"
              />
            </div>

            <div className="container__option-auth--register__option">
              <label htmlFor="email">Email?</label>
              <Input
                size="large"
                type="email"
                id="email"
                showCount
                maxLength={100}
                minLength={6}
                name="email"
                onChange={hanelOnChangeInputRegister}
                placeholder="Nhập vào email..."
                className="container__option-auth--login__input"
              />
            </div>

            <div className="container__option-auth--register__option">
              <label htmlFor="password">Mật khẩu?</label>
              <Input.Password
                className="container__option-auth--register__input"
                id="password"
                placeholder="Nhập vào mật khẩu..."
                onChange={hanelOnChangeInputRegister}
                name="password"
                showCount
                maxLength={50}
                minLength={6}
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
              />
            </div>

            <div className="container__option-auth--register__option">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu?</label>
              <Input.Password
                className="container__option-auth--register__input"
                id="confirmPassword"
                placeholder="Xác nhận mật khẩu..."
                name="confirmPassword"
                onChange={hanelOnChangeInputRegister}
                showCount
                maxLength={50}
                minLength={6}
                visibilityToggle={{
                  visible: passwordConfirm,
                  onVisibleChange: setPasswordConfirm,
                }}
              />
            </div>
          </>
        )}
        {state.isFormLogin && (
          <>
            <div className="container__option-auth--login__option">
              <label htmlFor="user-name">Tên đăng nhập?</label>
              <Input
                size="large"
                id="user-name"
                name="userName"
                showCount
                maxLength={50}
                minLength={4}
                onChange={handleOnchangeInputLogin}
                placeholder="Tên đăng nhập..."
                className="container__option-auth--login__input"
              />
            </div>
            <div className="container__option-auth--login__option">
              <label htmlFor="password">Mật khẩu?</label>
              <Input.Password
                className="container__option-auth--login__input"
                id="password"
                placeholder="Nhập vào mật khẩu..."
                name="password"
                showCount
                maxLength={50}
                minLength={6}
                onChange={handleOnchangeInputLogin}
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
              />
            </div>
          </>
        )}

        {state.isFormForgotpassword && (
          <>
            <div className="container__option-auth--email__option">
              <label htmlFor="user-name">Email?</label>
              <Input
                size="large"
                id="user-name"
                showCount
                maxLength={100}
                minLength={6}
                name="email"
                onChange={(e) => setDataForgotPassword(e.target.value)}
                placeholder="Nhập vào email..."
                className="container__option-auth--login__input"
              />
            </div>
          </>
        )}
        {state.isBackDefault && (
          <Button
            loading={isLoading}
            ref={btnSubmid}
            onKeyDown={handleKeyDown}
            onClick={handleSubmid}
            className="container__option-auth--submid"
          >
            {state.isFormForgotpassword
              ? "Quên mật khẩu"
              : state.textModel.subTitle}
          </Button>
        )}
      </div>
      {
        <ModelOtp
          email={state.isFormRegister ? dataRegister.email : dataForgotPassword}
        />
      }
    </>
  );
}
