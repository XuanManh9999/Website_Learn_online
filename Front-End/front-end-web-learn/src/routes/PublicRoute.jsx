import LayoutHome from "../layouts/LayoutHome";
import LayoutInfo from "../layouts/LayoutInfo";
import LayoutLearning from "../layouts/LayoutLearning";
import URL from "../utils/url-route";
const publicRoutes = [
    {
        path: URL.PUBLIC.HOME, element: <LayoutHome />,
        children: [

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
    }
    // Thêm các public route khác tại đây
];
export default publicRoutes