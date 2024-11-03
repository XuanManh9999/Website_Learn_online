import React from 'react'
import { Layout, Row, Col } from "antd"
import "./Footer.scss"
import { YoutubeOutlined, FacebookOutlined, TikTokOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className='wrapper-banner-footer'>
            <Layout className='wrapper-banner-footer--container'>
                <Row className='wrapper-banner-footer-wraper'>
                    <Col xl={7} className='wrapper-banner-footer-wraper-1'>
                        <div className='wrapper-banner-footer-wraper-1-header'>
                            <img src="https://i.ibb.co/WGwmWhQ/DALL-E-2024-10-24-18-11-13-A-logo-of-a-circular-shape-resembling-a-stylized-C-in-harmonious-gradient.webp" alt="" />
                            <h2>Học lập trình, tạo dựng tương lai</h2>
                        </div>
                        <div className='wrapper-banner-footer-wraper-1-content'>
                            <span>Điện thoại: </span> <Link>0352593469</Link> <br />
                            <span>Email: </span> <Link>nguyenxuanmanh2992003@gmail.com</Link> <br />
                            <span>Địa chỉ: </span><Link>Số 1, ngõ 22, Hai Bà Trưng, Hà Nội</Link>
                        </div>
                        <div className='wrapper-banner-footer-wraper-1-footer'>
                            <img src="data:image/png;base64,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" alt="QA" />
                        </div>
                    </Col>
                    <Col xl={3} className='wrapper-banner-footer-wraper-2'>
                        <h2>Về CODE ZEN</h2>
                        <ul>
                            <li><Link>Giới thiệu</Link></li>
                            <li><Link>Liên hệ</Link></li>
                            <li><Link>Điều khoản</Link></li>
                            <li><Link>Bảo mật</Link></li>
                        </ul>
                    </Col>
                    <Col xl={3} className='wrapper-banner-footer-wraper-3'>
                        <h2>Sản phẩm</h2>
                        <ul>
                            <li><Link>Game Nester</Link></li>
                            <li><Link>Game CSS Diner</Link></li>
                            <li><Link>Game CSS Selectors</Link></li>
                            <li><Link>Game Froggy</Link></li>
                            <li><Link>Game Froggy Pro</Link></li>
                            <li><Link>Game Scoops</Link></li>
                        </ul>
                    </Col>
                    <Col xl={4} className='wrapper-banner-footer-wraper-4'>
                        <h2>Công cụ</h2>
                        <ul>
                            <li><Link>Tạo CV xin việc</Link></li>
                            <li><Link>Rút gọn liên kết</Link></li>
                            <li><Link>Clip-path maker</Link></li>
                            <li><Link>Snippet generator</Link></li>
                            <li><Link>CSS Grid generator</Link></li>
                            <li><Link>Cảnh báo sờ tay lên mặt</Link></li>
                        </ul>
                    </Col>
                    <Col xl={6} className='wrapper-banner-footer-wraper-5'>
                        <h2>CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC CODE ZEN</h2>
                        <ul>
                            <li><b>Mã số thuế:</b> 0109922901</li>
                            <li><b>Ngày thành lập:</b> 04/03/2022</li>
                            <li><b>Lĩnh vực hoạt động: </b>Giáo dục, công nghệ - lập trình. Chúng tôi tập trung xây dựng và phát triển các sản phẩm mang lại giá trị cho cộng đồng lập trình viên Việt Nam.</li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </Col>
                </Row>
                <Row className='wrapper-banner-footer-botton'>
                    <Col xl={18}>
                        <p>© 2024 - 2026 CODE ZEN. Nền tảng học lập trình hàng đầu Việt Nam</p>
                    </Col>
                    <Col xl={6}>
                        <div className='wrapper-banner-footer-botton-info'>
                            <YoutubeOutlined />
                            <FacebookOutlined />
                            <TikTokOutlined />
                        </div>
                    </Col>
                </Row>
            </Layout>
        </footer>
    )
}

export default Footer