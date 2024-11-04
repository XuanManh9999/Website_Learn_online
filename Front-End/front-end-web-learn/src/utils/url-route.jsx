const URL = {
    AUTH: {
        LOGIN: "/login"
    },
    PUBLIC: {
        HOME: "/",
        LEARNING: "/learning",
        INFO: "/info",
        COURSE_INFO: "/courses/*",
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