import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../../components/public/footer";
import ModelAuth from "../../components/share/ModelAuth/ModelAuth";
import { useDispatch } from "react-redux";
import { clear_user, save_user } from "../../redux/action/auth";
import { apiGetInfo } from "../../services/private/auth";
import Header from "../../components/public/header";
import { ArrowUpOutlined } from "@ant-design/icons";
import "./LayOutCss.scss";

function LayoutHome() {
  const [isShowBackToTop, setIsShowBackToTop] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetching = async () => {
      const response = await apiGetInfo();
      if (response && response?.status == 200) {
        dispatch(save_user(response.user));
      } else {
        dispatch(clear_user());
      }
    };
    fetching();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      let curr = window.scrollY;
      if (curr >= 400) {
        setIsShowBackToTop(true);
      } else {
        setIsShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleBackTop = () => {
    window.scrollTo({
      top: 0, // Vị trí đích là đầu trang (tọa độ Y = 0)
      behavior: "smooth", // Cuộn mượt mà
    });
  };
  return (
    <>
      <div className="layout__home">
        <Header />
        <main
          style={{
            marginTop: "66px",
          }}
        >
          <article>
            <Outlet />
          </article>
        </main>
        <Footer />
        <ModelAuth />
      </div>

      <div className="hotline-phone-ring-wrap">
        <div className="hotline-phone-ring">
          <div className="hotline-phone-ring-circle"></div>
          <div className="hotline-phone-ring-circle-fill"></div>
          <div className="hotline-phone-ring-img-circle">
            <Link to="tel:0585976890">
              <img
                src="https://mwc.com.vn/Assets/App/images/icon-2.png"
                alt="Số điện thoại"
                width="50"
              />
            </Link>
          </div>
        </div>
      </div>

      {isShowBackToTop ? (
        <div className="bttop" onClick={handleBackTop}>
          <ArrowUpOutlined size={26} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default LayoutHome;
