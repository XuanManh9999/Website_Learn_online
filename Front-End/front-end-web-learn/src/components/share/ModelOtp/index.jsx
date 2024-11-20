import React, { useEffect, useRef, useState } from 'react';
import { Modal, Input, Button, Flex, Typography } from 'antd';
import { verifyOTPRegister, verifyOTPForgotPassword } from '../../../services/public/auth';
import useNotify from '../Notification';
import "./ModelOtp.scss"
import { useDispatch, useSelector } from 'react-redux';
import { selectorShowHide } from '../../../redux/selector';
import { default_show_hide, hide_model_otp } from '../../../redux/action/show_hide';
export default function ModelOtp({ email }) {
    const state = useSelector(selectorShowHide)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const { notify, contextHolder } = useNotify();
    const [otp, setOtp] = useState(''); // Trạng thái lưu trữ mã OTP
    const [secondsToGo, setSecondsToGo] = useState(90); // Thời gian đếm ngược
    const timerRef = useRef(null);
    const onChange = (text) => {
        setOtp(text)
    };
    const sharedProps = {
        onChange,
    };
    const closeModal = () => {
        dispatch(hide_model_otp())
        clearInterval(timerRef.current);
        setOtp('');
        setSecondsToGo(90);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value); // Cập nhật trạng thái OTP khi người dùng nhập
    };

    const handleOtpSubmit = async () => {
        if (state.isFormRegister) {
            if (otp.length === 6) {
                setIsLoading(true)
                setTimeout(async () => {
                    const { status, message } = await verifyOTPRegister({
                        email,
                        otp
                    })
                    if (status === 200) {
                        notify("success", message)
                        setTimeout(() => {
                            closeModal();
                        }, 2000)
                        setTimeout(() => {
                            dispatch(default_show_hide())
                        }, 4000)
                    } else {
                        notify("error", message)
                    }
                    setIsLoading(false)
                }, 1000);

            } else {
                notify("warning", "Vui lòng nhập đầy đủ mã OTP trước khi xác nhận")
            }
        } else if (state.isFormForgotpassword) {
            if (otp.length === 6) {
                setIsLoading(true)
                setTimeout(async () => {
                    const { status, message } = await verifyOTPForgotPassword({
                        email,
                        otp
                    })
                    if (status === 200) {
                        notify("success", message)
                        setTimeout(() => {
                            closeModal();
                        }, 2000)
                        setTimeout(() => {
                            dispatch(default_show_hide())
                        }, 4000)

                    } else {
                        notify("error", message)
                    }
                    setIsLoading(false)
                }, 1000);
            } else {
                notify("warning", "Vui lòng nhập đầy đủ mã OTP trước khi xác nhận")
            }
        }

    };

    useEffect(() => {
        if (state.isShowModelOTP) {
            timerRef.current = setInterval(() => {
                setSecondsToGo((prev) => {
                    if (prev <= 1) {
                        closeModal();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timerRef.current);
        }
    }, [state.isShowModelOTP]);

    return (
        <>
            {contextHolder}
            <Modal
                className='container__model-otp'
                title="Xác thực OTP"
                open={state.isShowModelOTP}
                onCancel={closeModal}
                footer={null}
                centered
            >
                <strong>Vui lòng nhập OTP trong {secondsToGo} giây.</strong>
                {/* <p className='otp-message-error'>Mã OTP không đúng vui lòng thử lại.</p> */}
                <Flex gap="middle" align="flex-start" vertical style={{
                    marginTop: "10px"
                }
                }>
                    <Input.OTP formatter={(str) => str.toUpperCase()} onChange={handleOtpChange} {...sharedProps} />
                </Flex>
                <Button type="primary" loading={isLoading} onClick={handleOtpSubmit} className='container__model-otp--btn'>Xác nhận OTP</Button>
            </Modal>
        </>
    );
}
