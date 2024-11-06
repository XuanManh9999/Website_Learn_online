import React, { useRef, useState } from 'react'
import "./Romap.scss"
import { Col, Layout, Row, Collapse, Button, Modal } from "antd"
import { PlusOutlined, MinusOutlined, PlayCircleOutlined, ClockCircleOutlined, DashboardOutlined, PlaySquareOutlined, TrophyOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from 'react-redux';
import { selectorUser } from '../../../redux/selector';
import Video from '../../share/Video';
import { show_login } from '../../../redux/action/show_hide';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
    {
        key: '1',
        label: <div className='container-romap-item__left-course--romap__info'>
            <strong>1. Giới thiệu</strong>
            <span>3 bài học</span>
        </div>,
        children: <div className='container-romap-item__left-course--romap__content'>
            <div className='container-romap-item__left-course--romap__content-left'>
                <PlayCircleOutlined /> <strong>1. Giới thiệu khóa học</strong>
            </div>
            <div className='container-romap-item__left-course--romap__content-reight'>
                <span>01:03</span>
            </div>
        </div>,
    },
    {
        key: '2',
        label: <div className='container-romap-item__left-course--romap__info'>
            <strong>1. Giới thiệu</strong>
            <span>3 bài học</span>
        </div>,
        children: <div className='container-romap-item__left-course--romap__content'>
            <div className='container-romap-item__left-course--romap__content-left'>
                <PlayCircleOutlined /> <strong>1. Giới thiệu khóa học</strong>
            </div>
            <div className='container-romap-item__left-course--romap__content-reight'>
                <span>01:03</span>
            </div>
        </div>,
    },
    {
        key: '3',
        label: <div className='container-romap-item__left-course--romap__info'>
            <strong>1. Giới thiệu</strong>
            <span>3 bài học</span>
        </div>,
        children: <div className='container-romap-item__left-course--romap__content'>
            <div className='container-romap-item__left-course--romap__content-left'>
                <PlayCircleOutlined /> <strong>1. Giới thiệu khóa học</strong>
            </div>
            <div className='container-romap-item__left-course--romap__content-reight'>
                <span>01:03</span>
            </div>
        </div>,
    },
];
function Romap() {
    const { isLoggedIn, payload } = useSelector(selectorUser)
    const dispatch = useDispatch()
    const [isShowModel, setIsShowModel] = useState(false)
    const [activeKeys, setActiveKeys] = useState(['1']);
    const refCollapse = useRef()
    const toggleExpandAll = () => {
        if (activeKeys.length === items.length) {
            setActiveKeys([]); // Thu gọn tất cả
            refCollapse.current.textContent = "Mở rộng tất cả"
        } else {
            refCollapse.current.textContent = "Thu gọn tất cả"
            setActiveKeys(items.map(item => item.key)); // Mở rộng tất cả
        }
    };

    // Xử lý khi nhấn vào từng panel
    const handlePanelChange = (keys) => {
        setActiveKeys(keys); // Cập nhật trực tiếp `activeKeys` với các key được mở
    };

    const handleViewPrewView = () => {
        setIsShowModel(true)
    }

    const handleRegisterCourse = () => {
        if (!isLoggedIn) {
            dispatch(show_login())
        }else {
            // check xem đã đăng ký chưa
        }
    }

    return (
        <>
            <Layout className='container-romap'>
                <Row className='container-romap-list-item' gutter={[25, 25]}>
                    <Col xxl={18} xl={18} className='container-romap-item__left'>
                        <h1>Lập trình C++ từ cơ bản đến nâng cao</h1>
                        <p>Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho người mới bắt đầu. Mục tiêu của khóa học này nhằm giúp các bạn nắm được các khái niệm căn cơ của lập trình, giúp các bạn có nền tảng vững chắc để chinh phục con đường trở thành một lập trình viên.</p>
                        <section className='container-romap-item__left--course'>
                            <h2>Nội dung khóa học</h2>
                            <div className="container-romap-item__left--desc-course">
                                <ul>
                                    <li><strong>11</strong> chương</li>
                                    <li><strong>138</strong> bài học</li>
                                    <li>Thời lượng<strong> 10 giờ 29 phút</strong></li>
                                </ul>
                                <span onClick={toggleExpandAll} ref={refCollapse}>Mở rộng tất cả</span>
                            </div>
                        </section>
                        <Collapse
                            activeKey={activeKeys}
                            onChange={handlePanelChange}
                            className='container-romap-item__left-course--romap'
                            expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />}
                            items={items}
                        >
                        </Collapse>
                    </Col>

                    <Col xxl={6} xl={6} className='container-romap-item__right' >
                        <div className='container-romap-item__right-header' onClick={handleViewPrewView}>
                            <PlayCircleOutlined className='container-romap-item__right-header-icon' />
                            <p className='container-romap-item__right-header-desc'>Xem giới thiệu khóa học</p>
                        </div>
                        <div className="container-romap-item__right-header--type-course">
                            <h5>Miễn phí</h5>
                        </div>
                        <Button type='primary' onClick={handleRegisterCourse}>Đăng ký khóa học</Button>
                        <ul className='container-romap-item__right-bottom'>
                            <li>
                                <DashboardOutlined />
                                Trình độ cơ bản
                            </li>
                            <li>
                                <PlaySquareOutlined />
                                Tổng số
                                <strong>
                                    12
                                </strong>
                                bài học
                            </li>
                            <li>
                                <ClockCircleOutlined />
                                Thời lượng
                                <strong>
                                    03 giờ 26 phút
                                </strong>
                            </li>
                            <li>
                                <TrophyOutlined />
                                Học mọi lúc, mọi nơi
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Layout>
            <Modal
                className='container-preview-introduction-video'
                open={isShowModel}
                onCancel={() => setIsShowModel(false)}
                centered
                footer={null}
                width={800}
            >
                <h3>Giới thiệu khóa học</h3>
                <div className="container-preview-introduction-video__content">
                    <h2>Kiến thức nhập môn IT</h2>
                    <Video videoId="qAbOOxxNU64?si=iii2WRvu8Hgtv0Cc" />
                </div>
            </Modal>
        </>
    )
}

export default Romap