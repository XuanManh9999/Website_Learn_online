import React from 'react'
import "./Section.scss"
import { Col, Layout, Row } from 'antd'
import { RightOutlined, ClockCircleOutlined, PlayCircleOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom'
function Section() {
    return (
        <div className='section-containner' >
            <div className="section-header">
                <h2 className="section-header-left">
                    <Link>Khóa học miễn phí</Link>
                </h2>
                <div className="section-header-reight">
                    <Link>
                        Xem lộ trình
                        <RightOutlined />
                    </Link>
                </div>
            </div>
            <Layout className='section-container-content' >
                <Row className='section-container-list-items' gutter={[20, 20]} >
                    <Col xxl={4} xl={6} lg={8} className='section-container-item'>
                        <div className='section-container-item__header'>
                            <Link to={"/courses/kien-thuc-nhap-mon-it"}>
                                <img src="https://files.fullstack.edu.vn/f8-prod/courses/7.png" alt="course-free" />
                            </Link>
                        </div>
                        <div className='section-container-item__content'>
                            <h3>
                                <Link>Kiến thức nhập môn IT</Link>
                            </h3>
                            <div className="section-container-item__content-type-course">
                                <span>Miễn phí</span>
                            </div>
                            <div className="section-container-item__content-desc">
                                <div className="section-container-item__content-desc-left">
                                    <img src="https://fullstack.edu.vn/images/founder.jpeg" alt="avatar" />
                                    <span> Sơn đặng</span>
                                </div>
                                <div className="section-container-item__content-desc-center">
                                    <PlayCircleOutlined />
                                    <span>590</span>
                                </div>
                                <div className="section-container-item__content-desc-reight">
                                    <ClockCircleOutlined />
                                    <span>116h44p</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xxl={4} xl={6} lg={8} className='section-container-item'>
                        <div className='section-container-item__header'>
                            <Link>
                                <img src="https://files.fullstack.edu.vn/f8-prod/courses/7.png" alt="course-free" />
                            </Link>
                        </div>
                        <div className='section-container-item__content'>
                            <h3>
                                <Link>Kiến thức nhập môn IT</Link>
                            </h3>
                            <div className="section-container-item__content-type-course">
                                <span>Miễn phí</span>
                            </div>
                            <div className="section-container-item__content-desc">
                                <div className="section-container-item__content-desc-left">
                                    <img src="https://fullstack.edu.vn/images/founder.jpeg" alt="avatar" />
                                    <span> Sơn đặng</span>
                                </div>
                                <div className="section-container-item__content-desc-center">
                                    <PlayCircleOutlined />
                                    <span>590</span>
                                </div>
                                <div className="section-container-item__content-desc-reight">
                                    <ClockCircleOutlined />
                                    <span>116h44p</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xxl={4} xl={6} lg={8} className='section-container-item'>
                        <div className='section-container-item__header'>
                            <Link>
                                <img src="https://files.fullstack.edu.vn/f8-prod/courses/7.png" alt="course-free" />
                            </Link>
                        </div>
                        <div className='section-container-item__content'>
                            <h3>
                                <Link>Kiến thức nhập môn IT</Link>
                            </h3>
                            <div className="section-container-item__content-type-course">
                                <span>Miễn phí</span>
                            </div>
                            <div className="section-container-item__content-desc">
                                <div className="section-container-item__content-desc-left">
                                    <img src="https://fullstack.edu.vn/images/founder.jpeg" alt="avatar" />
                                    <span> Sơn đặng</span>
                                </div>
                                <div className="section-container-item__content-desc-center">
                                    <PlayCircleOutlined />
                                    <span>590</span>
                                </div>
                                <div className="section-container-item__content-desc-reight">
                                    <ClockCircleOutlined />
                                    <span>116h44p</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xxl={4} xl={6} lg={8} className='section-container-item'>
                        <div className='section-container-item__header'>
                            <Link>
                                <img src="https://files.fullstack.edu.vn/f8-prod/courses/7.png" alt="course-free" />
                            </Link>
                        </div>
                        <div className='section-container-item__content'>
                            <h3>
                                <Link>Kiến thức nhập môn IT</Link>
                            </h3>
                            <div className="section-container-item__content-type-course">
                                <span>Miễn phí</span>
                            </div>
                            <div className="section-container-item__content-desc">
                                <div className="section-container-item__content-desc-left">
                                    <img src="https://fullstack.edu.vn/images/founder.jpeg" alt="avatar" />
                                    <span> Sơn đặng</span>
                                </div>
                                <div className="section-container-item__content-desc-center">
                                    <PlayCircleOutlined />
                                    <span>590</span>
                                </div>
                                <div className="section-container-item__content-desc-reight">
                                    <ClockCircleOutlined />
                                    <span>116h44p</span>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col xxl={4} xl={6} lg={8} className='section-container-item'>
                        <div className='section-container-item__header'>
                            <Link>
                                <img src="https://files.fullstack.edu.vn/f8-prod/courses/7.png" alt="course-free" />
                            </Link>
                        </div>
                        <div className='section-container-item__content'>
                            <h3>
                                <Link>Kiến thức nhập môn IT</Link>
                            </h3>
                            <div className="section-container-item__content-type-course">
                                <span>Miễn phí</span>
                            </div>
                            <div className="section-container-item__content-desc">
                                <div className="section-container-item__content-desc-left">
                                    <img src="https://fullstack.edu.vn/images/founder.jpeg" alt="avatar" />
                                    <span> Sơn đặng</span>
                                </div>
                                <div className="section-container-item__content-desc-center">
                                    <PlayCircleOutlined />
                                    <span>590</span>
                                </div>
                                <div className="section-container-item__content-desc-reight">
                                    <ClockCircleOutlined />
                                    <span>116h44p</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xxl={4} xl={6} lg={8} className='section-container-item'>
                        <div className='section-container-item__header'>
                            <Link>
                                <img src="https://files.fullstack.edu.vn/f8-prod/courses/7.png" alt="course-free" />
                            </Link>
                        </div>
                        <div className='section-container-item__content'>
                            <h3>
                                <Link>Kiến thức nhập môn IT</Link>
                            </h3>
                            <div className="section-container-item__content-type-course">
                                <span>Miễn phí</span>
                            </div>
                            <div className="section-container-item__content-desc">
                                <div className="section-container-item__content-desc-left">
                                    <img src="https://fullstack.edu.vn/images/founder.jpeg" alt="avatar" />
                                    <span> Sơn đặng</span>
                                </div>
                                <div className="section-container-item__content-desc-center">
                                    <PlayCircleOutlined />
                                    <span>590</span>
                                </div>
                                <div className="section-container-item__content-desc-reight">
                                    <ClockCircleOutlined />
                                    <span>116h44p</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Layout>
        </div>
    )
}
export default Section
