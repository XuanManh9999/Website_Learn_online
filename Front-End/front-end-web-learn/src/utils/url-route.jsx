const URL = {
    AUTH: {
        LOGIN: "/login"
    },
    PUBLIC: {
        HOME: "/",
        LEARNING: "/learning",
        COURSE: "/course/*",
        INFO: "/info",
        NOT_FOUND: "*",
    },
    PRIVATE: {
        HOME: "/admin",
        SETTING: "/setting",
        MY_INFOR: "my-info",
        MY_PASSWORD: "change-password"
    }
}
export default URL;