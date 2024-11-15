import { Navigate, useRoutes } from "react-router-dom";
import privateUserRoutes from "./PrivateUserRoute";
import publicRoutes from "./PublicRoute";
import privateAdminRoutes from "./PrivateAdminRoute";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { apiGetInfo } from "../services/private/auth";
import { save_user } from "../redux/action/auth";
import { useEffect, useState } from "react";
import SpinLoading from "../components/share/SpinLoading";

const PrivateUserRoute = ({ element }) => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        const info = await apiGetInfo();
        if (info && info.status === 200) {
          dispatch(save_user(info.user));
          setIsAuthenticated(true);
        }
      }
      setIsLoading(false);
    };

    setTimeout(() => {
      fetchUserInfo();
    }, 1000);
  }, [dispatch, token]);

  if (isLoading) {
    // Có thể thêm một loading spinner ở đây nếu cần
    return <SpinLoading />;
  }

  // Chuyển hướng sau khi kiểm tra hoàn tất
  return isAuthenticated ? element : <Navigate to="/" />;
};

const PrivateAdminRoute = ({ element }) => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        const info = await apiGetInfo();
        if (info && info.status === 200) {
          if (info?.user?.role == "ADMIN") {
            dispatch(save_user(info.user));
            setIsAuthenticated(true);
          }
        }
      }
      setIsLoading(false);
    };

    setTimeout(() => {
      fetchUserInfo();
    }, 1000);
  }, [dispatch, token]);

  if (isLoading) {
    // Có thể thêm một loading spinner ở đây nếu cần
    return <SpinLoading />;
  }

  // Chuyển hướng sau khi kiểm tra hoàn tất
  return isAuthenticated ? element : <Navigate to="/" />;
};

const PublicRoute = ({ element }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });
  if (isLoading) {
    // Có thể thêm một loading spinner ở đây nếu cần
    return <SpinLoading />;
  }
  return !isLoading ? element : <SpinLoading />;
};
const AppRoutes = () => {
  const routes = [
    ...publicRoutes.map((route) => ({
      ...route,
      element: <PublicRoute element={route.element} />,
    })),
    ...privateUserRoutes.map((route) => ({
      ...route,
      element: <PrivateUserRoute element={route.element} />,
    })),
    ...privateAdminRoutes.map((route) => ({
      ...route,
      element: <PrivateAdminRoute element={route.element} />,
    })),
  ];
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [routes]);

  return useRoutes(routes);
};

export default AppRoutes;
