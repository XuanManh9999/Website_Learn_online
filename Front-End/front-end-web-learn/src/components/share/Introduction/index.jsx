import { Button, Col, Layout, Row } from 'antd'
import React from 'react'
import "./Introduction.scss"
function Introduction() {
    return (
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
    )
}
export default Introduction