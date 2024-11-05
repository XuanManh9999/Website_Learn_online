import TYPE_APP from "../type";
const init = {
    open: false,
    isLogin: false,
    isRegister: false,
    isForgotPassword: false,
    isFormLogin: false,
    isFormRegister: false,
    isFormForgotpassword: false,
    textModel: {
        title: "",
        subTitle: "",
        footer_desc: ""
    }
}

const showHideReducer = (state = init, action) => {
    switch (action.type) {
        case TYPE_APP.SHOW_LOGIN:
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
        case TYPE_APP.HIDE_REGISTER:
            return {
                ...state,
                open: false,
                isRegister: false
            }
        case TYPE_APP.SHOW_FORGOTPASSWORD:
            return {
                ...state,
                isForgotPassword: true,
                open: true,
                isFormForgotpassword: false,
                textModel: {
                    title: "Quên mật khẩu tại CODE ZEN",
                    subTitle: "Quên mật khẩu",
                    footer_desc: "Bạn chưa có tài khoản?"
                }
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
                isFormLogin: true,
            }
        case TYPE_APP.SHOW_FORM_REGISTER:
            return {
                ...state,
                isFormRegister: true,
            }
        case TYPE_APP.SHOW_FORM_FORGOT_PASSWORRD:
            return {
                ...state,
                isFormForgotpassword: true,
            }
        case TYPE_APP.DEFAULT_SHOW_HIDE:
            return init
        default:
            return state
    }
}


export default showHideReducer;