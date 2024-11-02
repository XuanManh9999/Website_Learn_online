import TYPE_APP from "../type"

export const save_user = (payload) => {
    return {
        type: TYPE_APP.SAVE_USER,
        payload
    }
}

export const clear_user = () => {
    return {
        type: TYPE_APP.CLEAR_USER
    }
}