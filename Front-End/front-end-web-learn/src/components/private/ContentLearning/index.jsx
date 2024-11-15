import YouTube from "react-youtube";
import "./ContentLearning.scss";
import { Col, Layout, Row, Button, Collapse } from "antd";
import { formatDate } from "../../../utils/fuc";
import { userCompeleteVideo } from "../../../services/public/learn";
import { useDispatch, useSelector } from "react-redux";
import { update_id_course } from "../../../redux/action/course";
import { Helmet } from "react-helmet";
import {
  PlusOutlined,
  MinusOutlined,
  CheckCircleOutlined,
  CoffeeOutlined,
  LockOutlined,
} from "@ant-design/icons"; // Sử dụng icon tuỳ chỉnh từ Ant Design hoặc icon của riêng bạn
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getCourses } from "../../../services/public/learn";
import { selectCourse } from "../../../redux/selector";
function ContentLearning({ IdUser, idChapter, setCourseLayoutLearning }) {
  const { id: IdCourse } = useSelector(selectCourse);
  const dispatch = useDispatch();
  const titleVideo = useRef();
  const updateCourse = useRef();
  let sttVideo = 0;
  const [activeIndex, setActiveIndex] = useState(null);
  const [videoActive, setVideoActive] = useState();
  const [lastVideoActive, setLastVideoActive] = useState();
  const [course, setCourse] = useState({});
  const fetchingData = async () => {
    const { status, result } = await getCourses(1, IdUser, IdCourse);
    if (status === 200) {
      setCourse(result);
      setCourseLayoutLearning(result);
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);
  useEffect(() => {
    let video_last = [];
    (course?.chapterList || []).forEach((chapter) => {
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
  }, [course]);
  const handleSubmidVideo = (id, url_video, title) => {
    setActiveIndex(id); // Cập nhật chỉ số của phần tử được chọn
    setVideoActive(url_video);
    titleVideo.current.textContent = title;
    updateCourse.current.textContent = course?.updatedAt
      ? formatDate(course?.updatedAt)
      : formatDate(course?.createdAt);
  };

  const handleSubmidNote = () => {
    dispatch(update_id_course(22));
  };
  // Hàm xử lý sự kiện khi video kết thúc
  const handleEnd = (event) => {
    const fetchingDataWatchingVideo = async () => {
      const response = await userCompeleteVideo(IdUser, activeIndex);
      if (response?.status == 200) {
        fetchingData();
      }
    };
    fetchingDataWatchingVideo();
  };

  return (
    <>
      <Helmet>
        <title>Tiêu đề mặc định của trang</title>
        <meta name="description" content="Mô tả mặc định cho trang" />
      </Helmet>
      <Layout className="content_learning">
        <Row className="learning">
          <Col xxl={18} xl={18} className="learning__left">
            <div className="learning__left__video">
              <YouTube
                videoId={videoActive}
                onEnd={handleEnd} // Sự kiện end
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
              defaultActiveKey={[idChapter]}
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
                      {chapter?.total_video_user_watch}/{chapter?.total_videos}{" "}
                      | {chapter?.total_time_video}
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
                            activeIndex == video?.id
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
    </>
  );
}

export default ContentLearning;
