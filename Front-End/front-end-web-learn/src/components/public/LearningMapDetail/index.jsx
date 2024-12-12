import React from "react";
import "./LearningMapDetail.scss";
import { useParams } from "react-router-dom";
import { Button } from "antd";

function LearningMapDetail() {
  const { slug } = useParams();
  return (
    <div className="learning-map-detail">
      <div className="learning-map-detail__content">
        <div className="learning-map-detail__content__desc_map">
          <h2 className="learning-map-detail__content__title">
            Lộ trình học Front-end
          </h2>
          <p>
            Hầu hết các websites hoặc ứng dụng di động đều có 2 phần là
            Front-end và Back-end. Front-end là phần giao diện người dùng nhìn
            thấy và có thể tương tác, đó chính là các ứng dụng mobile hay những
            website bạn đã từng sử dụng. Vì vậy, nhiệm vụ của lập trình viên
            Front-end là xây dựng các giao diện đẹp, dễ sử dụng và tối ưu trải
            nghiệm người dùng.
          </p>
          <p>
            Tại Việt Nam, lương trung bình cho lập trình viên front-end vào
            khoảng <strong>16.000.000đ</strong> / tháng.
          </p>
          <p>
            Dưới đây là các khóa học CODE ZEN đã tạo ra dành cho bất cứ ai theo đuổi
            sự nghiệp trở thành một lập trình viên Front-end.
          </p>
          <blockquote>
            <p>
              Các khóa học có thể chưa đầy đủ, CODE ZEN vẫn đang nỗ lực hoàn thiện
              trong thời gian sớm nhất.
            </p>
          </blockquote>
        </div>
        <div className="learning-map-detail__content__container">
          <div className="learning-map-detail__content__courses">
            <div className="learning-map-detail__content__courses__course">
              <h3 className="learning-map-detail__content__courses__course__title">
                1. Tìm hiểu về ngành IT
              </h3>
              <p className="learning-map-detail__content__course__desc">
                Để theo ngành IT - Phần mềm cần rèn luyện những kỹ năng nào? Bạn
                đã có sẵn tố chất phù hợp với ngành chưa? Cùng thăm quan các
                công ty IT và tìm hiểu về văn hóa, tác phong làm việc của ngành
                này nhé các bạn.
              </p>
              <div className="learning-map-detail__content__course__content">
                <img
                  src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
                  alt="image-course"
                />
                <div className="learning-map-detail__content__course__content__section">
                  <h4>Kiến Thức Nhập Môn IT</h4>
                  <span>Miễn phí</span>
                  <p>
                    Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn
                    nên xem các videos tại khóa này trước nhé.
                  </p>
                  <Button type="primary">Tiếp tục học</Button>
                </div>
              </div>
            </div>
            <div className="learning-map-detail__content__courses__course">
              <h3 className="learning-map-detail__content__courses__course__title">
                1. Tìm hiểu về ngành IT
              </h3>
              <p className="learning-map-detail__content__course__desc">
                Để theo ngành IT - Phần mềm cần rèn luyện những kỹ năng nào? Bạn
                đã có sẵn tố chất phù hợp với ngành chưa? Cùng thăm quan các
                công ty IT và tìm hiểu về văn hóa, tác phong làm việc của ngành
                này nhé các bạn.
              </p>
              <div className="learning-map-detail__content__course__content">
                <img
                  src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
                  alt="image-course"
                />
                <div className="learning-map-detail__content__course__content__section">
                  <h4>Kiến Thức Nhập Môn IT</h4>
                  <span>Miễn phí</span>
                  <p>
                    Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn
                    nên xem các videos tại khóa này trước nhé.
                  </p>
                  <Button type="primary">Tiếp tục học</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="learning-map-detail__content__container__banner">
            <div className="learning-map-detail__content__container__banner__item">
              <img
                src="https://files.fullstack.edu.vn/f8-prod/banners/22/63dc5f7e5562c.png"
                alt=""
              />
            </div>
            <div className="learning-map-detail__content__container__banner__item">
              <img
                src="https://files.fullstack.edu.vn/f8-prod/banners/22/63dc5f7e5562c.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningMapDetail;
