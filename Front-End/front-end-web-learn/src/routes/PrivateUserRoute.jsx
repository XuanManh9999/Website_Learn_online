import URL from "../utils/url-route";
import LayoutAdmin from "../layouts/LayoutHome";
import Setting from "../components/public/setting";
import Info from "../components/public/info";
import PasswordSecurityInfo from "../components/public/password";
const privateUserRoutes = [
    { path: URL.PRIVATE.HOME, element: <LayoutAdmin /> },
    {
        path: URL.PRIVATE.SETTING, element: <Setting />,
        children: [
            { path: URL.PRIVATE.MY_INFOR, element: <Info /> },
            { path: URL.PRIVATE.MY_PASSWORD, element: <PasswordSecurityInfo /> }
        ]
    }
];

export default privateUserRoutes;