import TYPE_APP from "../type"
const show_login = () => ({
    type: TYPE_APP.SHOW_LOGIN
})
const hide_login = () => ({
    type: TYPE_APP.HIDE_LOGIN
})
const show_register = () => ({
    type: TYPE_APP.SHOW_REGISTER
})
const hide_register = () => ({
    type: TYPE_APP.HIDE_REGISTER
})

const show_forgotpassword = () => ({
    type: TYPE_APP.SHOW_FORGOTPASSWORD
})
const hide_forgotpassword = () => ({
    type: TYPE_APP.HIDE_FORGOTPASSWORD
})


const show_form_forgotpassword = () => ({
    type: TYPE_APP.SHOW_FORM_FORGOT_PASSWORRD
})
const hide_form_forgotpassword = () => ({
    type: TYPE_APP.HIDE_FORM_FORGOT_PASSWORRD
})

const show_form_register = () => ({
    type: TYPE_APP.SHOW_FORM_REGISTER
})
const hide_form_register = () => ({
    type: TYPE_APP.HIDE_FORM_REGISTER
})

const show_form_login = () => ({
    type: TYPE_APP.SHOW_FORM_LOGIN
})
const hide_form_login = () => ({
    type: TYPE_APP.HIDE_FORM_LOGIN
})


const default_show_hide = () => ({
    type: TYPE_APP.DEFAULT_SHOW_HIDE
})


export {
    show_login,
    hide_login,
    show_register,
    hide_register,
    show_forgotpassword,
    hide_forgotpassword,
    show_form_forgotpassword,
    hide_form_forgotpassword,
    show_form_register,
    hide_form_register,
    show_form_login,
    hide_form_login,
    default_show_hide
}