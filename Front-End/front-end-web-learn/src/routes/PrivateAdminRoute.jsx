import URL from "../utils/url-route";
import LayoutHomeAdmin from "../layouts/LayoutAdmin";
import ManageUser from "../components/private/ManageUser";
import ManageCourse from "../components/private/ManageCourse";
const privateAdminRoutes = [
  {
    path: URL.ADMIN.HOME,
    element: <LayoutHomeAdmin />,
    children: [
      {
        path: URL.ADMIN.MANAGE_ADMIN,
        element: <ManageUser />,
      },
      {
        path: URL.ADMIN.MANAGE_COURSE,
        element: <ManageCourse />,
      },
    ],
  },
];

export default privateAdminRoutes;
