import React, { useRef, useState } from "react";
import StatisticView from "../share/StatisticView";
import ModalVideos from "../ModalVideos";
import "./ManageCourse.scss";
import { Input, Select, Button } from "antd";
const { TextArea } = Input;
import TextEditor from "../share/TextEditor";
function ManageCourse() {
  const [data, setData] = useState({
    id: null,
    name: "",
    image: "",
    coverPhoto: "",
    price: null,
    prevPrice: null,
    description: "",
    level: "",
    author: "",
    author_img: "",
    icon: "",
    slug: "",
    descHtml: "",
    courseTypeID: null,
    mapID: null,
    chapterList: [],
  });

  const [dataChapter, setDataChapter] = useState([]);

  const [isOpenModalVideo, setIsOpenModalVideo] = useState({
    open: false,
    quantityVideo: 1,
  });
  const [isShowChapter, setIsShowChapter] = useState(false);
  const refQuantityChapter = useRef();
  const handleAddChapter = () => {
    setIsShowChapter(!isShowChapter);
  };

  const handleONchangeInput = (value, option) => {
    if (option) {
      const name = option.name || option.props.name;
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const { name, value: valueData } = value?.target;
      setData((prev) => ({
        ...prev,
        [name]: valueData,
      }));
    }
  };

  const handleOnChangeChapter = (event, index) => {
    const { name, value } = event.target;

    setDataChapter((prev) => {
      // Kiểm tra xem item đã tồn tại trong mảng chưa
      const isExits = prev.some((item) => item.index === index);

      if (isExits) {
        // Cập nhật giá trị của item có index tương ứng
        return prev.map((item) =>
          item.index === index ? { ...item, [name]: value } : item
        );
      } else {
        // Nếu chưa tồn tại, thêm mới phần tử vào mảng
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

  const handleShowModalVideos = (event) => {
    const father = event.target.parentNode.parentNode;
    setIsOpenModalVideo({
      open: true,
      quantityVideo:
        father?.querySelector(".manage-course__chapter_item__videos__quantity")
          ?.value || 1,
    });
  };
  console.log(dataChapter);

  return (
    <>
      <div className="manage-course">
        <h1 className="manage-course__title">Quản lý khóa học</h1>
        <StatisticView
          data={[
            {
              title: "Tổng số người dùng trong hệ thống",
              value: 0,
            },
            {
              title: "Số người dùng đã đăng ký khóa học",
              value: 0,
            },
            {
              title: "Số tài khoản chưa đăng ký khóa học",
              value: 0,
            },
            {
              title: "Số tài khoản bị vô hiệu hóa",
              value: 0,
            },
          ]}
        />
        <div className="manage-course__content">
          <div className="manage-course__item">
            <label htmlFor="name">Tên tên khóa học</label>
            <Input
              onChange={handleONchangeInput}
              value={data.name}
              name="name"
              showCount
              minLength={4}
              maxLength={50}
            />
          </div>
          <div className="manage-course__item">
            <label htmlFor="image">Ảnh khóa học</label>
            <Input
              onChange={handleONchangeInput}
              name="image"
              value={data.image}
            />
            <img src="" className="preview_avatar" alt="preview_avatar" />
          </div>
          <div className="manage-course__item">
            <label htmlFor="coverPhoto">Ảnh bìa</label>
            <Input
              onChange={handleONchangeInput}
              name="coverPhoto"
              value={data.coverPhoto}
            />
            <img src="" className="preview_avatar" alt="preview_avatar" />
          </div>
          <div className="manage-course__item">
            <label htmlFor="price">Giá bán</label>
            <Input
              onChange={handleONchangeInput}
              value={data.price}
              name="price"
              showCount
              minLength={4}
              maxLength={50}
            />
          </div>
          <div className="manage-course__item">
            <label htmlFor="prevPrice">Giá gốc</label>
            <Input
              onChange={handleONchangeInput}
              name="prevPrice"
              value={data.prevPrice}
              showCount
              minLength={4}
              maxLength={50}
            />
          </div>

          <div className="manage-course__item">
            <label htmlFor="slug">Slug</label>
            <Input
              onChange={handleONchangeInput}
              name="slug"
              value={data.slug}
              showCount
              minLength={4}
              maxLength={50}
            />
          </div>

          <div className="manage-course__item">
            <label htmlFor="author">Tác giả</label>
            <Input
              onChange={handleONchangeInput}
              value={data.author}
              name="author"
            />
            <img src="" className="preview_avatar" alt="preview_avatar" />
          </div>
          <div className="manage-course__item">
            <label htmlFor="author_img">Ảnh đại diện</label>
            <Input
              onChange={handleONchangeInput}
              name="author_img"
              value={data.author_img}
            />
            <img src="" className="preview_avatar" alt="preview_avatar" />
          </div>
          <div className="manage-course__item">
            <label htmlFor="courseTypeID">Loại khóa học</label>
            <Select
              defaultValue={0}
              name={"courseTypeID"}
              onChange={(value) =>
                handleONchangeInput(value, { name: "courseTypeID" })
              }
              value={data.courseTypeID}
              style={{
                width: 120,
              }}
              options={[
                {
                  value: 0,
                  label: "Khóa học miễn phí",
                },
                {
                  value: 1,
                  label: "Khóa học trả phí",
                },
              ]}
            />
          </div>
          <div className="manage-course__item">
            <label htmlFor="role">Trình độ</label>
            <Select
              defaultValue={"Cơ bản"}
              name={"level"}
              onChange={(value) =>
                handleONchangeInput(value, { name: "level" })
              }
              value={data.level}
              style={{
                width: 120,
              }}
              options={[
                {
                  value: 0,
                  label: "Cơ bản",
                },
                {
                  value: 1,
                  label: "Trung cấp",
                },
                {
                  value: 2,
                  label: "Nâng cao",
                },
              ]}
            />
          </div>
          <div className="manage-course__item">
            <label htmlFor="mapID">Lộ trình học</label>
            <Select
              name={"mapID"}
              defaultValue={0}
              style={{
                width: 120,
              }}
              onChange={(value) =>
                handleONchangeInput(value, { name: "mapID" })
              }
              value={data.mapID}
              options={[
                {
                  value: 0,
                  label: "Lộ trình học Front-end",
                },
                {
                  value: 1,
                  label: "Lộ trình học Back-end",
                },
              ]}
            />
          </div>
        </div>
        <div className="editor-course-desc-detail">
          <label>Mô tả chi tiết</label>
          <TextEditor value={data} setValue={setData} />
        </div>
        <div className="manage-course__chapter">
          <label className="manage-course__chapter__title">Số chương học</label>
          <Input
            min={1}
            ref={refQuantityChapter}
            defaultValue={1}
            placeholder="Nhập vào số lượng chương học, lưu ý số chương phải lớn hơn 1"
          />

          <Button onClick={handleAddChapter}>Tiến hành thêm chương học</Button>
        </div>
        {isShowChapter &&
          [...Array(Number(refQuantityChapter.current?.input?.value))].map(
            (_, index) => {
              return (
                <div className="manage-course__chapter_container" key={index}>
                  <div className="manage-course__chapter_item">
                    <label htmlFor="title">Tiêu đề chương học</label>
                    <Input
                      name="title"
                      onChange={(event) => handleOnChangeChapter(event, index)}
                      defaultValue={`Chương ${index + 1}: `}
                    />
                  </div>
                  <div className="manage-course__chapter_item">
                    <label htmlFor="order">Vị trí chương học</label>
                    <Input
                      onChange={(event) => handleOnChangeChapter(event, index)}
                      name="order"
                    />
                  </div>
                  <div className="manage-course__chapter_item">
                    <label htmlFor="description">Mô tả chương học</label>
                    <TextArea
                      onChange={(event) => handleOnChangeChapter(event, index)}
                      name="description"
                      showCount
                      maxLength={255}
                      autoSize={{
                        minRows: 4,
                        maxRows: 6,
                      }}
                    />
                  </div>
                  <div className="manage-course__chapter_item__videos">
                    <label htmlFor="title">Nhập vào số lượng video</label>
                    <Input
                      name="title"
                      className="manage-course__chapter_item__videos__quantity"
                      placeholder="Nhập vào số lượng video, sẽ có trong chương"
                    />
                    <Button
                      onClick={handleShowModalVideos}
                      className="manage-course__chapter_item__addvideo"
                    >
                      Tiến hành thêm video
                    </Button>
                  </div>
                </div>
              );
            }
          )}
      </div>
      <ModalVideos
        isOpen={isOpenModalVideo}
        setIsOpenModalVideo={setIsOpenModalVideo}
      />
    </>
  );
}

export default ManageCourse;
