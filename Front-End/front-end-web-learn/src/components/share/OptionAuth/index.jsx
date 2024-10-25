import React, { useRef, useState } from 'react'
import "./OptionAuth.scss"
import { Input, Button } from 'antd'
import { UserOutlined } from "@ant-design/icons"
import ModelOtp from '../ModelOtp'
export default function OptionAuth({ login, text, register, forgotPassword }) {

    const btnSubmid = useRef(null)
    const [showOtpModal, setShowOtpModal] = useState(false); // Trạng thái hiển thị modal OTP
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState(false)



    const handleSubmid = () => {
        if (btnSubmid.current.textContent === "Đăng ký") {
            setShowOtpModal(true); // Bật modal OTP khi đăng ký
        }else if (btnSubmid.current.textContent === "Quên mật khẩu") {
            setShowOtpModal(true); // Bật modal OTP khi đăng ký
        }else {

        }
    }
    return (
        <>
            <div className='container__option-auth'>
                {login &&
                    <>
                        <div className='container__option-auth--login__option'>
                            <label htmlFor="user-name">Tên đăng nhập?</label>
                            <Input size="large" id='user-name' placeholder="Tên đăng nhập..." className='container__option-auth--login__input' />
                        </div>
                        <div className='container__option-auth--login__option'>
                            <label htmlFor="password">Mật khẩu?</label>
                            <Input.Password
                                className='container__option-auth--login__input'
                                id='password'
                                placeholder="Nhập vào mật khẩu..."
                                visibilityToggle={{
                                    visible: passwordVisible,
                                    onVisibleChange: setPasswordVisible,
                                }}
                            />
                        </div>
                    </>
                }
                {register &&
                    <>
                        <div className='container__option-auth--register__option'>
                            <label htmlFor="user-name">Tên người dùng?</label>
                            <Input size="large" id='user-name' placeholder="Tên người dùng..." className='container__option-auth--login__input' />
                        </div>

                        <div className='container__option-auth--register__option'>
                            <label htmlFor="email">Email?</label>
                            <Input size="large" type='email' id='email' placeholder="Nhập vào email..." className='container__option-auth--login__input' />
                        </div>

                        <div className='container__option-auth--register__option'>
                            <label htmlFor="password">Mật khẩu?</label>
                            <Input.Password
                                className='container__option-auth--register__input'
                                id='password'
                                placeholder="Nhập vào mật khẩu..."
                                visibilityToggle={{
                                    visible: passwordVisible,
                                    onVisibleChange: setPasswordVisible,
                                }}
                            />
                        </div>

                        <div className='container__option-auth--register__option'>
                            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                            <Input.Password
                                className='container__option-auth--register__input'
                                id='confirmPassword'
                                placeholder="Xác nhận mật khẩu..."
                                visibilityToggle={{
                                    visible: passwordConfirm,
                                    onVisibleChange: setPasswordConfirm,
                                }}
                            />
                        </div>
                    </>
                }

                {
                    forgotPassword &&
                    <>
                      <div className='container__option-auth--email__option'>
                            <label htmlFor="user-name">Email:</label>
                            <Input size="large" id='user-name' placeholder="Nhập vào email..." className='container__option-auth--login__input' />
                        </div>
                    
                    </>
                }

                {(login || register || forgotPassword) && <Button ref={btnSubmid} onClick={handleSubmid} className='container__option-auth--submid'>{text.subTitle || "Quên mật khẩu"}</Button>}


            </div>
            {showOtpModal && <ModelOtp visible={showOtpModal} setVisible={setShowOtpModal} />}
        </>


    )
}
