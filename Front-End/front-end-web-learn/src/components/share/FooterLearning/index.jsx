import React from "react";
import "./FooterLearning.scss";
import { Button } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  ArrowRightOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

function FooterLearning({
  chapters,
  activeIndex,
  handleSubmidVideo,
  setIsShowOption,
  isShowOption,
  lastVideoActive,
  setActiveKeys,
}) {
  // Gộp tất cả video từ các chapter
  const videos = chapters?.flatMap((chapter) =>
    chapter.videos.map((video) => ({
      ...video,
      idChapter: chapter?.id,
      chapterTitle: chapter.title,
    }))
  );

  // Vị trí hiện tại trong danh sách video
  const currentIndex = videos?.findIndex((video) => video.id === activeIndex);

  // Tìm bài trước và bài tiếp theo
  const prevVideo = currentIndex > 0 ? videos[currentIndex - 1] : null;

  const nextVideo =
    currentIndex < videos?.length - 1 && activeIndex < lastVideoActive
      ? videos[currentIndex + 1]
      : null;

  // Lấy tiêu đề chương và số thứ tự chương hiện tại
  const currentChapterTitle =
    videos?.[currentIndex]?.chapterTitle || "Chưa chọn chương học";

  const chapterIndex = chapters?.findIndex((chapter) =>
    chapter.videos.some((video) => video.id === activeIndex)
  );

  const handleToggleOption = () => {
    setIsShowOption((prev) => !prev);
  };

  const handleNextVideo = () => {
    if (nextVideo) {
      setTimeout(() => {
        if (nextVideo?.id && nextVideo?.urlVideo && nextVideo?.title) {
          handleSubmidVideo(nextVideo.id, nextVideo.urlVideo, nextVideo.title);
          setActiveKeys((prev) => {
            const isExits = prev?.some((item) => item === nextVideo?.idChapter);
            if (!isExits) {
              return [...prev, nextVideo?.idChapter];
            } else {
              return prev;
            }
          });
        }
      }, 300);
    }
  };

  const handlePrevVideo = () => {
    if (prevVideo) {
      setTimeout(() => {
        if (prevVideo?.id && prevVideo?.urlVideo && prevVideo?.title) {
          handleSubmidVideo(prevVideo.id, prevVideo.urlVideo, prevVideo.title);
          setActiveKeys((prev) => {
            let isExits = prev?.some((item) => item === prevVideo?.idChapter);
            if (!isExits) {
              return [...prev, prevVideo?.idChapter];
            } else {
              return prev;
            }
          });
        }
      }, 300);
    }
  };

  return (
    <footer className="container-footer-learning">
      <Button
        className="container-footer-learning__prev-subject"
        icon={<LeftOutlined />}
        type="primary"
        disabled={!prevVideo}
        onClick={handlePrevVideo}
      >
        {"Bài trước"}
      </Button>
      <Button
        className="container-footer-learning__next-subject"
        type="primary"
        disabled={!nextVideo}
        onClick={handleNextVideo}
      >
        {"Bài tiếp theo"}
        <RightOutlined />
      </Button>
      <div className="container-footer-learning__track-title">
        <h3>
          {chapterIndex + 1}. {currentChapterTitle}
        </h3>
        <div
          className="container-footer-learning__track-title__icon"
          onClick={handleToggleOption}
        >
          {isShowOption ? <ArrowRightOutlined /> : <UnorderedListOutlined />}
        </div>
      </div>
    </footer>
  );
}

export default FooterLearning;
