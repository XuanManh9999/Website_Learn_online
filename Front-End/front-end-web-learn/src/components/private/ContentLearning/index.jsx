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
import { useEffect, useRef, useState } from "react";
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
  // Trạng thái lưu video hiện tại
  const [activeVideo, setActiveVideo] = useState({
    id: null,
    urlVideo: "",
    title: "",
  });
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
      let video_last = [];
      course.chapterList.forEach((chapter) => {
        video_last.push(
          ...chapter.videos.filter((video) => video.isUserWatchVideo === 1)
        );
      });

      if (video_last.length === 0) {
        if (course.chapterList?.length) {
          const { id, title, urlVideo } = course.chapterList[0]?.videos[0];
          setLastVideoActive(id);
          handleSubmidVideo(id, urlVideo, title);
        }
      } else {
        const curr = video_last[video_last.length - 1];
        handleSubmidVideo(curr?.id, curr?.urlVideo, curr?.title);
        for (const chapter of course.chapterList) {
          for (const video of chapter.videos) {
            if (video.id > curr?.id) {
              setLastVideoActive(video.id);
              return;
            }
          }
        }
      }
    }
  }, [course]);

  const handleSubmidVideo = (id, url_video, title) => {
    xu_ly_khi_tua = 0
    setActiveIndex(id);
    setVideoActive(url_video);
    setActiveVideo({ id, urlVideo: url_video, title });

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
    if (event.data === 1) {
      const currentTime = playerRef.current.getCurrentTime();
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
    } else if (event.data === 2 || event.data === 0) {
      setLastTime(0);
    }
  };

  const hideModal = () => {
    setOpen(false);
    playerRef.current.playVideo();
  };

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
                  <Link target="_blank" to={"https://www.facebook.com/profile.php?id=100050105460828"}>
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
                className="learning__right__list-item"
                items={(course?.chapterList || []).map((chapter, index) => ({
                  key: chapter?.id,
                  label: (
                    <div className="learning__right__item">
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
        chapters={course.chapterList}
        activeIndex={activeVideo.id}
        handleSubmidVideo={handleSubmidVideo}
        setIsShowOption={setIsShowOption}
        isShowOption={isShowOption}
      />
    </>
  );
}

export default ContentLearning;
