import { Badge, Button, Col, Dropdown, Layout, Menu, Avatar, Row } from 'antd'
import React from 'react'
import { BellOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom'
import MyCourseItem from '../../share/MyCourseItem'
import "./Header.scss"
import { useDispatch, useSelector } from 'react-redux'
import { selectorUser } from '../../../redux/selector'
import { show_login, show_register } from '../../../redux/action/show_hide'
import { clear_user } from '../../../redux/action/auth'
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
export default function Header() {
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(selectorUser)

    const handleLogin = () => {
        dispatch(show_login())
    }
    const handleRegister = () => {
        dispatch(show_register())
    }

    const handleLogout = () => {
        dispatch(clear_user())
        handleLogin()
    }
    return (
        <header style={{
        }}>
            <Layout className='wrapper-layout-header-home' >
                <Row className='container__header' align={"middle"} justify={"space-between"} gutter={30}>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
                        <Link to={"/"} className='wrapper-layout-header-home__left'>
                            <img src='https://i.ibb.co/WGwmWhQ/DALL-E-2024-10-24-18-11-13-A-logo-of-a-circular-shape-resembling-a-stylized-C-in-harmonious-gradient.webp' title='Học lập trình, tạo dựng tương lai!' alt='Học lập trình, tạo dựng tương lai!' />
                            <h1 className='wrapper-layout-header-home__title'>Học lập trình, tạo dựng tương lai!</h1>
                        </Link>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
                        <div className='wrapper-layout-header-home__center'>
                            <Menu defaultSelectedKeys={"trang-chu"} className='wrapper-layout-header-home__center--menu' mode='horizontal' items={items} />
                        </div>
                    </Col>
                    {isLoggedIn ? <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8} className='wrapper-layout-header-home__right-active'>
                        <Dropdown
                            dropdownRender={() =>
                                <>
                                    <div className="container-my-course">
                                        <div className="container-my-course-header">
                                            <h6>Khóa học của tôi</h6>
                                            <Link >Xem tất cả</Link>
                                        </div>
                                        <div className='container-my-course-header__body'>
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
                                            <div className='container-my-course-header__body'>
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
                                        label: <Link to={"/setting/my-info"} className='wrapper-layout-header-home__right-dropdown-account-option'>Cài đặt</Link>
                                    },
                                    {
                                        key: '8',
                                        label: <Link onClick={handleLogout} className='wrapper-layout-header-home__right-dropdown-account-option'>Đăng xuất</Link>
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
    )
}
