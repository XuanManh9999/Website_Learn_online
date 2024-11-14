import YouTube from "react-youtube";
import "./ContentLearning.scss";
import { Col, Layout, Row, Button, Collapse } from "antd";
import { formatDate } from "../../../utils/fuc";
import { userCompeleteVideo } from "../../../services/public/learn";
import { useDispatch } from "react-redux";
import { update_id_course } from "../../../redux/action/course";
import {
  PlusOutlined,
  MinusOutlined,
  CheckCircleOutlined,
  CoffeeOutlined,
  LockOutlined,
} from "@ant-design/icons"; // Sử dụng icon tuỳ chỉnh từ Ant Design hoặc icon của riêng bạn
import { Link } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
function ContentLearning({ course, IdUser }) {
  const dispatch = useDispatch();
  const titleVideo = useRef();
  const updateCourse = useRef();
  let sttVideo = 0;
  const [activeIndex, setActiveIndex] = useState(null);
  const [videoActive, setVideoActive] = useState();
  const [lastVideoActive, setLastVideoActive] = useState();
  const [activeKeys, setActiveKeys] = useState([]);
  const [videoProgress, setVideoProgress] = useState(0); // Tiến trình video
  const [isNearEnd, setIsNearEnd] = useState(false); // Cờ để kiểm tra video còn 5s nữa

  const onPlayerStateChange = (event) => {
    setInterval(() => {
      // Kiểm tra khi video còn 5 giây nữa
      const duration = event.target.getDuration(); // Lấy độ dài video
      const currentTime = event.target.getCurrentTime(); // Lấy thời gian hiện tại của video
      if (duration - currentTime <= 5) {
        setIsNearEnd(true); // Đặt cờ khi video còn 5 giây
      } else {
        setIsNearEnd(false); // Khi không còn 5 giây nữa, đặt lại cờ
      }
    }, 1000);
  };

  const onPlayerPlay = (event) => {
    // Theo dõi thời gian phát video
    const duration = event.target.getDuration();
    const currentTime = event.target.getCurrentTime();
    setVideoProgress((currentTime / duration) * 100); // Tính toán tiến trình video
  };

  useEffect(() => {
    let video_last = [];
    let all_id_chapter = [];
    (course?.chapterList || []).forEach((chapter) => {
      all_id_chapter.push(chapter?.id);
      let response = chapter?.videos.filter((video) => {
        if (video?.isUserWatchVideo === 1) {
          return (video.idChapter = chapter?.id);
        }
      });
      if (response?.length > 0) {
        video_last.push(...response);
      }
    });
    if (video_last.length == 0) {
      if (course && Object.keys(course) != 0) {
        const { id, title, urlVideo } = course?.chapterList[0]?.videos[0];
        setLastVideoActive(id);
        handleSubmidVideo(id, urlVideo, title);
      }
    } else {
      // item cuoi cung la item duoc xem cuoi cung
      const curr = video_last[video_last?.length - 1];
      handleSubmidVideo(curr?.id, curr?.urlVideo, curr?.title);
      for (const chapter of course?.chapterList || []) {
        for (const video of chapter?.videos || []) {
          if (video?.id > curr?.id) {
            setLastVideoActive(video?.id);
            return; // Dừng ngay lập tức sau khi tìm thấy video
          }
        }
      }
    }
    setActiveKeys(all_id_chapter);
  }, [course]);
  const handleSubmidVideo = (id, url_video, title) => {
    setActiveIndex(id); // Cập nhật chỉ số của phần tử được chọn
    setVideoActive(url_video);
    titleVideo.current.textContent = title;
    updateCourse.current.textContent = course?.updatedAt
      ? formatDate(course?.updatedAt)
      : formatDate(course?.createdAt);
  };

  return (
    <Layout className="content_learning">
      <Row className="learning">
        <Col xxl={18} xl={18} className="learning__left">
          <div className="learning__left__video">
            <YouTube
              videoId={videoActive}
              opts={{ playerVars: { autoplay: 1 } }}
              onStateChange={onPlayerStateChange}
              onPlay={onPlayerPlay}
            />
          </div>
          <div className="learning__left__mid">
            <div className="learning__left__mid--title">
              <h2 ref={titleVideo}>Mô hình Client - Server là gì?</h2>
              <p ref={updateCourse}>Cập nhật tháng 11 năm 2022</p>
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
          defaultActiveKey={["33"]}
            // activeKey={activeKeys}
            className="learning__right__list-item"
            items={(course?.chapterList || []).map((chapter, index) => ({
              key: chapter?.id,
              label: (
                <div className="learning__right__item">
                  <h3 className="learning__right__item__name_chapter">
                    ({index + 1}). {chapter?.title}
                  </h3>
                  <span className="learning__right__item__desc">
                    2/3 | 23:09
                  </span>
                </div>
              ),
              children: (
                <>
                  {(chapter.videos || []).map((video) => (
                    <div
                      key={video?.id}
                      className={`learning__right__item__content ${
                        video?.isUserWatchVideo === 0 &&
                        video?.id !== lastVideoActive
                          ? "looked_video_course"
                          : ""
                      }`}
                    >
                      <div
                        className={`learning__right__item__list_item ${
                          activeIndex == video?.id ? "active_video_course" : ""
                        }`}
                        onClick={() =>
                          handleSubmidVideo(
                            video?.id,
                            video?.urlVideo,
                            video?.title
                          )
                        }
                      >
                        <div className="learning__right__item__content__left">
                          <h3 className="learning__right__item__content__left__title">
                            {++sttVideo}. {video?.title}
                          </h3>
                          <span className="learning__right__item__content__left__time">
                            <CoffeeOutlined />
                            {video?.durationText}
                          </span>
                        </div>
                        <div className="learning__right__item__content__right">
                          {video?.isUserWatchVideo === 1 ? (
                            <CheckCircleOutlined />
                          ) : video?.id === lastVideoActive ? (
                            ""
                          ) : (
                            <LockOutlined />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ),
            }))}
            size="middle"
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
