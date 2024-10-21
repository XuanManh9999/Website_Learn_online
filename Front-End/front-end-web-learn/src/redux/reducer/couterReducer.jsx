import TYPE_APP from "../type";
const couterReducer = (state = {
    type: "",
    value: 0
}, actions) => {
    switch (actions.type) {
        case TYPE_APP.UP:
            return {
                ...state,
                value: state.value + 1
            }
        case TYPE_APP.DOWN:
            return {
                ...state,
                value: state.value - 1
            }
        default:
            return state;
    }
}
export default couterReducer