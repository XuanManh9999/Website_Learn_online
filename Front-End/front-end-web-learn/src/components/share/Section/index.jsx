import React, { useEffect, useState } from "react";
import "./Section.scss";
import { Col, Layout, Row } from "antd";
import URL from "../../../utils/url-route";
import { useDispatch } from "react-redux";
import {
  RightOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { getCoursesDB } from "../../../services/public/learn";
import { update_id_course } from "../../../redux/action/course";
function Section() {
  const dispatch = useDispatch();
  const [coursesType, setCoursesType] = useState([]);
  useEffect(() => {
    const fetchingData = async () => {
      const { result } = await getCoursesDB();
      setCoursesType(result.courseTypeDTOList);
    };
    fetchingData();
  }, []);

  const handleDispatch = (id) => {
    dispatch(update_id_course(id));
  };

  return (
    <>
      {(coursesType || []).map((coursesType) => (
        <div className="section-containner" id="section">
          <div className="section-header">
            <h2 className="section-header-left">
              <Link>{coursesType?.nameType}</Link>
            </h2>
            <div className="section-header-reight">
              <Link to={URL.PUBLIC.LEARNING_MAP}>
                Xem lộ trình
                <RightOutlined />
              </Link>
            </div>
          </div>
          <Layout className="section-container-content">
            <Row className="section-container-list-items" gutter={[20, 20]}>
              {((coursesType && coursesType.courseResponseList) || []).map(
                (course) => (
                  <Col
                    key={course.id}
                    xxl={4}
                    xl={6}
                    lg={8}
                    className="section-container-item"
                  >
                    <div className="section-container-item__header">
                      <Link
                        onClick={() => handleDispatch(course.id)}
                        to={`/courses/${course.slug}`}
                      >
                        <img src={course.image} alt="course-free" />
                      </Link>
                    </div>
                    <div className="section-container-item__content">
                      <h3>
                        <Link
                          onClick={() => handleDispatch(course.id)}
                          to={`${URL.PUBLIC.COURSE}${course.slug}`}
                        >
                          {course.name}
                        </Link>
                      </h3>
                      <div className="section-container-item__content-type-course">
                        {course.price == 0 ? <span>Miễn phí</span> : " "}
                      </div>
                      <div className="section-container-item__content-desc">
                        <div className="section-container-item__content-desc-left">
                          <img src={course.author_img} alt="avatar" />
                          <span>{course.author}</span>
                        </div>
                        <div className="section-container-item__content-desc-center">
                          <UsergroupAddOutlined />
                          <span>{course.studentsCount}</span>
                        </div>
                        <div className="section-container-item__content-desc-reight">
                          <ClockCircleOutlined />
                          <span>{course.durationText}</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                )
              )}
            </Row>
          </Layout>
        </div>
      ))}
    </>
  );
}
export default Section;
