import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";
function Component500() {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Đã xảy ra lỗi hệ thống, vui lòng vui lòng thử lại sau"
      extra={<Link to={"/"}>Trở về trang chủ</Link>}
    />
  );
}

export default Component500;
