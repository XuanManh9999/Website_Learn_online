import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import "./Romap.scss";
import { Col, Layout, Row, Collapse, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  MinusOutlined,
  PlayCircleOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  PlaySquareOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectCourse, selectorUser } from "../../../redux/selector";
import { getCourses, userRegisterCourse } from "../../../services/public/learn";
import Video from "../../share/Video";
import { show_login } from "../../../redux/action/show_hide";
import { getVideo, convertDurationCourse } from "../../../utils/fuc";
import useNotify from "../../share/Notification";
import { Link } from "react-router-dom";
import URL from "../../../utils/url-route";

function Romap() {
  const navigate = useNavigate();
  let stt = 0;
  const playerRef = useRef(null);
  const [course, setCourse] = useState({});
  const { contextHolder, notify } = useNotify();
  const [videoPreOrder, setVideoPreOrder] = useState({});
  const [isShowModel, setIsShowModel] = useState(false);
  const [activeKeys, setActiveKeys] = useState([]);
  const [isRegister, setIsRegister] = useState(0);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);

  const {
    isLoggedIn,
    payload: { id: IdUser },
  } = useSelector(selectorUser);
  const { id: IdCourse } = useSelector(selectCourse);

  const onReady = (event) => {
    playerRef.current = event.target;
  };

  const dispatch = useDispatch();
  const refCollapse = useRef();

  // Tạo hàm toggleExpandAll với useCallback để tránh tái tạo hàm không cần thiết
  const toggleExpandAll = useCallback(() => {
    const allKeys = course?.chapterList?.map((item) => item.id);
    if (activeKeys.length === allKeys?.length) {
      setActiveKeys([]); // Thu gọn tất cả
      refCollapse.current.textContent = "Mở rộng tất cả";
    } else {
      setActiveKeys(allKeys); // Mở rộng tất cả
      refCollapse.current.textContent = "Thu gọn tất cả";
    }
  }, [activeKeys, course]);

  const handlePanelChange = useCallback((keys) => {
    setActiveKeys(keys); // Cập nhật trực tiếp `activeKeys` với các key được mở
  }, []);

  const handleViewPrewView = () => {
    setIsShowModel(true);
  };

  const handleRegisterCourse = () => {
    if (!isLoggedIn) {
      dispatch(show_login());
    } else {
      setIsLoadingRegister(true);
      setTimeout(async () => {
        const { status, message } = await userRegisterCourse(IdUser, IdCourse);
        if (status === 200) {
          setIsLoadingRegister(false);
          notify("success", message, true);
          setTimeout(() => {
            fetchCourseData();
          }, 2000);
        } else if (status === 400) {
          setIsLoadingRegister(false);
          notify("warning", message, true);
        } else {
          setIsLoadingRegister(false);
          notify("error", message);
          navigate(URL.PUBLIC.SERVER_ERROR);
        }
      }, 1000);
    }
  };

  const fetchCourseData = useCallback(async () => {
    const { status, result } = await getCourses(1, IdUser, IdCourse);
    if (status === 200) {
      setCourse(result);
      const videoPre = getVideo(result?.chapterList);
      setActiveKeys([result?.chapterList[0]?.id]);
      setVideoPreOrder(videoPre);
      setIsRegister(result?.isUserRegister);
    }
  }, [IdCourse]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  const renderedChapters = useMemo(() => {
    return (course?.chapterList || []).map((chapter, index) => ({
      key: `${chapter.id}`,
      label: (
        <div className="container-romap-item__left-course--romap__info">
          <strong>
            {index + 1}. {chapter.title}
          </strong>
          <span>{chapter.total_videos} bài học</span>
        </div>
      ),
      children: (chapter?.videos || []).map((video) => (
        <div className="chapter_video" key={video.id}>
          <div className="container-romap-item__left-course--romap__content">
            <div className="container-romap-item__left-course--romap__content-left">
              <PlayCircleOutlined />{" "}
              <strong>
                {++stt}. {video.title}
              </strong>
            </div>
            <div className="container-romap-item__left-course--romap__content-reight">
              <span>{video.durationText}</span>
            </div>
          </div>
        </div>
      )),
    }));
  }, [course]);

  const handleShowModel = () => {
    setIsShowModel(false);
    playerRef.current.pauseVideo();
  };

  return (
    <>
      {contextHolder}
      <Layout className="container-romap">
        <Row className="container-romap-list-item" gutter={[25, 25]}>
          <Col xxl={18} xl={18} className="container-romap-item__left">
            <h1>{course.name}</h1>
            <p>{course.description}</p>
            <section className="container-romap-item__left--course">
              <h2>Nội dung khóa học</h2>
              <div className="container-romap-item__left--desc-course">
                <ul>
                  <li>
                    <strong>{course?.chapterList?.length}</strong> chương
                  </li>
                  <li>
                    <strong>{course?.videosCount}</strong> bài học
                  </li>
                  <li>
                    Thời lượng
                    <strong> {convertDurationCourse(course?.duration)}</strong>
                  </li>
                </ul>
                <span onClick={toggleExpandAll} ref={refCollapse}>
                  Mở rộng tất cả
                </span>
              </div>
            </section>
            <Collapse
              activeKey={activeKeys}
              onChange={handlePanelChange}
              className="container-romap-item__left-course--romap"
              expandIcon={({ isActive }) =>
                isActive ? <MinusOutlined /> : <PlusOutlined />
              }
              items={renderedChapters}
            />
          </Col>

          <Col xxl={6} xl={6} className="container-romap-item__right">
            <div
              className="container-romap-item__right-header"
              style={{
                backgroundImage: `url(${course?.image})`,
              }}
              onClick={handleViewPrewView}
            >
              <PlayCircleOutlined className="container-romap-item__right-header-icon" />
              <p className="container-romap-item__right-header-desc">
                Xem giới thiệu khóa học
              </p>
            </div>
            <div className="container-romap-item__right-header--type-course">
              <h5>Miễn phí</h5>
            </div>
            {!isLoggedIn || !isRegister ? (
              <Button
                loading={isLoadingRegister}
                type="primary"
                onClick={handleRegisterCourse}
              >
                Đăng ký khóa học
              </Button>
            ) : (
              <Link
                to={`/learning/${course?.slug}`}
                className="container-romap-item__right-header_to_learning"
              >
                Học ngay
              </Link>
            )}

            <ul className="container-romap-item__right-bottom">
              <li>
                <DashboardOutlined />
                Trình độ {course?.level}
              </li>
              <li>
                <PlaySquareOutlined />
                Tổng số
                <strong>{course?.videosCount}</strong>
                bài học
              </li>
              <li>
                <ClockCircleOutlined />
                Thời lượng
                <strong>{convertDurationCourse(course?.duration)}</strong>
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
        className="container-preview-introduction-video"
        open={isShowModel}
        onCancel={handleShowModel}
        centered
        footer={null}
        width={800}
      >
        <h3>Giới thiệu khóa học</h3>
        <div className="container-preview-introduction-video__content">
          <h2>{course?.name}</h2>
          <Video
            videoId={videoPreOrder?.urlVideo}
            playerRef={playerRef}
            onReady={onReady}
          />
        </div>
      </Modal>
    </>
  );
}

export default Romap;
