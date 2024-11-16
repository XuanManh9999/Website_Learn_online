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
}) {
  // Gộp tất cả video từ các chapter
  const videos = chapters?.flatMap((chapter) =>
    chapter.videos.map((video) => ({
      ...video,
      chapterTitle: chapter.title,
    }))
  );

  // Vị trí hiện tại trong danh sách video
  const currentIndex = videos?.findIndex((video) => video.id === activeIndex);

  // Tìm bài trước và bài tiếp theo
  const prevVideo = currentIndex > 0 ? videos[currentIndex - 1] : null;
  const nextVideo =
    currentIndex < videos?.length - 1 ? videos[currentIndex + 1] : null;

  // Lấy tiêu đề chương và số thứ tự chương hiện tại
  const currentChapterTitle =
    videos?.[currentIndex]?.chapterTitle || "Chưa chọn chương học";
  const currentChapterIndex =
    currentIndex >= 0 ? videos?.[currentIndex]?.chapterTitle : null;
  const chapterIndex = chapters?.findIndex((chapter) =>
    chapter.videos.some((video) => video.id === activeIndex)
  );

  const handleToggleOption = () => {
    setIsShowOption((prev) => !prev);
  };
  return (
    <footer className="container-footer-learning">
      <Button
        className="container-footer-learning__prev-subject"
        icon={<LeftOutlined />}
        type="primary"
        disabled={!prevVideo}
        onClick={() =>
          prevVideo &&
          handleSubmidVideo(prevVideo.id, prevVideo.urlVideo, prevVideo.title)
        }
      >
        {"Bài trước"}
      </Button>
      <Button
        className="container-footer-learning__next-subject"
        type="primary"
        disabled={!nextVideo}
        onClick={() =>
          nextVideo &&
          handleSubmidVideo(nextVideo.id, nextVideo.urlVideo, nextVideo.title)
        }
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
