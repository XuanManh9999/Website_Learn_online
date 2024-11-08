import URL from "../utils/url-route";
import Setting from "../components/public/setting";
import Info from "../components/public/info";
import PasswordSecurityInfo from "../components/public/PasswordSecurity";
import LayoutLearning from "../layouts/LayoutLearning";
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
