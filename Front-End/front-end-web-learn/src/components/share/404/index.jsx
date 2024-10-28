import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
export default function Component404() {
    return <Result
        status="404"
        title="404"
        subTitle="Rất tiếc, trang bạn đã truy cập không tồn tại.."
        extra={<Link to={"/"} >Trở về trang chủ</Link>}
    />
}
