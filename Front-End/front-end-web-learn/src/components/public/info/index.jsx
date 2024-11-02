import React from 'react'
import "./Info.scss"

import { RightOutlined } from "@ant-design/icons"
function Info() {
    return (
        <div className='container-setting-info'>
            <h1>Thông tin cá nhân</h1>
            <p className='p-h1'>Quản lý thông tin cá nhân của bạn</p>

            <h2>Thông tin cơ bản</h2>
            <p className='p-h2'>Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.</p>
            <div className="container-setting-info--section">
                <div className="container-setting-info--section__content">
                    <h4>Họ và tên</h4>
                    <span>Nguyễn Xuân Mạnh</span>
                </div>
                <RightOutlined className='container-setting-info--section__content--item' />
            </div>
            <div className="container-setting-info--section">
                <div className="container-setting-info--section__content">
                    <h4>Tên người dùng</h4>
                    <span>manhnguyen36</span>
                </div>
                <RightOutlined className='container-setting-info--section__content--item' />
            </div>
            <div className="container-setting-info--section">
                <div className="container-setting-info--section__content">
                    <h4>Giới thiệu</h4>
                    <span>Chưa cập nhật</span>
                </div>
                <RightOutlined className='container-setting-info--section__content--item' />
            </div>
            <div className="container-setting-info--section">
                <div className="container-setting-info--section__content">
                    <h4>Ảnh đại diện</h4>
                    <img src="https://files.fullstack.edu.vn/f8-prod/public-images/671cf6b5a9133.png" alt="avatar" />
                </div>
                <RightOutlined className='container-setting-info--section__content--item' />
            </div>
            <div className="container-setting-info--section">
                <div className="container-setting-info--section__content">
                    <h4>Ảnh bìa</h4>
                    <span>Chưa cập nhật</span>
                </div>
                <RightOutlined className='container-setting-info--section__content--item' />
            </div>

            <h2>Thông tin mạng xã hội</h2>
            <p className='p-h2'>Quản lý liên kết tới các trang mạng xã hội của bạn.</p>
            <div className="container-setting-info--section">
                <div className="container-setting-info--section__content">
                    <h4>Trang web cá nhân</h4>
                    <span>Chưa cập nhật</span>
                </div>
                <RightOutlined className='container-setting-info--section__content--item' />
            </div>
            <div className="container-setting-info--section">
                <div className="container-setting-info--section__content">
                    <h4>Github</h4>
                    <span>Chưa cập nhật</span>
                </div>
                <RightOutlined className='container-setting-info--section__content--item' />
            </div>
            <div className="container-setting-info--section">
                <div className="container-setting-info--section__content">
                    <h4>LinkedIn</h4>
                    <span>Chưa cập nhật</span>
                </div>
                <RightOutlined className='container-setting-info--section__content--item' />
            </div>
            <div className="container-setting-info--section">
                <div className="container-setting-info--section__content">
                    <h4>Facebook</h4>
                    <span>Chưa cập nhật</span>
                </div>
                <RightOutlined className='container-setting-info--section__content--item' />
            </div>
            <div className="container-setting-info--section">
                <div className="container-setting-info--section__content">
                    <h4>Youtube</h4>
                    <span>Chưa cập nhật</span>
                </div>
                <RightOutlined className='container-setting-info--section__content--item' />
            </div>
            <div className="container-setting-info--section">
                <div className="container-setting-info--section__content">
                    <h4>TikTok</h4>
                    <span>Chưa cập nhật</span>
                </div>
                <RightOutlined className='container-setting-info--section__content--item' />
            </div>
        </div>
    )
}


export default Info;