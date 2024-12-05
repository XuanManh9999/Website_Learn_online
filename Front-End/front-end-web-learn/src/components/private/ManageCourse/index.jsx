import React, { useEffect, useRef, useState } from "react";
import StatisticView from "../share/StatisticView";
import ModalVideos from "../ModalVideos";
import { Input, Select, Button, Table, Space, Tag, Modal } from "antd";
import {
  apiGetDataCourseType,
  apiGetMapData,
  apiCreateCourse,
  apiGetAllCourse,
  deleteCourseById,
} from "../../../services/private/course";
const { TextArea } = Input;
import TextEditor from "../share/TextEditor";
import "./ManageCourse.scss";
import useNotify from "../../share/Notification";

function validateCourse(course) {
  const errors = {};

  // Kiểm tra các trường chính của course
  const requiredFields = [
    "name",
    "image",
    "coverPhoto",
    "price",
    "prevPrice",
    "description",
    "level",
    "author",
    "author_img",
    "slug",
    "courseTypeID",
    "mapID",
  ];

  requiredFields.forEach((field) => {
    if (!course[field]) {
      errors[field] = `${field} is required`;
    }
  });

  if (Array.isArray(course.chapterList) && course.chapterList.length > 0) {
    course.chapterList.forEach((chapter, chapterIndex) => {
      if (!chapter.description) {
        errors[`chapterList[${chapterIndex}].description`] = `Chapter ${
          chapterIndex + 1
        }: description is required`;
      }
      if (Array.isArray(chapter.videos) && chapter.videos.length > 0) {
        chapter.videos.forEach((video, videoIndex) => {
          if (!video.urlVideo) {
            errors[
              `chapterList[${chapterIndex}].videos[${videoIndex}].urlVideo`
            ] = `Chapter ${chapterIndex + 1}, Video ${
              videoIndex + 1
            }: urlVideo is required`;
          }
        });
      } else {
        errors[`chapterList[${chapterIndex}].videos`] = `Chapter ${
          chapterIndex + 1
        }: videos should be an array`;
      }
    });
  } else {
    errors.chapterList = `chapterList should be an array`;
  }

  return errors;
}

function ManageCourse() {
  const [responseCourses, setResponseCourses] = useState({});
  const [isLoadingCreateCourse, setIsLoadingCourse] = useState(false);

  const [isShowWarnModal, setIsShowWarnModal] = useState(false);

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
    order_number: null,
    mapID: null,
    chapterList: [],
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2,
    total: 0, // Tổng số bản ghi
  });
  const [errors, setErrors] = useState({});
  const [dataCourseType, setDataCourseType] = useState([]);
  const [dataMap, setDataMap] = useState([]);
  const refAddChapter = useRef();
  const [dataChapter, setDataChapter] = useState([]);
  const [isOpenModalVideo, setIsOpenModalVideo] = useState({
    open: false,
    quantityVideo: 1,
  });
  const [currIdCourse, setCurrIdCourse] = useState();
  const [isShowChapter, setIsShowChapter] = useState(false);
  const [isRenderData, setIsRenderData] = useState(false);
  const refQuantityChapter = useRef();

  const { contextHolder, notify } = useNotify();

  const fetchingDataCourseType = async () => {
    const response = await apiGetDataCourseType();
    setDataCourseType(response?.result || []);
  };

  const fetchingDataMap = async () => {
    const response = await apiGetMapData();
    setDataMap(response?.result || []);
  };

  const fetchingDataResponseCourses = async (page, limit) => {
    const response = await apiGetAllCourse(page, limit);
    setResponseCourses(response?.result);

    setPagination({
      ...pagination,
      current: page,
      pageSize: limit,
      total: response?.result?.total, // Tổng số bản ghi
    });
  };

  useEffect(() => {
    const validationErrors = validateCourse(data);
    setErrors(validationErrors);

    fetchingDataCourseType();
    fetchingDataMap();
  }, []);

  useEffect(() => {
    fetchingDataResponseCourses(pagination.current, pagination.pageSize);
  }, [isRenderData]);

  const handleAddChapter = () => {
    if (isShowChapter) {
      refAddChapter.current.textContent = "Tiến hành thêm chương học";
      setDataChapter([]);
    } else {
      refAddChapter.current.textContent = "Hủy quá trình thêm chương học";
    }

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
    const validationErrors = validateCourse(data);
    setErrors(validationErrors);
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

  const handleShowModalVideos = (event, index) => {
    const father = event.target.parentNode.parentNode;
    setIsOpenModalVideo({
      open: true,
      quantityVideo:
        father?.querySelector(".manage-course__chapter_item__videos__quantity")
          ?.value || 1,
      indexChapter: index,
    });
  };

  const handleMargeToCourse = () => {
    setData((prev) => ({
      ...prev,
      chapterList: dataChapter,
    }));
    const validationErrors = validateCourse({
      ...data,
      chapterList: dataChapter,
    });
    setErrors(validationErrors);
    setIsShowChapter(false);
    refAddChapter.current.textContent = "Tiến hành thêm chương học";
  };

  const handleAddCourse = async () => {
    const validationErrors = validateCourse(data);
    setErrors(validationErrors);
    // Trả về true nếu không có lỗi
    const isCreateCourse = Object.keys(errors).length === 0;
    if (isCreateCourse) {
      const { status, message } = await apiCreateCourse(data);
      setIsLoadingCourse(true);
      if (status === 200) {
        setTimeout(() => {
          notify("success", "Thêm khóa học mới thành công");
          setIsLoadingCourse(false);
          setData({
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
            order_number: null,
            mapID: null,
            chapterList: [],
          });
        }, 1000);
      } else {
        setTimeout(() => {
          notify("error", message);
          setIsLoadingCourse(false);
        }, 1000);
      }
    } else {
      const errorMessage = Object.values(errors);
      if (errorMessage.length > 0) {
        notify("warning", errorMessage[0]);
      }
    }
  };

  const handleAddToDefault = () => {
    setData((prev) => ({
      ...prev,
      chapterList: [],
    }));
    const validationErrors = validateCourse({
      ...data,
      chapterList: [],
    });
    setErrors(validationErrors);
    notify("success", "Rest dữ liệu thành công");
  };
  const handleTableChange = (pagination) => {
    fetchingDataResponseCourses(pagination.current, pagination.pageSize);
  };

  const handleCloseModalWarn = () => {
    setIsShowWarnModal(false);
  };

  const handleDisabledCourse = (idCourse) => {
    setIsShowWarnModal(true);
    setCurrIdCourse(idCourse);
  };

  const handleSubmidDisabledModalWarn = async () => {
    if (currIdCourse) {
      const { status, message } = await deleteCourseById(currIdCourse);
      setIsLoadingDisabledCourse(true);
      if (status == 200) {
        notify("success", message);
      } else {
        notify("error", message);
      }
      setTimeout(() => {
        setIsShowWarnModal(false);
        setIsRenderData(!isRenderData);
      }, 1000);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="manage-course">
        <h1 className="manage-course__title">Quản lý khóa học</h1>
        <StatisticView
          data={[
            {
              title: "Tổng số khóa học trong hệ thống",
              value: responseCourses?.courses?.length ?? 0,
            },
            {
              title: "Tổng số khóa học miễn phí",
              value: responseCourses?.totalCourseFree ?? 0,
            },
            {
              title: "Tổng số khóa học trả phí",
              value: responseCourses?.totalCourseAvailable ?? 0,
            },
            {
              title: "Số khóa học bị vô hiệu hóa",
              value: responseCourses?.totalCourseNonActive ?? 0,
            },
          ]}
        />
        <div className="manage-course__content">
          <div className="manage-course__item">
            <label htmlFor="name">
              Tên tên khóa học
              <span>*</span>
            </label>
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
            <label htmlFor="image">
              Ảnh khóa học
              <span>*</span>
            </label>
            <Input
              onChange={handleONchangeInput}
              name="image"
              value={data.image}
            />
            <img src="" className="preview_avatar" alt="preview_avatar" />
          </div>
          <div className="manage-course__item">
            <label htmlFor="coverPhoto">
              Ảnh bìa
              <span>*</span>
            </label>
            <Input
              onChange={handleONchangeInput}
              name="coverPhoto"
              value={data.coverPhoto}
            />
            <img src="" className="preview_avatar" alt="preview_avatar" />
          </div>
          <div className="manage-course__item">
            <label htmlFor="price">
              Giá bán
              <span>*</span>
            </label>
            <Input
              type="Number"
              onChange={handleONchangeInput}
              value={data.price}
              name="price"
              showCount
              minLength={4}
              maxLength={10}
            />
          </div>
          <div className="manage-course__item">
            <label htmlFor="prevPrice">
              Giá gốc
              <span>*</span>
            </label>
            <Input
              type="Number"
              onChange={handleONchangeInput}
              name="prevPrice"
              value={data.prevPrice}
              showCount
              minLength={4}
              maxLength={10}
            />
          </div>

          <div className="manage-course__item">
            <label htmlFor="slug">
              Slug
              <span>*</span>
            </label>
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
            <label htmlFor="author">
              Tác giả
              <span>*</span>
            </label>
            <Input
              onChange={handleONchangeInput}
              value={data.author}
              name="author"
              count={50}
              minLength={4}
              maxLength={50}
            />
            <img src="" className="preview_avatar" alt="preview_avatar" />
          </div>
          <div className="manage-course__item">
            <label htmlFor="author_img">
              Ảnh đại diện
              <span>*</span>
            </label>
            <Input
              onChange={handleONchangeInput}
              name="author_img"
              value={data.author_img}
            />
            <img src="" className="preview_avatar" alt="preview_avatar" />
          </div>
          <div className="manage-course__item">
            <label htmlFor="courseTypeID">
              Loại khóa học
              <span>*</span>
            </label>
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
              options={(dataCourseType || []).map((courseType) => ({
                value: courseType.id,
                label: courseType.nameType,
              }))}
            />
          </div>
          <div className="manage-course__item">
            <label htmlFor="role">
              Trình độ
              <span>*</span>
            </label>
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
                  value: "Cơ bản",
                  label: "Cơ bản",
                },
                {
                  value: "Trung cấp",
                  label: "Trung cấp",
                },
                {
                  value: "Nâng cao",
                  label: "Nâng cao",
                },
              ]}
            />
          </div>
          <div className="manage-course__item">
            <label htmlFor="mapID">
              Lộ trình học
              <span>*</span>
            </label>
            <Select
              name={"mapID"}
              style={{
                width: 120,
              }}
              onChange={(value) =>
                handleONchangeInput(value, { name: "mapID" })
              }
              value={data.mapID}
              options={(dataMap || []).map((map) => ({
                value: map.id,
                label: map.name,
              }))}
            />
          </div>
          <div className="manage-course__item">
            <label htmlFor="author_img">Vị trí hiển thị</label>
            <Input
              onChange={handleONchangeInput}
              name="order_number"
              value={data.order_number}
              type="Number"
            />
          </div>
          <div className="manage-course__item">
            <label htmlFor="author_img">
              Mô tả
              <span>*</span>
            </label>
            <Input.TextArea
              onChange={handleONchangeInput}
              name="description"
              value={data.description}
              showCount
              maxLength={255}
              autoSize={{
                minRows: 4,
                maxRows: 6,
              }}
            />
          </div>
        </div>
        <div className="editor-course-desc-detail">
          <label>
            Mô tả chi tiết
            <span>*</span>
          </label>
          <TextEditor value={data} setValue={setData} />
        </div>
        <div className="manage-course__chapter">
          <label className="manage-course__chapter__title">Số chương học</label>
          <Input
            min={1}
            type="Number"
            ref={refQuantityChapter}
            defaultValue={1}
            placeholder="Nhập vào số lượng chương học, lưu ý số chương phải lớn hơn 1"
          />

          <Button type="primary" onClick={handleAddChapter} ref={refAddChapter}>
            Tiến hành thêm chương học
          </Button>
          <Button type="primary" onClick={handleAddToDefault}>
            Đặt về mặc định
          </Button>
        </div>
        {isShowChapter &&
          [...Array(Number(refQuantityChapter.current?.input?.value))].map(
            (_, index) => {
              return (
                <div className="manage-course__chapter_container" key={index}>
                  <div className="manage-course__chapter_item">
                    <label htmlFor="title">
                      Tiêu đề chương học
                      <span>*</span>
                    </label>
                    <Input
                      name="title"
                      onChange={(event) => handleOnChangeChapter(event, index)}
                      defaultValue={`Chương ${index + 1}: `}
                    />
                  </div>
                  <div className="manage-course__chapter_item">
                    <label htmlFor="order">Vị trí chương học</label>
                    <Input
                      type="Number"
                      onChange={(event) => handleOnChangeChapter(event, index)}
                      name="order"
                    />
                  </div>
                  <div className="manage-course__chapter_item">
                    <label htmlFor="description">
                      Mô tả chương học
                      <span>*</span>
                    </label>
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
                      defaultValue={1}
                      min={1}
                      type="Number"
                      name="title"
                      className="manage-course__chapter_item__videos__quantity"
                      placeholder="Nhập vào số lượng video, sẽ có trong chương"
                    />
                    <Button
                      onClick={(event) => handleShowModalVideos(event, index)}
                      className="manage-course__chapter_item__addvideo"
                    >
                      Tiến hành thêm video
                    </Button>
                  </div>
                </div>
              );
            }
          )}
        {isShowChapter && (
          <div className="manage-course__chapter__save">
            <Button type="primary" onClick={handleMargeToCourse}>
              Hoàn tất
            </Button>
          </div>
        )}
        <div className="manage-course__actions">
          {!isShowChapter && (
            <div className="manage-course__actions__add-course">
              <Button
                type="primary"
                onClick={handleAddCourse}
                loading={isLoadingCreateCourse}
              >
                Thêm khóa học
              </Button>
            </div>
          )}

          <div className="manage-course__actions__search">
            <Input placeholder="Nhập vào tên của khóa học..." />
            <Button type="primary">Tìm kiếm khóa học</Button>
          </div>
        </div>

        <div className="manage-course__list-course">
          <h3 className="manage-course__list-course__title">
            Danh sách khóa học
            <Table
              className="manage-course__list-course__table"
              bordered
              scroll={{
                x: 100,
              }}
              dataSource={responseCourses.courses || []}
              columns={[
                {
                  title: "ID",
                  dataIndex: "id",
                  width: 150,
                },
                {
                  title: "Tên khóa học",
                  dataIndex: "name",
                  minWidth: 200,
                },
                {
                  title: "Ảnh khóa học",
                  dataIndex: "image",
                  minWidth: 200,
                  render: (_, object) => {
                    return (
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                        src={object?.image}
                        alt={object?.name}
                      />
                    );
                  },
                },

                {
                  title: "Ảnh bìa",
                  dataIndex: "coverPhoto",
                  width: 200,
                  render: (_, object) => {
                    return <img src={object?.coverPhoto} alt={object?.name} />;
                  },
                  minWidth: 200,
                },
                {
                  title: "Giá bán",
                  dataIndex: "price",
                  minWidth: 100,
                },
                {
                  title: "Giá cũ",
                  dataIndex: "prevPrice",
                  minWidth: 100,
                },
                {
                  title: "Slug",
                  dataIndex: "slug",
                  minWidth: 200,
                },
                {
                  title: "Trạng thái khóa học",
                  dataIndex: "active",
                  width: 200,
                  render: (_, { active }) => (
                    <>
                      <Tag color={active == 1 ? "success" : "error"}>
                        {active == 1 ? "Hoạt động" : "Không hoạt động"}
                      </Tag>
                    </>
                  ),
                },
                {
                  title: "Số người học của khóa học",
                  dataIndex: "studentsCount",
                  minWidth: 200,
                },
                {
                  title: "Mô tả khóa học",
                  dataIndex: "description",
                  minWidth: 200,
                },
                {
                  title: "Hành động",
                  key: "action",
                  width: 200,
                  render: (_, record) => (
                    <>
                      <Space size="middle">
                        <Button>Chi tiết khóa học</Button>
                        <Button>Cập nhật khóa học</Button>
                        <Button onClick={() => handleDisabledCourse(record.id)}>
                          Vô hiệu hóa khóa học
                        </Button>
                      </Space>
                    </>
                  ),
                },
              ]}
              rowKey={(record) => record.id}
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
              }}
              onChange={handleTableChange}
            />
          </h3>
        </div>
      </div>
      <ModalVideos
        isOpen={isOpenModalVideo}
        setIsOpenModalVideo={setIsOpenModalVideo}
        setDataChapter={setDataChapter}
      />

      <Modal
        open={isShowWarnModal}
        onCancel={handleCloseModalWarn}
        onClose={handleCloseModalWarn}
        title={<h1>Thông báo</h1>}
        centered
        okText={"Xác nhận"}
        cancelText={"Thoát"}
        className="manage-warn"
        onOk={handleSubmidDisabledModalWarn}
      >
        <strong>
          Việc bạn vô hiệu hóa khóa học, sẽ dẫn tới việc khóa học sẽ không được
          công bố nữa, mọi người dùng sẽ không thể xem cũng như ghi danh vào
          khóa học, nếu bạn chấp nhận điều này hãy xác nhận, để hủy bỏ ấn thoát
        </strong>
      </Modal>
    </>
  );
}

export default ManageCourse;
