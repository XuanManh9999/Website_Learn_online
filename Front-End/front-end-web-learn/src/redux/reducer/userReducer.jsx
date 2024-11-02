import TYPE_APP from "../type";
import Cookies from "js-cookie";
const init = {
    isLoggedIn: false,
    type: "",
    payload: {}
}
const userReducer = (state = init, action) => {
    switch (action.type) {
        case TYPE_APP.SAVE_USER:
            return {
                ...state,
                payload: action.payload,
                isLoggedIn: true,
            }
        case TYPE_APP.CLEAR_USER:
            Cookies.remove("token")
            return init
        default:
            return state
    }
}
export default userReducer;