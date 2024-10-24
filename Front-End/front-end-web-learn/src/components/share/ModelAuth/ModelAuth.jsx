import React from 'react'
import "./ModelAuth.scss"
import { Button, Col, Layout, Modal, Row } from "antd"
import { GoogleOutlined, FacebookOutlined, GithubOutlined, UserOutlined } from "@ant-design/icons"
function ModelAuth({ open, loading, setOpen }) {

    return (
        <>
            <Modal
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}
                centered
                footer={""}
                width={540}
            >
                <div className='container-model'>
                    <main className='container-content'>
                        <figure className='container-content__logo'>
                            <img src="https://i.ibb.co/WGwmWhQ/DALL-E-2024-10-24-18-11-13-A-logo-of-a-circular-shape-resembling-a-stylized-C-in-harmonious-gradient.webp" alt="logo" />
                        </figure>
                        <h1 className='container-content__title'>Đăng nhập vào CODE ZEN</h1>
                        <div className='container-content__option'>
                            <Button icon={<GoogleOutlined />} >Đăng nhập với Google</Button>
                            <Button icon={<FacebookOutlined />}>Đăng nhập với FaceBook</Button>
                            <Button icon={<GithubOutlined />}>Đăng nhập với Github</Button>
                            <Button icon={<UserOutlined />}>Sử dụng tên tài khoản</Button>
                        </div>
                    </main>
                </div>
            </Modal>
        </>
    )
}

export default ModelAuth;