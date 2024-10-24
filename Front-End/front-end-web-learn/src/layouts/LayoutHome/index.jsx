import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { Layout, Col, Button, Row, Menu } from "antd";
import ModelAuth from '../../components/share/ModelAuth/ModelAuth';
import "./LayOutCss.scss"

const items = [
    {
        label: <Link to={"/"}>Trang chủ</Link>,
        key: 'trang-chu',
    },
    {
        label: <Link to={"/lo-trinh"}>Lộ trình</Link>,
        key: 'lo-trinh',
    },
    {
        label: <Link to={"/bai-viet"}>Bài viết</Link>,
        key: 'bai-viet',
    },
    {
        label: <Link to={"/lien-he"}>Liên hệ</Link>,
        key: 'lien-he',
    },
    {
        label: <Link to={"/phan-hoi"}>Feed-back</Link>,
        key: 'feed-back',
    },
    {
        label: <Link to={"https://www.youtube.com/@xuanmanh299"} target='_blank'>Youtube</Link>,
        key: 'youtube',
    }
]

function LayoutHome() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [textModel, setTextModel] = useState({
        title: "",
        subTitle: "",
        footer_desc: ""
    })


    const handleLogin = () => {
        setOpen(true);
        setLoading(true);
        setTextModel((prev) => ({
            ...prev,
            title: "Đăng nhập vào CODE ZEN",
            subTitle: "Đăng nhập",
            footer_desc: "Bạn chưa có tài khoản?"
        }))

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    const handleRegister = () => {
        setOpen(true);
        setLoading(true);
        setTextModel((prev) => ({
            ...prev,
            title: "Đăng ký tài khoản CODE ZEN",
            subTitle: "Đăng ký",
            footer_desc: "Bạn đã có tài khoản?"
        }))
        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }
    return (
        <>
            <header>
                <Layout className='wrapper-layout-header-home' >
                    <Row className='container__header' align={"middle"} justify={"space-between"} gutter={30}>
                        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
                            <Link className='wrapper-layout-header-home__left'>
                                <img src='https://i.ibb.co/WGwmWhQ/DALL-E-2024-10-24-18-11-13-A-logo-of-a-circular-shape-resembling-a-stylized-C-in-harmonious-gradient.webp' alt='logo' />
                                <h1>Học lập trình, tạo dựng tương lai!.</h1>
                            </Link>
                        </Col>
                        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
                            <div className='wrapper-layout-header-home__center'>
                                <Menu defaultSelectedKeys={"trang-chu"} className='wrapper-layout-header-home__center--menu' mode='horizontal' items={items} />
                            </div>
                        </Col>
                        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
                            <div className='wrapper-layout-header-home__right'>
                                <Button type='link' className='wrapper-layout-header-home__right--login' onClick={handleLogin} >Đăng nhập</Button>
                                <Button className='wrapper-layout-header-home__right--register' onClick={handleRegister}>Đăng ký</Button>
                            </div>
                        </Col>
                    </Row>
                </Layout>
            </header>
            <main>
                <nav>
                    Nav
                </nav>
                <article>
                    <Outlet />
                </article>
            </main>
            <footer>
                Footer
            </footer>
            <ModelAuth text={textModel} open={open} loading={loading} setOpen={setOpen} />
        </>
    )
}
export default LayoutHome
