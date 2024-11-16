import React from "react";
import { Progress } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update_id_course } from "../../../redux/action/course";
function MyCourseItem({ img, title, process, nameClass, id, slug }) {
  const dispatch = useDispatch();
  const handleDispatchLearning = () => {
    dispatch(update_id_course(id));
  };
  return (
    <Link
      onClick={handleDispatchLearning}
      to={`/learning/${slug}`}
      className={`container-my-course__item-${nameClass}`}
    >
      <img src={img} alt={title} />
      <div className={`container-my-course__item--desc-${nameClass}`}>
        {nameClass != "bell" ? <h3>{title}</h3> : <strong>{title}</strong>}
        {nameClass != "bell" && (
          <Progress
            status="active"
            strokeColor={{
              from: "#108ee9",
              to: "#87d068",
            }}
            percent={process}
            size="small"
          />
        )}
      </div>
    </Link>
  );
}
export default MyCourseItem;
