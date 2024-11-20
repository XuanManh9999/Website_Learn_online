import YouTube from "react-youtube";
import "./ContentLearning.scss";
import { Col, Layout, Row, Button, Collapse, Modal } from "antd";
import { formatDate } from "../../../utils/fuc";
import { userCompeleteVideo } from "../../../services/public/learn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  PlusOutlined,
  MinusOutlined,
  CheckCircleOutlined,
  CoffeeOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { getCourses } from "../../../services/public/learn";
import { selectCourse } from "../../../redux/selector";
import FooterLearning from "../../share/FooterLearning";
import URL from "../../../utils/url-route";

let xu_ly_khi_tua = 0;

function ContentLearning({ IdUser, idChapter, setCourseLayoutLearning }) {
  const navigate = useNavigate();
  let sttVideo = -1;  
  const [open, setOpen] = useState(false);
  const playerRef = useRef(null);
  const [lastTime, setLastTime] = useState(0);
  const { id: IdCourse } = useSelector(selectCourse);
  const titleVideo = useRef();
  const updateCourse = useRef();
  const [activeIndex, setActiveIndex] = useState(null);
  const [videoActive, setVideoActive] = useState(null);
  const [isShowOption, setIsShowOption] = useState(true);
  const [activeKey, setActiveKeys] = useState([idChapter]);
  const [lastVideoActive, setLastVideoActive] = useState(null);
  const [course, setCourse] = useState({});

  const fetchingData = async () => {
    const { status, result } = await getCourses(1, IdUser, IdCourse);
    if (status === 200) {
      setCourse(result);
      setCourseLayoutLearning(result);
    } else {
      navigate(URL.PUBLIC.SERVER_ERROR);
    }
  };

  useEffect(() => {
    fetchingData();
  }, [IdCourse, IdUser]);

  useEffect(() => {
    if (course?.chapterList) {
      let lastWatchedVideo = null;
      for (const chapter of course.chapterList) {
        const watchedVideos = chapter.videos.filter(
          (video) => video.isUserWatchVideo === 1
        );
        if (watchedVideos.length) {
          lastWatchedVideo = watchedVideos[watchedVideos.length - 1];
        }
      }

      if (!lastWatchedVideo) {
        // Nếu chưa có video nào được xem
        const firstVideo = course.chapterList[0]?.videos[0];
        if (firstVideo) {
          setTimeout(() => {
            setLastVideoActive(firstVideo.id);
            handleSubmidVideo(
              firstVideo.id,
              firstVideo.urlVideo,
              firstVideo.title
            );
          }, 300);
        }
      } else {
        // Cập nhật video cuối cùng được xem
        if (lastWatchedVideo) {
          setTimeout(() => {
            handleSubmidVideo(
              lastWatchedVideo.id,
              lastWatchedVideo.urlVideo,
              lastWatchedVideo.title
            );
          }, 300);
        }
        setTimeout(() => {
          setLastVideoActive(lastWatchedVideo.id + 1);
        }, 300);
      }
    }
  }, [course]);

  const handleSubmidVideo = (id, url_video, title) => {
    xu_ly_khi_tua = 0;
    setActiveIndex(id);
    setVideoActive(url_video);
    titleVideo.current.textContent = title;
    updateCourse.current.textContent = course.updatedAt
      ? formatDate(course.updatedAt)
      : formatDate(course.createdAt);
  };

  const handleSubmidNote = () => {};

  // Event handler for video end
  const handleEnd = async () => {
    const response = await userCompeleteVideo(IdUser, activeIndex);
    if (response?.status === 200) {
      fetchingData();
    }
  };

  const handleOnPlay = () => {};

  const onReady = (event) => {
    playerRef.current = event.target;
  };

  const onStateChange = (event) => {
    if (event.data === 1 && playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime() || 0;
      if (Math.abs(currentTime - lastTime) > 1) {
        xu_ly_khi_tua++;
        if (xu_ly_khi_tua >= 7) {
          setOpen(true);
          playerRef.current.pauseVideo();
          xu_ly_khi_tua = 0;
        }
        setLastTime(currentTime);
      } else {
        setLastTime(currentTime);
      }
    }
  };

  const hideModal = () => {
    setOpen(false);
    playerRef.current.playVideo();
  };

  const handleOnchangeCollapse = useCallback((keys) => {
    setActiveKeys(keys); // Cập nhật trực tiếp `activeKeys` với các key được mở
  }, []);
  return (
    <>
      <Layout className="content_learning">
        <Row className="learning">
          <Col
            xxl={isShowOption ? 18 : 24}
            xl={isShowOption ? 18 : 24}
            className="learning__left"
          >
            <div className="learning__left__video">
              <YouTube
                videoId={videoActive}
                onPlay={handleOnPlay}
                onEnd={handleEnd}
                onReady={onReady}
                onStateChange={onStateChange}
              />
            </div>
            <div className="learning__left__mid">
              <div className="learning__left__mid--title">
                <h2 ref={titleVideo}>Mô hình Client - Server là gì?</h2>
                <p ref={updateCourse}>Cập nhật tháng 11 năm 2022</p>
              </div>
              <div className="learning__left__mid--note">
                <Button onClick={handleSubmidNote}>
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
                  Facebook:{" "}
                  <Link
                    target="_blank"
                    to={
                      "https://www.facebook.com/profile.php?id=100050105460828"
                    }
                  >
                    https://www.facebook.com/profile.php?id=100050105460828
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          {isShowOption && (
            <Col xxl={6} xl={6} className="learning__right">
              <h2 className="learning__right__title">Nội dung khóa học</h2>
              <Collapse
                defaultActiveKey={[idChapter]}
                activeKey={activeKey}
                onChange={handleOnchangeCollapse}
                className="learning__right__list-item"
                items={(course?.chapterList || []).map((chapter, index) => ({
                  key: chapter?.id,
                  label: (
                    <div key={chapter?.id} className="learning__right__item">
                      <h3 className="learning__right__item__name_chapter">
                        ({index + 1}). {chapter?.title}
                      </h3>
                      <span className="learning__right__item__desc">
                        {chapter?.total_video_user_watch}/
                        {chapter?.total_videos} | {chapter?.total_time_video}
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
                              activeIndex === video?.id
                                ? "active_video_course"
                                : ""
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
                                {++sttVideo + 1}. {video?.title}
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
                expandIconPosition="end"
                expandIcon={({ isActive }) =>
                  isActive ? <MinusOutlined /> : <PlusOutlined />
                }
              />
            </Col>
          )}
        </Row>
      </Layout>
      <Modal
        title={<h1>Thông báo</h1>}
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Đồng ý"
        className="nofity-modal-warning"
        centered
      >
        <h2>
          Chế độ học tập tại <strong>CODE ZEN</strong>:{" "}
          <strong>
            Tạo chế độ giúp học viên duy trì sự tập trung, chúng tôi chỉ cho
            phép tua, chuyển tới video tiếp theo trong một phạm vi hợp lí. Hiện
            tại chúng tôi nhận thấy bạn vi phạm điều đó quá nhiều khi học. Vui
            lòng hạn chế để trải nghiệm học tập tại CODE ZEN được tốt nhất
          </strong>
        </h2>
      </Modal>
      <FooterLearning
        chapters={course?.chapterList}
        activeIndex={activeIndex}
        handleSubmidVideo={handleSubmidVideo}
        setIsShowOption={setIsShowOption}
        isShowOption={isShowOption}
        lastVideoActive={lastVideoActive}
        setActiveKeys={setActiveKeys}
      />
    </>
  );
}

export default ContentLearning;
