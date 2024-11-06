import TYPE_APP from "../type";
const init = {
    open: false,
    isLogin: false,
    isRegister: false,
    isForgotPassword: false,
    isFormLogin: false,
    isFormRegister: false,
    isFormForgotpassword: false,
    isBackDefault: false,
    isShowModelOTP: false,
    textModel: {
        title: "",
        subTitle: "",
        footer_desc: ""
    }
}

const showHideReducer = (state = init, action) => {
    switch (action.type) {
        case TYPE_APP.SHOW_LOGIN:
            if (state.isBackDefault) {
                return {
                    open: true,
                    isLogin: true,
                    isRegister: false,
                    isForgotPassword: false,
                    isFormLogin: false,
                    isFormRegister: false,
                    isFormForgotpassword: false,
                    isBackDefault: false,
                    textModel: {
                        title: "Đăng nhập vào CODE ZEN",
                        subTitle: "Đăng nhập",
                        footer_desc: "Bạn chưa có tài khoản?"
                    }
                }
            }
            return {
                ...state,
                isLogin: true,
                isFormLogin: false,
                open: true,
                textModel: {
                    title: "Đăng nhập vào CODE ZEN",
                    subTitle: "Đăng nhập",
                    footer_desc: "Bạn chưa có tài khoản?"
                }

            }
        case TYPE_APP.HIDE_LOGIN:
            return {
                ...state,
                open: false,
                isLogin: false,
            }
        case TYPE_APP.SHOW_REGISTER:
            if (state.isBackDefault) {
                return {
                    open: true,
                    isLogin: false,
                    isRegister: true,
                    isForgotPassword: false,
                    isFormLogin: false,
                    isFormRegister: false,
                    isFormForgotpassword: false,
                    isBackDefault: false,
                    textModel: {
                        title: "Đăng ký tài khoản CODE ZEN",
                        subTitle: "Đăng ký",
                        footer_desc: "Bạn đã có tài khoản?"
                    }
                }
            } else {
                return {
                    ...state,
                    isRegister: true,
                    open: true,
                    isFormRegister: false,
                    textModel: {
                        title: "Đăng ký tài khoản CODE ZEN",
                        subTitle: "Đăng ký",
                        footer_desc: "Bạn đã có tài khoản?"
                    }
                }
            }

        case TYPE_APP.HIDE_REGISTER:
            return {
                ...state,
                open: false,
                isRegister: false
            }
        case TYPE_APP.SHOW_FORGOTPASSWORD:
            return {
                open: true,
                isLogin: false,
                isRegister: false,
                isForgotPassword: false,
                isFormLogin: false,
                isFormRegister: false,
                isFormForgotpassword: true,
                isBackDefault: false,
                textModel: {
                    title: "Quên mật khẩu tại CODE ZEN",
                    subTitle: "Đăng nhập",
                    footer_desc: "Bạn chưa có tài khoản?"
                },
            }
        case TYPE_APP.HIDE_FORGOTPASSWORD:
            return {
                ...state,
                open: false,
                isForgotPassword: false
            }

        case TYPE_APP.SHOW_FORM_LOGIN:
            return {
                ...state,
                isBackDefault: true,
                isFormLogin: true,
            }
        case TYPE_APP.SHOW_FORM_REGISTER:
            return {
                ...state,
                isBackDefault: true,
                isFormRegister: true,
            }
        case TYPE_APP.SHOW_FORM_FORGOT_PASSWORRD:
            return {
                open: true,
                isLogin: false,
                isRegister: false,
                isForgotPassword: false,
                isFormLogin: false,
                isFormRegister: false,
                isFormForgotpassword: true,
                isBackDefault: true,
                textModel: {
                    title: "Quên mật khẩu tại CODE ZEN",
                    subTitle: "Đăng nhập",
                    footer_desc: "Bạn chưa có tài khoản?"
                },
            }
        case TYPE_APP.DEFAULT_SHOW_HIDE:
            if (state.isFormLogin) {
                return {
                    open: true,
                    isLogin: true,
                    isRegister: false,
                    isForgotPassword: false,
                    isFormLogin: false,
                    isFormRegister: false,
                    isFormForgotpassword: false,
                    isBackDefault: false,
                    isShowModelOTP: false,
                    textModel: {
                        title: "Đăng nhập vào CODE ZEN",
                        subTitle: "Đăng nhập",
                        footer_desc: "Bạn chưa có tài khoản?"
                    }
                }
            } else if (state.isFormRegister) {
                return {
                    open: true,
                    isLogin: false,
                    isRegister: true,
                    isForgotPassword: false,
                    isFormLogin: false,
                    isFormRegister: false,
                    isFormForgotpassword: false,
                    isBackDefault: false,
                    isShowModelOTP: false,
                    textModel: {
                        title: "Đăng ký tài khoản CODE ZEN",
                        subTitle: "Đăng ký",
                        footer_desc: "Bạn đã có tài khoản?"
                    }
                }
            } else if (state.isFormForgotpassword) {
                return {
                    open: true,
                    isLogin: true,
                    isRegister: false,
                    isForgotPassword: false,
                    isFormLogin: false,
                    isFormRegister: false,
                    isFormForgotpassword: false,
                    isBackDefault: false,
                    isShowModelOTP: false,
                    textModel: {
                        title: "Đăng nhập vào CODE ZEN",
                        subTitle: "Đăng nhập",
                        footer_desc: "Bạn chưa có tài khoản?"
                    }
                }
            } else {
                return init
            }
        case TYPE_APP.SHOW_MODEL_OTP:
            return {
                ...state,
                isShowModelOTP: true
            }

        case TYPE_APP.HIDE_MODEL_OTP:
            return {
                ...state,
                isShowModelOTP: false
            }
        case TYPE_APP.HIDE_ALL:
            return {
                open: false,
                isLogin: false,
                isRegister: false,
                isForgotPassword: false,
                isFormLogin: false,
                isFormRegister: false,
                isFormForgotpassword: false,
                isBackDefault: false,
                isShowModelOTP: false,
                textModel: {
                    title: "",
                    subTitle: "",
                    footer_desc: ""
                }
            }
        default:
            return state
    }
}


export default showHideReducer;