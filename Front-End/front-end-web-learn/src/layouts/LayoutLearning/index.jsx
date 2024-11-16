import HeaderLearning from "../../components/share/HeaderLearning";
import ContentLearning from "../../components/private/ContentLearning";
import FooterLearning from "../../components/share/FooterLearning";
import { useSelector } from "react-redux";
import { selectCourse, selectorUser } from "../../redux/selector";
import { useCallback, useEffect, useState } from "react";
import { getCourses } from "../../services/public/learn";
import useNotify from "../../components/share/Notification";
import "./LayoutLearning.scss";
function LayoutLearning() {
  const { contextHolder, notify } = useNotify();
  const [course, setCourse] = useState({});
  const [idChapter, setIdChapter] = useState();
  const {
    payload: { id: IdUser },
  } = useSelector(selectorUser);
  const { id: IdCourse } = useSelector(selectCourse);
  const fetchCourseData = useCallback(async () => {
    const { status, result } = await getCourses(1, IdUser, IdCourse);
    if (status === 200) {
      setCourse(result);
    } else {
      notify("warning", "Đã xảy lỗi từ hệ thống, vui lòng truy cập lại sau");
    }
  }, [IdCourse, IdUser]);
  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  useEffect(() => {
    if (course?.chapterList) {
      let video_last = [];
      course.chapterList.forEach((chapter) => {
        chapter?.videos.forEach((video) => {
          if (video?.isUserWatchVideo === 1) {
            video_last.push({
              ...video,
              idChapter: chapter?.id,
            });
          }
        });
      });

      if (video_last.length === 0) {
        if (course.chapterList?.length) {
          setIdChapter(course.chapterList[0]?.id);
        }
      } else {
        const curr = video_last[video_last.length - 1];
        let isChecked = true;
        for (const chapter of course?.chapterList) {
          for (const video of chapter.videos) {
            if (video.id > curr?.id) {
              setIdChapter(chapter?.id);
              isChecked = false;
              return;
            }
          }
        }
        if (isChecked) {
          setIdChapter(curr?.idChapter);
        }
      }
    }
  }, [course]);

  if (IdUser != null && Object.keys(course).length > 0 && idChapter) {
    return (
      <>
        {contextHolder}
        <HeaderLearning course={course} />
        <ContentLearning
          course={course}
          IdUser={IdUser}
          idChapter={idChapter}
          setCourseLayoutLearning={setCourse}
        />
      </>
    );
  }
}

export default LayoutLearning;
