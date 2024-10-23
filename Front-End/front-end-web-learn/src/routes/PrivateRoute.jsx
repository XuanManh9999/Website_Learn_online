import URL from "../utils/url-route";
import LayoutAdmin from "../layouts/LayoutAdmin";
const privateRoutes = [
    { path: URL.PRIVATE.HOME, element: <LayoutAdmin /> },
];

export default privateRoutes;