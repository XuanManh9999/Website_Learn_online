const URL = {
  AUTH: {
    LOGIN: "/login",
  },
  PUBLIC: {
    HOME: "/",
    COURSE: "/courses/:slug",
    INFO: "/info",
    SERVER_ERROR: "/loi-he-thong",
    NOT_FOUND: "*",
    LEARNING_MAP: "/learning-paths"
  },
  PRIVATE: {
    HOME: "/admin",
    SETTING: "/setting",
    MY_INFOR: "my-info",
    MY_PASSWORD: "change-password",
    LEARNING: "/learning/:slug",
  },
  ADMIN: {
    HOME: "/admin",
    MANAGE_ADMIN: "manage-user",
    MANAGE_COURSE: "manage-course"
  },
};
export default URL;
