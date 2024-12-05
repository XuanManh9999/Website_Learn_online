import React, { useEffect, useState } from "react";
import "./ModalVideos.scss";
import { Modal, Input, Checkbox, Button } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import theme
const modules = {
  toolbar: [
    // Header
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    // Font style
    [{ font: [] }],
    // Text styles
    [
      "bold",
      "italic",
      "underline",
      "strike",
      { script: "sub" },
      { script: "super" },
    ],
    // List styles
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    // Alignment
    [{ align: [] }],
    // Link, image, video
    ["link", "image", "video"],
    // Color and background
    [{ color: [] }, { background: [] }],
    // Code block
    ["code-block"],
    // Clear formatting
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "bold",
  "italic",
  "underline",
  "strike",
  "script",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
  "video",
  "color",
  "background",
  "code-block",
];
function ModalVideos({ isOpen, setIsOpenModalVideo, setDataChapter }) {
  const [dataVideo, setDataVideo] = useState([]);

  const handleOnchangeVideo = (event, index) => {
    const { name, value, checked } = event.target;
    setDataVideo((prev) => {
      // check xem co index video chua
      const isExits = prev.some((video) => video.index === index);
      if (isExits) {
        return prev.map((video) => {
          return video.index === index
            ? { ...video, [name]: value ?? (checked ? 1 : 0) }
            : video;
        });
      } else {
        return [
          ...prev,
          {
            index,
            [name]: value,
          },
        ];
      }
    });
  };
  // Reset dataVideo khi modal được mở
  useEffect(() => {
    if (isOpen?.open) {
      setDataVideo([]); // Xóa dữ liệu mỗi khi modal mở
    }
  }, [isOpen?.open]);
  return (
    <Modal
      title={
        <h1 className="container_modal__video_course__title">
          Nhập thông tin video
        </h1>
      }
      className="container_modal__video_course"
      open={isOpen?.open}
      centered
      onOk={() => {
        setDataChapter((prev) => {
          return prev.map((chapter) => {
            return chapter?.index === isOpen?.indexChapter
              ? { ...chapter, videos: dataVideo }
              : chapter;
          });
        });
        setIsOpenModalVideo({
          open: false,
          quantityVideo: 1,
        });
      }}
      okText={"Hoàn tất"}
      cancelText={"Đóng"}
      onCancel={() => {
        setIsOpenModalVideo({
          open: false,
          quantityVideo: 1,
        });
      }}
      onClose={() => {
        setIsOpenModalVideo({
          open: false,
          quantityVideo: 1,
        });
      }}
    >
      {[...Array(Number(isOpen?.quantityVideo || 1))].map((_, index) => (
        <div className="container__modal_video__item" key={index}>
          <h2 className="container__modal_video__item__stt">
            Video {index + 1}
          </h2>
          <div className="container__modal_video__item__urlvideo">
            <label htmlFor="urlVideo">
              Đường dẫn của video
              <span className="obligatory">*</span>
            </label>
            <Input
              name="urlVideo"
              onChange={(event) => handleOnchangeVideo(event, index)}
              placeholder="Nhập vào đường dẫn của video"
              value={dataVideo[index]?.urlVideo || ""} // Lấy giá trị từ state
            />
            <Checkbox
              name="preOder"
              onChange={(event) => handleOnchangeVideo(event, index)}
              checked={dataVideo[index]?.preOder || false}
            >
              Pre order?
            </Checkbox>
          </div>
          <div className="container__modal_video__item__desc">
            <label htmlFor="docMore">Đường dẫn tài liệu </label>
            <Input
              name="docMore"
              onChange={(event) => handleOnchangeVideo(event, index)}
              placeholder="Nhập vào đường dẫn của video"
              defaultValue={""}
              value={dataVideo[index]?.docMore || ""}
            />
          </div>
          <div className="container__modal_video__item__order">
            <label htmlFor="order">Vị trí hiển thị</label>
            <Input
              name="order"
              onChange={(event) => handleOnchangeVideo(event, index)}
              placeholder="Nhập vào vị trí hiển thị, có thể bỏ qua"
              value={dataVideo[index]?.order || ""}
            />
          </div>
          <div className="container__modal_video__item__desc_detail">
            <label htmlFor="docMore">Mô tả </label>
            <ReactQuill
              theme="snow"
              onChange={(text) => {
                handleOnchangeVideo(
                  { target: { name: "descHtml", value: text } },
                  index
                );
              }}
              defaultValue={""}
              modules={modules}
              formats={formats}
              value={dataVideo[index]?.descHtml || ""}
              className="manage-course__item__editor"
            />
          </div>
        </div>
      ))}
    </Modal>
  );
}
export default ModalVideos;
