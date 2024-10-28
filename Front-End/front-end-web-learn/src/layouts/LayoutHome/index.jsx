import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { Layout, Col, Button, Row, Menu, Badge, Avatar, Dropdown } from "antd";
import MyCourseItem from '../../components/share/MyCourseItem';
import { BellOutlined } from "@ant-design/icons"
import ModelAuth from '../../components/share/ModelAuth/ModelAuth';
import { useSelector } from 'react-redux';
import "./LayOutCss.scss"
import { selectorUser } from '../../redux/selector';
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
    const selectorInfo = useSelector(selectorUser)
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false)
    const [textModel, setTextModel] = useState({
        title: "",
        subTitle: "",
        footer_desc: ""
    })
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLogin(!!token)
    })

    const handleLogin = () => {
        setOpen(true);
        setTextModel(() => ({
            title: "Đăng nhập vào CODE ZEN",
            subTitle: "Đăng nhập",
            footer_desc: "Bạn chưa có tài khoản?"
        }))
    }

    const handleRegister = () => {
        setOpen(true);
        setTextModel((prev) => ({
            title: "Đăng ký tài khoản CODE ZEN",
            subTitle: "Đăng ký",
            footer_desc: "Bạn đã có tài khoản?"
        }))
    }


    return (
        <>
            <header style={{
            }}>
                <Layout className='wrapper-layout-header-home' >
                    <Row className='container__header' align={"middle"} justify={"space-between"} gutter={30}>
                        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
                            <Link className='wrapper-layout-header-home__left'>
                                <img src='https://i.ibb.co/WGwmWhQ/DALL-E-2024-10-24-18-11-13-A-logo-of-a-circular-shape-resembling-a-stylized-C-in-harmonious-gradient.webp' title='Học lập trình, tạo dựng tương lai!' alt='Học lập trình, tạo dựng tương lai!' />
                                <h1 className='wrapper-layout-header-home__title'>Học lập trình, tạo dựng tương lai!</h1>
                            </Link>
                        </Col>
                        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
                            <div className='wrapper-layout-header-home__center'>
                                <Menu defaultSelectedKeys={"trang-chu"} className='wrapper-layout-header-home__center--menu' mode='horizontal' items={items} />
                            </div>
                        </Col>
                        {isLogin ? <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8} className='wrapper-layout-header-home__right-active'>
                            <Dropdown
                                dropdownRender={() =>
                                    <>
                                        <div className="container-my-course">
                                            <div className="container-my-course-header">
                                                <h6>Khóa học của tôi</h6>
                                                <Link >Xem tất cả</Link>
                                            </div>
                                            <MyCourseItem img={"https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png"} nameClass={"course"} />
                                            <MyCourseItem img={"https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png"} nameClass={"course"} />
                                            <MyCourseItem img={"https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png"} nameClass={"course"} />
                                            <MyCourseItem img={"https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png"} nameClass={"course"} />
                                            <MyCourseItem img={"https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png"} nameClass={"course"} />
                                            <MyCourseItem img={"https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png"} nameClass={"course"} />
                                            <MyCourseItem img={"https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png"} nameClass={"course"} />
                                            <MyCourseItem img={"https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png"} nameClass={"course"} />
                                            <MyCourseItem img={"https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png"} nameClass={"course"} />
                                            <MyCourseItem img={"https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png"} nameClass={"course"} />
                                        </div>

                                    </>
                                }


                                trigger={['click']}
                            >
                                <Button onClick={(e) => e.preventDefault()} type='link' className='wrapper-layout-header-home__right-active-my-course'>Khóa học của tôi</Button>
                            </Dropdown>

                            <Badge count={1} className='wrapper-layout-header-home__right-notify'>
                                <Dropdown
                                    trigger={['click']}
                                    dropdownRender={() =>
                                        <>
                                            <div className="container-my-course">
                                                <div className="container-my-course-header">
                                                    <h6>Thông báo</h6>
                                                    <Link>Đánh dấu đã đọc</Link>
                                                </div>
                                                <MyCourseItem img={"https://fullstack.edu.vn/assets/images/f8_avatar.png"} title="Thông báo cập nhật khóa học năm 2024" nameClass={"bell"} />
                                                <MyCourseItem img={"https://fullstack.edu.vn/assets/images/f8_avatar.png"} title="Tọa đàm phương pháp học tập năm 2024" nameClass={"bell"} />
                                                <MyCourseItem img={"https://fullstack.edu.vn/assets/images/f8_avatar.png"} title="Mở lớp off tại Hà Nội cùng Xuân Mạnh" nameClass={"bell"} />
                                                <MyCourseItem img={"https://fullstack.edu.vn/assets/images/f8_avatar.png"} nameClass={"bell"} />
                                                <MyCourseItem img={"https://fullstack.edu.vn/assets/images/f8_avatar.png"} nameClass={"bell"} />
                                                <MyCourseItem img={"https://fullstack.edu.vn/assets/images/f8_avatar.png"} nameClass={"bell"} />
                                                <MyCourseItem img={"https://fullstack.edu.vn/assets/images/f8_avatar.png"} nameClass={"bell"} />
                                                <MyCourseItem img={"https://fullstack.edu.vn/assets/images/f8_avatar.png"} nameClass={"bell"} />
                                                <MyCourseItem img={"https://fullstack.edu.vn/assets/images/f8_avatar.png"} nameClass={"bell"} />
                                                <MyCourseItem img={"https://fullstack.edu.vn/assets/images/f8_avatar.png"} nameClass={"bell"} />
                                            </div>

                                        </>
                                    }
                                >
                                    <BellOutlined onClick={(e) => e.preventDefault()} className='wrapper-layout-header-home__right-bell' />
                                </Dropdown>
                            </Badge>
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: '1',
                                            label: <Link className='wrapper-layout-header-home__right-dropdown-account-header'>
                                                <img src="https://files.fullstack.edu.vn/f8-prod/public-images/671cf6b5a9133.png" alt="Avatar" />
                                                <div className='wrapper-layout-header-home__right-dropdown-account-section'>
                                                    <span>Nguyễn Xuân Mạnh</span>
                                                    <span>@manhnguyen36</span>
                                                </div>
                                            </Link>,
                                        },
                                        {
                                            key: '2',
                                            label: <Link className='wrapper-layout-header-home__right-dropdown-account-option'>Trang cá nhân</Link>,
                                        },
                                        {
                                            key: '3',
                                            label: <Link className='wrapper-layout-header-home__right-dropdown-account-option'>Khóa học của tôi</Link>,
                                        },
                                        {
                                            key: '4',
                                            label: <Link className='wrapper-layout-header-home__right-dropdown-account-option'>Viết blog</Link>
                                        },
                                        {
                                            key: '5',
                                            label: <Link className='wrapper-layout-header-home__right-dropdown-account-option'>Bài viết của tôi</Link>
                                        },
                                        {
                                            key: '6',
                                            label: <Link className='wrapper-layout-header-home__right-dropdown-account-option'>Bài viết đã lưu</Link>
                                        },
                                        {
                                            key: '7',
                                            label: <Link className='wrapper-layout-header-home__right-dropdown-account-option'>Cài đặt</Link>
                                        },
                                        {
                                            key: '8',
                                            label: <Link onClick={() => {
                                                localStorage.removeItem("token")
                                                handleLogin()
                                            }} className='wrapper-layout-header-home__right-dropdown-account-option'>Đăng xuất</Link>
                                        }
                                    ],
                                }}

                                trigger={['click']}
                                className='wrapper-layout-header-home__right-dropdown-account'
                            >
                                <Avatar
                                    onClick={(e) => e.preventDefault()}
                                    className='wrapper-layout-header-home__right-img'
                                    src="https://files.fullstack.edu.vn/f8-prod/public-images/671cf6b5a9133.png"
                                    alt='avatar'
                                />
                            </Dropdown>
                        </Col> : <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}  >
                            <div className='wrapper-layout-header-home__right'>
                                <Button type='link' className='wrapper-layout-header-home__right--login' onClick={handleLogin} >Đăng nhập</Button>
                                <Button className='wrapper-layout-header-home__right--register' onClick={handleRegister}>Đăng ký</Button>
                            </div>
                        </Col>}



                    </Row>
                </Layout>
            </header>
            <main style={{
                marginTop: "66px"
            }}>
                <nav>

                </nav>
                <article>
                    dsadsa
                    <Outlet />
                </article>
            </main>
            <footer>
                Footer
            </footer>
            <ModelAuth text={textModel} open={open} setOpen={setOpen} handleLogin={handleLogin} handleRegister={handleRegister} setTextModel={setTextModel} />
        </>
    )
}
export default LayoutHome
