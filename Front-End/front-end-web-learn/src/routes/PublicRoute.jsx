import Component404 from "../components/share/404";
import LayoutHome from "../layouts/LayoutHome";
import URL from "../utils/url-route";
import Section from "../components/share/Section";
import Romap from "../components/public/romap";
import Introduction from "../components/share/Introduction";
const publicRoutes = [
  {
    path: URL.PUBLIC.HOME,
    element: <LayoutHome />,
    children: [
      {
        path: "/course",
        element: <Romap />,
      },
      {
        index: true, // Đặt Section là phần tử mặc định
        element: (
          <>
            <Introduction />
            <Section />
          </>
        ),
      },
    ],
  },
  {
    path: URL.PUBLIC.NOT_FOUND,
    element: <Component404 />,
  },
  // Thêm các public route khác tại đây
];
export default publicRoutes;
