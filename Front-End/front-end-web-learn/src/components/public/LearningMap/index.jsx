import React from "react";
import "./LearningMap.scss";
import { Link } from "react-router-dom";
import { Button, Progress, Tooltip } from "antd";

function LearningMap() {
  return (
    <div className="learning-map">
      <div className="learning-map__wrapper">
        <div className="learning-map__top">
          <h1 className="learning-map__top__title">Lộ trình học</h1>
          <p className="learning-map__top__desc">
            Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình
            học. Ví dụ: Để đi làm với vị trí "Lập trình viên Front-end" bạn nên
            tập trung vào lộ trình "Front-end".
          </p>
        </div>
        <div className="learning-map__mid">
          <div className="learning-map__mid__item">
            <div className="learning-map__mid__wapper">
              <div className="learning-map__mid__left">
                <div className="learning-map__mid__left__content">
                  <Link className="learning-map__mid__left__content__title">
                    Lộ trình học Front-end
                  </Link>
                  <p className="learning-map__mid__left__content__desc">
                    Lập trình viên Front-end là người xây dựng ra giao diện
                    websites. Trong phần này CODE ZEN sẽ chia sẻ cho bạn lộ
                    trình để trở thành lập trình viên Front-end nhé.
                  </p>
                </div>
              </div>
              <div className="learning-map__mid__right">
                <Link className="learning-map__mid__left__img">
                  <img
                    src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="learning-map__mid__bot">
              <div className="learning-map__mid__bot__wrapper">
                <div className="learning-map__mid__bot__wrapper_content">
                  <Link>
                    <Tooltip
                      className="learning-map__mid__bot__wrapper_content__tooltip"
                      placement="top"
                      title={"Học Javascript"}
                    >
                      <Progress
                        type="circle"
                        className="learning-map__mid__bot__wrapper_content-language"
                        percent={50}
                        size={40}
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        format={() => (
                          <img
                            src="https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png"
                            alt=""
                          />
                        )}
                      ></Progress>
                    </Tooltip>
                  </Link>
                  <Link>
                    <Tooltip
                      className="learning-map__mid__bot__wrapper_content__tooltip"
                      placement="top"
                      title={"Học Javascript"}
                    >
                      <Progress
                        type="circle"
                        className="learning-map__mid__bot__wrapper_content-language"
                        percent={50}
                        size={40}
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        format={() => (
                          <img
                            src="https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png"
                            alt=""
                          />
                        )}
                      ></Progress>
                    </Tooltip>
                  </Link>
                  <Link>
                    <Tooltip
                      className="learning-map__mid__bot__wrapper_content__tooltip"
                      placement="top"
                      title={"Học Javascript"}
                    >
                      <Progress
                        type="circle"
                        className="learning-map__mid__bot__wrapper_content-language"
                        percent={50}
                        size={40}
                        v
                        format={() => (
                          <img
                            src="https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png"
                            alt=""
                          />
                        )}
                      ></Progress>
                    </Tooltip>
                  </Link>
                  <Link>
                    <Tooltip
                      className="learning-map__mid__bot__wrapper_content__tooltip"
                      placement="top"
                      title={"Học Javascript"}
                    >
                      <Progress
                        type="circle"
                        className="learning-map__mid__bot__wrapper_content-language"
                        percent={50}
                        size={40}
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        format={() => (
                          <img
                            src="https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png"
                            alt=""
                          />
                        )}
                      ></Progress>
                    </Tooltip>
                  </Link>
                  <Link>
                    <Tooltip
                      className="learning-map__mid__bot__wrapper_content__tooltip"
                      placement="top"
                      title={"Học Javascript"}
                    >
                      <Progress
                        type="circle"
                        className="learning-map__mid__bot__wrapper_content-language"
                        percent={50}
                        size={40}
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        format={() => (
                          <img
                            src="https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png"
                            alt=""
                          />
                        )}
                      ></Progress>
                    </Tooltip>
                  </Link>
                  <Link>
                    <Tooltip
                      className="learning-map__mid__bot__wrapper_content__tooltip"
                      placement="top"
                      title={"Học Javascript"}
                    >
                      <Progress
                        type="circle"
                        className="learning-map__mid__bot__wrapper_content-language"
                        percent={50}
                        size={40}
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        format={() => (
                          <img
                            src="https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png"
                            alt=""
                          />
                        )}
                      ></Progress>
                    </Tooltip>
                  </Link>
                </div>
                <div className="learning-map__mid__bot__wrapper__view_more">
                  <Button type="primary">Xem chi tiết</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="learning-map__mid__item">
            <div className="learning-map__mid__wapper">
              <div className="learning-map__mid__left">
                <div className="learning-map__mid__left__content">
                  <Link className="learning-map__mid__left__content__title">
                    Lộ trình học Back-end
                  </Link>
                  <p className="learning-map__mid__left__content__desc">
                    Trái với Front-end thì lập trình viên Back-end là người làm
                    việc với dữ liệu, công việc thường nặng tính logic hơn.
                    Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học Back-end nhé.
                  </p>
                </div>
              </div>
              <div className="learning-map__mid__right">
                <Link className="learning-map__mid__left__img">
                  <img
                    src="https://files.fullstack.edu.vn/f8-prod/learning-paths/3/63b4641535b16.png"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="learning-map__mid__bot">
              <div className="learning-map__mid__bot__wrapper">
                <div className="learning-map__mid__bot__wrapper_content">
                  <Link>
                    <Tooltip
                      className="learning-map__mid__bot__wrapper_content__tooltip"
                      placement="top"
                      title={"Học Javascript"}
                    >
                      <Progress
                        type="circle"
                        className="learning-map__mid__bot__wrapper_content-language"
                        percent={50}
                        size={40}
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        format={() => (
                          <img
                            src="https://files.fullstack.edu.vn/f8-prod/courses/1/6200ad9d8a2d8.png"
                            alt=""
                          />
                        )}
                      ></Progress>
                    </Tooltip>
                  </Link>
                  <Link>
                    <Tooltip
                      className="learning-map__mid__bot__wrapper_content__tooltip"
                      placement="top"
                      title={"Học Javascript"}
                    >
                      <Progress
                        type="circle"
                        className="learning-map__mid__bot__wrapper_content-language"
                        percent={50}
                        size={40}
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        format={() => (
                          <img
                            src="https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png"
                            alt=""
                          />
                        )}
                      ></Progress>
                    </Tooltip>
                  </Link>
                  <Link>
                    <Tooltip
                      className="learning-map__mid__bot__wrapper_content__tooltip"
                      placement="top"
                      title={"Học Javascript"}
                    >
                      <Progress
                        type="circle"
                        className="learning-map__mid__bot__wrapper_content-language"
                        percent={50}
                        size={40}
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        format={() => (
                          <img
                            src="https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png"
                            alt=""
                          />
                        )}
                      ></Progress>
                    </Tooltip>
                  </Link>
                  <Link>
                    <Tooltip
                      className="learning-map__mid__bot__wrapper_content__tooltip"
                      placement="top"
                      title={"Học Javascript"}
                    >
                      <Progress
                        type="circle"
                        className="learning-map__mid__bot__wrapper_content-language"
                        percent={50}
                        size={40}
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        format={() => (
                          <img
                            src="https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png"
                            alt=""
                          />
                        )}
                      ></Progress>
                    </Tooltip>
                  </Link>
                  <Link>
                    <Tooltip
                      className="learning-map__mid__bot__wrapper_content__tooltip"
                      placement="top"
                      title={"Học Javascript"}
                    >
                      <Progress
                        type="circle"
                        className="learning-map__mid__bot__wrapper_content-language"
                        percent={50}
                        size={40}
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        format={() => (
                          <img
                            src="https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png"
                            alt=""
                          />
                        )}
                      ></Progress>
                    </Tooltip>
                  </Link>
                  <Link>
                    <Tooltip
                      className="learning-map__mid__bot__wrapper_content__tooltip"
                      placement="top"
                      title={"Học Javascript"}
                    >
                      <Progress
                        type="circle"
                        className="learning-map__mid__bot__wrapper_content-language"
                        percent={50}
                        size={40}
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        format={() => (
                          <img
                            src="https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png"
                            alt=""
                          />
                        )}
                      ></Progress>
                    </Tooltip>
                  </Link>
                </div>
                <div className="learning-map__mid__bot__wrapper__view_more">
                  <Button type="primary">Xem chi tiết</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="learning-map__bot">
          <div className="learning-map__bot__left">
            <h2 className="learning-map__bot__left__title">
              Tham gia cộng đồng học viên CODE ZEN trên Facebook
            </h2>
            <p className="learning-map__bot__left__desc">
              Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy tham
              gia hỏi đáp, chia sẻ và hỗ trợ nhau trong quá trình học nhé.
            </p>
            <Button>Tham gia nhóm</Button>
          </div>
          <div className="learning-map__bot__reight">
            <img
              src="https://fullstack.edu.vn/assets/fb-group-cards-CAn_kGMe.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningMap;
