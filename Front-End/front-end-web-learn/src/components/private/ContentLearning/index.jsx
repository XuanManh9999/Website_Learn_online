import YouTube from "react-youtube";
import "./ContentLearning.scss";
import { Col, Layout, Row, Button, Collapse } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  CheckCircleOutlined,
  CoffeeOutlined,
} from "@ant-design/icons"; // Sử dụng icon tuỳ chỉnh từ Ant Design hoặc icon của riêng bạn
import { Link } from "react-router-dom";
import { useState } from "react";
function ContentLearning() {
  const [idVideo, setIdVideo] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const handleSubmidVideo = (index, videoId) => {
    console.log("Xuan manh check video ID", videoId);
    
    setActiveIndex(index); // Cập nhật chỉ số của phần tử được chọn
  };
  return (
    <Layout className="content_learning">
      <Row className="learning">
        <Col xxl={18} xl={18} className="learning__left">
          <div className="learning__left__video">
            <YouTube
              id="learning__left__video__item"
              videoId="OL2jrOh7h2A?si=sjsCWyNi75msniKZ"
            />
          </div>
          <div className="learning__left__mid">
            <div className="learning__left__mid--title">
              <h2>Mô hình Client - Server là gì?</h2>
              <p>Cập nhật tháng 11 năm 2022</p>
            </div>
            <div className="learning__left__mid--note">
              <Button>
                Thêm ghi chú tại <strong>00:08</strong>
              </Button>
            </div>
          </div>
          <div className="learning__left__mid--bot">
            <p>
              Tham gia các cộng đồng để cùng học hỏi, chia sẻ và "thám thính"
              xem CODE ZEN sắp có gì mới nhé!
            </p>
            <ul>
              <li>
                Fanpage:{" "}
                <Link to={"https://www.facebook.com/f8vnofficial"}>
                  https://www.facebook.com/f8vnofficial
                </Link>
              </li>
              <li>
                Fanpage:{" "}
                <Link to={"https://www.facebook.com/f8vnofficial"}>
                  https://www.facebook.com/f8vnofficial
                </Link>
              </li>
              <li>
                Fanpage:{" "}
                <Link to={"https://www.facebook.com/f8vnofficial"}>
                  https://www.facebook.com/f8vnofficial
                </Link>
              </li>
              <li>
                Fanpage:{" "}
                <Link to={"https://www.facebook.com/f8vnofficial"}>
                  https://www.facebook.com/f8vnofficial
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col xxl={6} xl={6} className="learning__right">
          <h2 className="learning__right__title">Nội dung khóa học</h2>
          <Collapse
            className="learning__right__list-item"
            items={[
              {
                key: "1",
                label: (
                  <div className="learning__right__item">
                    <h3 className="learning__right__item__name_chapter">
                      1. Khái niệm kỹ thuật cần biết
                    </h3>
                    <span className="learning__right__item__desc">
                      2/3 | 23:09
                    </span>
                  </div>
                ),
                children: (
                  <div className="learning__right__item__content">
                    <div
                      className={`learning__right__item__list_item ${
                        activeIndex == 1 ? "active_learning__course" : ""
                      }`}
                      onClick={() => handleSubmidVideo(1, "Bunu0wj6c9c?si=kzIzXc2ooZCithYX")}
                    >
                      <div className="learning__right__item__content__left">
                        <h3 className="learning__right__item__content__left__title">
                          1. Mô hình Client - Server là gì?
                        </h3>
                        <span className="learning__right__item__content__left__time">
                          <CoffeeOutlined />
                          11:35
                        </span>
                      </div>
                      <div className="learning__right__item__content__right">
                        <CheckCircleOutlined />
                      </div>
                    </div>
                    <div
                      onClick={() => handleSubmidVideo(2)}
                      className={`learning__right__item__list_item ${
                        activeIndex == 2 ? "active_learning__course" : ""
                      }`}
                    >
                      <div className="learning__right__item__content__left">
                        <h3 className="learning__right__item__content__left__title">
                          2. Domain là gì? Tên miền là gì?
                        </h3>
                        <span className="learning__right__item__content__left__time">
                          <CoffeeOutlined />
                          11:35
                        </span>
                      </div>
                      <div className="learning__right__item__content__right">
                        <CheckCircleOutlined />
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                key: "2",
                label: (
                  <div className="learning__right__item">
                    <h3 className="learning__right__item__name_chapter">
                      2. Môi trường, con người IT
                    </h3>
                    <span className="learning__right__item__desc">
                      2/3 | 23:09
                    </span>
                  </div>
                ),
                children: (
                  <div className="learning__right__item__content">
                    <div
                      className={`learning__right__item__list_item ${
                        activeIndex == 3 ? "active_learning__course" : ""
                      }`}
                      onClick={() => handleSubmidVideo(3)}
                    >
                      <div className="learning__right__item__content__left">
                        <h3 className="learning__right__item__content__left__title">
                          1. Mô hình Client - Server là gì?
                        </h3>
                        <span className="learning__right__item__content__left__time">
                          <CoffeeOutlined />
                          11:35
                        </span>
                      </div>
                      <div className="learning__right__item__content__right">
                        <CheckCircleOutlined />
                      </div>
                    </div>
                    <div
                      className={`learning__right__item__list_item ${
                        activeIndex == 4 ? "active_learning__course" : ""
                      }`}
                      onClick={() => handleSubmidVideo(4)}
                    >
                      <div className="learning__right__item__content__left">
                        <h3 className="learning__right__item__content__left__title">
                          2. Domain là gì? Tên miền là gì?
                        </h3>
                        <span className="learning__right__item__content__left__time">
                          <CoffeeOutlined />
                          11:35
                        </span>
                      </div>
                      <div className="learning__right__item__content__right">
                        <CheckCircleOutlined />
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                key: "3",
                label: (
                  <div className="learning__right__item">
                    <h3 className="learning__right__item__name_chapter">
                      3. Phương pháp, định hướng
                    </h3>
                    <span className="learning__right__item__desc">
                      2/3 | 23:09
                    </span>
                  </div>
                ),
                children: (
                  <div className="learning__right__item__content">
                    <div
                      className={`learning__right__item__list_item ${
                        activeIndex == 5 ? "active_learning__course" : ""
                      }`}
                      onClick={() => handleSubmidVideo(5)}
                    >
                      <div className="learning__right__item__content__left">
                        <h3 className="learning__right__item__content__left__title">
                          1. Mô hình Client - Server là gì?
                        </h3>
                        <span className="learning__right__item__content__left__time">
                          <CoffeeOutlined />
                          11:35
                        </span>
                      </div>
                      <div className="learning__right__item__content__right">
                        <CheckCircleOutlined />
                      </div>
                    </div>
                    <div
                      className={`learning__right__item__list_item ${
                        activeIndex == 6 ? "active_learning__course" : ""
                      }`}
                      onClick={() => handleSubmidVideo(6)}
                    >
                      <div className="learning__right__item__content__left">
                        <h3 className="learning__right__item__content__left__title">
                          2. Domain là gì? Tên miền là gì?
                        </h3>
                        <span className="learning__right__item__content__left__time">
                          <CoffeeOutlined />
                          11:35
                        </span>
                      </div>
                      <div className="learning__right__item__content__right">
                        <CheckCircleOutlined />
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
            size="middle"
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) =>
              isActive ? (
                <MinusOutlined style={{ fontSize: "20px" }} /> // Kích thước icon khi thu gọn
              ) : (
                <PlusOutlined style={{ fontSize: "20px" }} /> // Kích thước icon khi mở rộng
              )
            }
            expandIconPosition="end"
          />
        </Col>
      </Row>
    </Layout>
  );
}

export default ContentLearning;
