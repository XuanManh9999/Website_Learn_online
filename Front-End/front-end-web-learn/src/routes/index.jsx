import { Navigate, useRoutes } from "react-router-dom";
import privateRoutes from "./PrivateRoute";
import publicRoutes from "./PublicRoute";
const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    return token ? element : <Navigate to="/login" />;
};
const AppRoutes = () => {
    const routes = [
        ...publicRoutes,
        ...privateRoutes.map(route => ({
            ...route,
            element: <PrivateRoute element={route.element} />
        })) 
    ];
    return useRoutes(routes);
}

export default AppRoutes;