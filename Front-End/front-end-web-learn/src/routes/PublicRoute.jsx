import Component404 from "../components/share/404";
import LayoutHome from "../layouts/LayoutHome";
import LayoutInfo from "../layouts/LayoutInfo";
import URL from "../utils/url-route";
import Section from "../components/share/Section";
import InfoCourse from "../layouts/LayoutInfoCourse";
import Romap from "../components/public/romap";
const publicRoutes = [
    {
        path: URL.PUBLIC.HOME, element: <LayoutHome />,
        children: [
            {
                index: true, // Đặt Section là phần tử mặc định
                element: <Section />
            }
        ]
    },
    {
        path: URL.PUBLIC.COURSE_INFO, element: <InfoCourse />,
        children: [
            {
                path: ':courseSlug',
                element: <Romap />
            }
        ]
    }, {
        path: URL.PUBLIC.INFO, element: <LayoutInfo />,
        children: [

        ]
    },
    {
        path: URL.PUBLIC.NOT_FOUND, element: <Component404 />
    }
    // Thêm các public route khác tại đây
];
export default publicRoutes