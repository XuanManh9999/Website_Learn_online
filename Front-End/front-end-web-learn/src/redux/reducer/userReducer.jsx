import TYPE_APP from "../type";

const init = {
    type: "",
    payload: {}
}
const userReducer = (state = init, action) => {
    switch (action.type) {
        case TYPE_APP.SAVE_USER:
            return {
                ...state,
                payload: action.payload
            }
        case TYPE_APP.CLEAR_USER:
            return init
        default:
            return state
    }
}
export default userReducer;