const couterReducer = (state = {
    type: "",
    value: 0
}, actions) => {
    switch (actions.type) {
        case "UP":
            return {
                ...state,
                value: state.value + 1
            }
        case "DOWN":
            return {
                ...state,
                value: state.value - 1
            }
        default:
            return state;
    }
}
export default couterReducer