import "./LayoutLearning.scss";
import HeaderLearning from "../../components/share/HeaderLearning";
import ContentLearning from "../../components/private/ContentLearning";
import FooterLearning from "../../components/share/FooterLearning";
import { useSelector } from "react-redux";
import { selectCourse, selectorUser } from "../../redux/selector";
import { useCallback, useEffect, useState } from "react";
import { getCourses } from "../../services/public/learn";

function LayoutLearning() {
  const [course, setCourse] = useState({});

  const {
    payload: { id: IdUser },
  } = useSelector(selectorUser);
  const { id: IdCourse } = useSelector(selectCourse);

  const fetchCourseData = useCallback(async () => {
    const { status, result } = await getCourses(1, IdUser, IdCourse);
    if (status === 200) {
      setCourse(result);
    }
  }, [IdCourse, IdUser]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  return (
    <>
      <HeaderLearning course={course}/>
      <ContentLearning course={course} IdUser={IdUser}/>
      <FooterLearning  course={course}/>
    </>
  );
}

export default LayoutLearning;
