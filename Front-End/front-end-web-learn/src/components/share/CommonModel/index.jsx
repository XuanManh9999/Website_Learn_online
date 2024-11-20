import React, { useEffect, useState } from "react";
import { Modal, Input, Button } from "antd";
import useNotify from "../Notification";
import "./CommonModel.scss";
import { useNavigate } from "react-router-dom";

function CommonModel({
  open,
  setIsShowModel,
  data: { title, desc, field, btnSubmid, funcApi },
}) {
  const navigate = useNavigate();
  const { contextHolder, notify } = useNotify();
  const [dataModel, setDataModel] = useState({});
  useEffect(() => {
    const result = field?.reduce((acc, curr) => {
      acc[curr.name] = ""; // Giá trị mặc định là chuỗi rỗng
      return acc;
    }, {});
    setDataModel(result);
  }, []);
  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setDataModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmid = async () => {
    const keyObject = Object.keys(dataModel);
    let isSubmid = true;
    for (let i = 0; i < keyObject.length; i++) {
      if (dataModel[keyObject[i]] == "") {
        notify("warning", `${keyObject[i]} Không được để rỗng`);
        isSubmid = false;
        break;
      }
    }
    if (isSubmid) {
      const { status, message } = await funcApi(dataModel);
      if (status === 200) {
        notify("success", message);
        setTimeout(() => {
          setIsShowModel(false);
        }, 1000);
      } else if (status == 400) {
        notify("warning", message);
      } else if (status === 401) {
        notify("warning", "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        notify("error", message);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        className="modal-common"
        open={open}
        centered
        onCancel={() => {
          setIsShowModel(false);
        }}
        onClose={() => {
          setIsShowModel(false);
        }}
        footer={null}
      >
        <h2 className="modal-common__title">{title}</h2>
        <p className="modal-common__desc">{desc}</p>
        <div className="modal-common__content">
          {field &&
            field?.map((item, index) => {
              if (item?.type === "password") {
                return (
                  <div key={index} className="modal-common__item">
                    <label htmlFor={item?.name}>{item?.label}</label>
                    <Input.Password
                      onChange={handleOnchange}
                      name={item?.name}
                      placeholder={item?.placeholder}
                    />
                  </div>
                );
              } else if (item?.type === "image") {
                <div key={index} className="modal-common__item">
                <label htmlFor={item?.name}>{item?.label}</label>
                <Input
                  onChange={handleOnchange}
                  name={item?.name}
                  placeholder={item?.placeholder}
                />
              </div>
              } else {
                return (
                  <div key={index} className="modal-common__item">
                    <label htmlFor={item?.name}>{item?.label}</label>
                    <Input
                      onChange={handleOnchange}
                      name={item?.name}
                      placeholder={item?.placeholder}
                    />
                  </div>
                );
              }
            })}
        </div>
        <div className="modal-common__submid">
          <Button type="primary" onClick={handleSubmid}>
            {btnSubmid}
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default CommonModel;
