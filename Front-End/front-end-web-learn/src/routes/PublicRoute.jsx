import Component404 from "../components/share/404";
import LayoutHome from "../layouts/LayoutHome";
import LayoutInfo from "../layouts/LayoutInfo";
import LayoutLearning from "../layouts/LayoutLearning";
import URL from "../utils/url-route";
import Section from "../components/share/Section";
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
        path: URL.PUBLIC.LEARNING, element: <LayoutLearning />,
        children: [

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