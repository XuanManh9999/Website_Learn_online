import React from "react";
import "./ModalVideos.scss";
import { Modal, Input, Checkbox } from "antd";
import TextEditor from "../share/TextEditor";
function ModalVideos({ isOpen, setIsOpenModalVideo }) {
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
      {[...Array(Number(isOpen?.quantityVideo || 1))].map((video, index) => (
        <div className="container__modal_video__item" key={index}>
          <h2 className="container__modal_video__item__stt">
            Video {index + 1}
          </h2>
          <div className="container__modal_video__item__urlvideo">
            <label htmlFor="urlVideo">Đường dẫn của video</label>
            <Input name="urlVideo" placeholder="Nhập vào đường dẫn của video" />
            <Checkbox>Pre order?</Checkbox>
          </div>
          <div className="container__modal_video__item__desc">
            <label htmlFor="docMore">Đường dẫn tài liệu</label>
            <Input name="docMore" placeholder="Nhập vào đường dẫn của video" />
          </div>
          <div className="container__modal_video__item__order">
            <label htmlFor="order">Vị trí hiển thị</label>
            <Input
              name="order"
              placeholder="Nhập vào vị trí hiển thị, có thể bỏ qua"
            />
          </div>
          <div className="container__modal_video__item__desc_detail">
            <label htmlFor="docMore">Mô tả</label>
            <TextEditor />
          </div>
        </div>
      ))}
    </Modal>
  );
}
export default ModalVideos;
