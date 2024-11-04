import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Layout, Col, Button, Row, Menu, Badge, Avatar, Dropdown } from "antd";
import MyCourseItem from '../../components/share/MyCourseItem';
import { BellOutlined } from "@ant-design/icons"
import Footer from '../../components/public/footer';
import ModelAuth from '../../components/share/ModelAuth/ModelAuth';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUser } from '../../redux/selector';
import { clear_user, save_user } from '../../redux/action/auth';
import { apiGetInfo } from '../../services/private/auth';
import Header from '../../components/public/header';
import "./LayOutCss.scss"

function LayoutHome() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [textModel, setTextModel] = useState({
        title: "",
        subTitle: "",
        footer_desc: ""
    })
    useEffect(() => {
        const fetching = async () => {
            const response = await apiGetInfo();
            if (response && response?.status == 200) {
                dispatch(save_user(response.user))
            } else {
                dispatch(clear_user())
                handleLogin()
            }
        }
        fetching();
    }, [])


    function handleLogin() {
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
            <Header handleLogin={handleLogin} handleRegister={handleRegister} />
            <main style={{
                marginTop: "66px"
            }}>
                <Layout className='wrapper-banner-content'>
                    <Row>
                        <Col xxl={14} xl={16} lg={24} className="wrapper-banner-content__left">
                            <h1>Bắt đầu sự nghiệp
                                <span>
                                    lập trình
                                </span>
                                của bạn ngay hôm nay
                            </h1>
                            <p>
                                Nơi chia sẻ mọi kiến thức về <strong>lập trình</strong> bằng ngôn ngữ Tiếng Việt. Giúp bạn nâng cao kỹ năng code và có cuộc sống tốt đẹp hơn ngay từ con số 0.
                                Với mục tiêu của đội ngũ <strong>CODE ZEN</strong> <strong>"Học lập trình, tạo dựng tương lai"</strong>, chúng tôi luôn sẵn sàng đồng hành cùng bạn trên con đường phát triển sự nghiệp trong lĩnh vực công nghệ.

                                <strong> CODE ZEN</strong> cam kết mang đến những tài liệu học tập chất lượng, các bài giảng chuyên sâu, và các khóa học đa dạng, phù hợp cho mọi đối tượng từ người mới bắt đầu đến những lập trình viên dày dạn kinh nghiệm.

                            </p>


                            <div className="wrapper-banner-content__left-footer">
                                <Button className='wrapper-banner-content__left-learn-now'>Học ngay</Button>
                                <Button type='link' className='wrapper-banner-content__left-more'>Tìm hiểu thêm</Button>
                            </div>


                        </Col>
                        <Col xxl={10} xl={8} lg={0} className="wrapper-banner-content__reight">
                            <img src="https://i0.wp.com/holetex.com/wp-content/uploads/2023/10/rocket.png?w=350&ssl=1" alt="img-header" />
                        </Col>
                    </Row>
                </Layout>
                <article>
                    <Outlet />
                </article>
            </main>
            <Footer />
            <ModelAuth text={textModel} open={open} setOpen={setOpen} handleLogin={handleLogin} handleRegister={handleRegister} setTextModel={setTextModel} />
        </>
    )
}
export default LayoutHome
