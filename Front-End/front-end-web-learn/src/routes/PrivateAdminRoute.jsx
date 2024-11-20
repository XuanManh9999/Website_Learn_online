import URL from "../utils/url-route";
import LayoutHomeAdmin from "../layouts/LayoutAdmin";
import ManageUser from "../components/private/ManageUser";
const privateAdminRoutes = [
  {
    path: URL.ADMIN.HOME,
    element: <LayoutHomeAdmin />,
    children: [
      {
        path: URL.ADMIN.MANAGE_ADMIN,
        element: <ManageUser />,
      },
    ],
  },
];

export default privateAdminRoutes;
