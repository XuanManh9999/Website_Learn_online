import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import { Layout, Col, Button, Row, Menu } from "antd";
import "./LayOutCss.scss"

const items = [
    {
        label: <Link to={"/trang-chu"}>Trang chủ</Link>,
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
                                <Link className='wrapper-layout-header-home__right--login'>Đăng nhập</Link>
                                <Button className='wrapper-layout-header-home__right--register'>Đăng ký</Button>
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
        </>
    )
}
export default LayoutHome
