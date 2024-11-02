import React, { useEffect, useRef, useState } from 'react'
import "./ModelAuth.scss"
import { Button, Col, Layout, Modal, Row } from "antd"
import OptionAuth from '../OptionAuth'
import { LeftOutlined } from "@ant-design/icons"
function ModelAuth({ open, setOpen, text, handleLogin, handleRegister, setTextModel }) {
    const [isHideOption, setIsHideOption] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [isShowBackToDefault, setShowBackToDefault] = useState(false)
    const [textForgotPassword, setTextForgotPassword] = useState(null)

    const handleWithAccountUserName = () => {
        setIsHideOption(true)
        if (text.subTitle == "Đăng nhập") {
            setIsLogin(true)
            setIsRegister(false)
            setShowBackToDefault(true)
        } else {
            setIsLogin(false)
            setIsRegister(true)
            setShowBackToDefault(true)
        }

    }

    const handleLoginAndRegister = () => {
        setTextForgotPassword(null)
        text.subTitle == "Đăng ký" ? handleLogin() : handleRegister()
        if (text.subTitle == "Đăng ký") {
            setIsHideOption(false)
            setIsLogin(false)
            setIsRegister(false)
            setIsForgotPassword(false)
            setShowBackToDefault(false)
        } else {
            setIsHideOption(false)
            setIsLogin(false)
            setIsRegister(false)
            setIsForgotPassword(false)
            setShowBackToDefault(false)
        }

    }


    const handleForgotPassword = () => {
        setIsHideOption(true)
        setIsLogin(false)
        setIsRegister(false)
        setIsForgotPassword(true)
        setShowBackToDefault(true)
        setTextForgotPassword({
            title: "Quên mật khẩu tại CODE ZEN",
            subTitle: "Quên mật khẩu",
            footer_desc: "Bạn chưa có tài khoản?"
        })
    }

    const handleBackToDefault = () => {
        setTextForgotPassword(null)
        setIsLogin(false)
        setIsRegister(false)
        setIsForgotPassword(false)
        setIsHideOption(false)
        setShowBackToDefault(false)
        setTextModel({ ...text })
    }

    return (
        <>
            <Modal
                open={open}
                onCancel={() => setOpen(() => {
                    setIsHideOption(false)
                    setIsLogin(false)
                    setIsRegister(false)
                    setIsForgotPassword(false)
                    setTextForgotPassword(null)
                    setShowBackToDefault(false)
                    return false;
                })}
                centered
                footer={""}
                width={540}
            >
                <div className='container-model'>
                    <div onClick={handleBackToDefault} className={`container-model__back-to-default ${isShowBackToDefault && "container-model__back-to-default--active"}`}>
                        <LeftOutlined />
                        <span>Quay lại</span>
                    </div>
                    <main className='container-content'>
                        <figure className='container-content__logo'>
                            <img src="https://i.ibb.co/WGwmWhQ/DALL-E-2024-10-24-18-11-13-A-logo-of-a-circular-shape-resembling-a-stylized-C-in-harmonious-gradient.webp" alt="logo" />
                        </figure>
                        <h1 className='container-content__title' >{textForgotPassword == null ? text.title : textForgotPassword.title}</h1>
                        <div className={`container-content__option ${isHideOption && 'hide'}`}>
                            <Button style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <img src="data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20transform=''%3e%3cg%20fill-rule='evenodd'%3e%3cpath%20d='m17.64%209.2a10.341%2010.341%200%200%200%20-.164-1.841h-8.476v3.481h4.844a4.14%204.14%200%200%201%20-1.8%202.716v2.264h2.909a8.777%208.777%200%200%200%202.687-6.62z'%20fill='%234285f4'/%3e%3cpath%20d='m9%2018a8.592%208.592%200%200%200%205.956-2.18l-2.909-2.258a5.43%205.43%200%200%201%20-8.083-2.852h-3.007v2.332a9%209%200%200%200%208.043%204.958z'%20fill='%2334a853'/%3e%3cpath%20d='m3.964%2010.71a5.321%205.321%200%200%201%200-3.42v-2.332h-3.007a9.011%209.011%200%200%200%200%208.084z'%20fill='%23fbbc05'/%3e%3cpath%20d='m9%203.58a4.862%204.862%200%200%201%203.44%201.346l2.581-2.581a8.649%208.649%200%200%200%20-6.021-2.345%209%209%200%200%200%20-8.043%204.958l3.007%202.332a5.364%205.364%200%200%201%205.036-3.71z'%20fill='%23ea4335'/%3e%3c/g%3e%3cpath%20d='m0%200h18v18h-18z'%20fill='none'/%3e%3c/g%3e%3c/svg%3e" alt="Google" />
                                <span>{text.subTitle} với Google</span>
                            </Button>
                            <Button style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }} >
                                <img src="data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m17.007%200h-16.014a.993.993%200%200%200%20-.993.993v16.014a.993.993%200%200%200%20.993.993h8.628v-6.961h-2.343v-2.725h2.343v-2a3.274%203.274%200%200%201%203.494-3.591%2019.925%2019.925%200%200%201%202.092.106v2.43h-1.428c-1.13%200-1.35.534-1.35%201.322v1.73h2.7l-.351%202.725h-2.364v6.964h4.593a.993.993%200%200%200%20.993-.993v-16.014a.993.993%200%200%200%20-.993-.993z'%20fill='%234267b2'%20/%3e%3cpath%20d='m28.586%2024.041v-6.961h2.349l.351-2.725h-2.7v-1.734c0-.788.22-1.322%201.35-1.322h1.443v-2.434a19.924%2019.924%200%200%200%20-2.095-.106%203.27%203.27%200%200%200%20-3.491%203.591v2h-2.343v2.73h2.343v6.961z'%20fill='%23fff'%20transform='translate(-16.172%20-6.041)'%20/%3e%3c/svg%3e" alt="Facebook" />
                                <span>{text.subTitle} với Facebook</span>
                            </Button>
                            <Button >
                                <img src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10%200C4.476%200%200%204.477%200%2010c0%204.418%202.865%208.166%206.84%209.49.5.09.68-.218.68-.483%200-.237-.007-.866-.012-1.7-2.782.603-3.37-1.34-3.37-1.34-.454-1.157-1.11-1.464-1.11-1.464-.907-.62.07-.608.07-.608%201.003.07%201.53%201.03%201.53%201.03.893%201.53%202.342%201.087%202.912.83.09-.645.35-1.085.634-1.335-2.22-.253-4.555-1.11-4.555-4.943%200-1.09.39-1.984%201.03-2.683-.105-.253-.448-1.27.096-2.647%200%200%20.84-.268%202.75%201.026A9.555%209.555%200%200110%204.836a9.59%209.59%200%20012.504.337c1.91-1.294%202.747-1.026%202.747-1.026.548%201.377.204%202.394.1%202.647.64.7%201.03%201.592%201.03%202.683%200%203.842-2.34%204.687-4.566%204.935.36.308.678.92.678%201.852%200%201.336-.01%202.415-.01%202.743%200%20.267.18.578.687.48A10%2010%200%200020%2010c0-5.522-4.478-10-10-10'%20fill='%23191717'%20fill-rule='evenodd'%3e%3c/path%3e%3c/svg%3e" alt="Github" />
                                <span>{text.subTitle} với Github</span>
                            </Button>
                            <Button onClick={handleWithAccountUserName} >
                                <img src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10%2011c-2.67%200-8%201.34-8%204v3h16v-3c0-2.66-5.33-4-8-4m0-9C7.79%202%206%203.79%206%206s1.79%204%204%204%204-1.79%204-4-1.79-4-4-4m0%2010.9c2.97%200%206.1%201.46%206.1%202.1v1.1H3.9V15c0-.64%203.13-2.1%206.1-2.1m0-9a2.1%202.1%200%20110%204.2%202.1%202.1%200%20010-4.2'%20fill-opacity='.54'%20fill-rule='evenodd'%3e%3c/path%3e%3c/svg%3e" alt="user/phone" />
                                <span>{text.subTitle} tên tài khoản</span>
                            </Button>
                        </div>
                        <OptionAuth login={isLogin} setOpen={setOpen} register={isRegister} forgotPassword={isForgotPassword} text={text} textForgotPassword={textForgotPassword} handleBackToDefault={handleBackToDefault} />
                    </main>
                    <footer className='container-model__footer'>
                        <p>{text.footer_desc}<Button type='link' className='container-model__footer--btn' onClick={handleLoginAndRegister}>{text.subTitle == "Đăng ký" ? "Đăng nhập" : "Đăng ký"}</Button></p>
                        {textForgotPassword == null ? <p>Bạn không nhớ mật khẩu?<Button type='link' className='container-model__footer--btn' onClick={handleForgotPassword}>Quên mật khẩu?</Button></p> : ""}
                        <p className='container-model__footer--service'>Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với điều khoản sử dụng của chúng tôi.</p>
                    </footer>
                </div>
            </Modal>
        </>
    )
}

export default ModelAuth;