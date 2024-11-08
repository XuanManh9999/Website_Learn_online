import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function ScrollToTop() {
  const { pathname } = useLocation();
    console.log("vao day");
    
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // Cuộn nhanh ngay lập tức
    });
  }, [pathname]); // Gọi lại mỗi khi pathname thay đổi

  return null;
}

export default ScrollToTop;
