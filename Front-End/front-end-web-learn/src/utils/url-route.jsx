const URL = {
    AUTH: {
        LOGIN: "/login"
    },
    PUBLIC: {
        HOME: "/",
        COURSE: "/courses/:slug",
        INFO: "/info",
        NOT_FOUND: "*",
    },
    PRIVATE: {
        HOME: "/admin",
        SETTING: "/setting",
        MY_INFOR: "my-info",
        MY_PASSWORD: "change-password",
        LEARNING: "/learning/:slug",
    },
    ADMIN: {
        HOME: "/admin"  
    }
}
export default URL;