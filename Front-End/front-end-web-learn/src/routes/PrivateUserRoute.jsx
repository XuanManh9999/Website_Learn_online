import URL from "../utils/url-route";
import Setting from "../components/public/setting";
import Info from "../components/public/info";
import PasswordSecurityInfo from "../components/public/password";
import LayoutLearning from "../layouts/LayoutLearning";
import ContentLearning from "../components/private/ContentLearning";
const privateUserRoutes = [
  {
    path: URL.PRIVATE.SETTING,
    element: <Setting />,
    children: [
      { path: URL.PRIVATE.MY_INFOR, element: <Info /> },
      { path: URL.PRIVATE.MY_PASSWORD, element: <PasswordSecurityInfo /> },
    ],
  },
  {
    path: URL.PRIVATE.LEARNING,
    element: <LayoutLearning />,
  },
];

export default privateUserRoutes;
