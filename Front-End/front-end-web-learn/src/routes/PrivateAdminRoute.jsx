import URL from "../utils/url-route";
import LayoutHomeAdmin from "../layouts/LayoutAdmin";
const privateAdminRoutes = [
  {
    path: URL.ADMIN.HOME,
    element: <LayoutHomeAdmin />,
    children: [
      
    ],
  },
];

export default privateAdminRoutes;
