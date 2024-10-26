import React, { useEffect, useRef, useState } from 'react';
import { Modal, Input, Button, Flex, Typography } from 'antd';
const { Title } = Typography;
import { verifyOTPRegister, verifyOTPForgotPassword } from '../../../services/public/auth';
import useNotify from '../Notification';
import "./ModelOtp.scss"
export default function ModelOtp({ visible, setVisible, forgotPassword, register, email, handleBackToDefault }) {

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
        clearInterval(timerRef.current);
        setVisible(false);
        setOtp('');
        setSecondsToGo(90);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value); // Cập nhật trạng thái OTP khi người dùng nhập
    };

    const handleOtpSubmit = async () => {
        if (register) {
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
                            handleBackToDefault()
                        }, 4000)
                    } else {
                        notify("error", message)
                    }
                    setIsLoading(false)
                }, 1000);

            } else {
                notify("warning", "Vui lòng nhập đầy đủ mã OTP trước khi xác nhận")
            }
        } else if (forgotPassword) {
            if (otp.length === 6) {
                setIsLoading(true)
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
                        handleBackToDefault()
                    }, 4000)
                } else {
                    notify("error", message)
                }
            } else {
                notify("warning", "Vui lòng nhập đầy đủ mã OTP trước khi xác nhận")
            }
        }

    };

    useEffect(() => {
        if (visible) {
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
    }, [visible]);

    return (
        <>
            {contextHolder}
            <Modal
                className='container__model-otp'
                title="Xác thực OTP"
                visible={visible}
                onCancel={closeModal}
                footer={null}
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
