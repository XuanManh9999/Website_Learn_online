import React, { useEffect, useRef, useState } from 'react';
import { Modal, Input, Button, Flex, Typography } from 'antd';
const { Title } = Typography;
import "./ModelOtp.scss"
export default function ModelOtp({ visible, setVisible }) {
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

    const handleOtpSubmit = () => {
        closeModal();
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
            <Modal
                className='container__model-otp'
                title="Xác thực OTP"
                visible={visible}
                onCancel={closeModal}
                footer={null}
            >
                <strong>Vui lòng nhập OTP trong {secondsToGo} giây.</strong>
                <p className='otp-message-error'>Mã OTP không đúng vui lòng thử lại.</p>
                <Flex gap="middle" align="flex-start" vertical style={{
                    marginTop: "10px"
                }
                }>
                    <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
                </Flex>
                <Button type="primary" onClick={handleOtpSubmit} className='container__model-otp--btn'>Xác nhận OTP</Button>
            </Modal>
        </>
    );
}
