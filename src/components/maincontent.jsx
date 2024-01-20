import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { CalculatorOutlined, CrownOutlined, EditOutlined, HomeOutlined, ReadOutlined, TeamOutlined } from "@ant-design/icons";

// Tạo một component con để chứa nội dung
function MainContent() {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState("");

  const handleMouseEnter = (path) => {
    setHoveredLink(path);
  };

  const handleMouseLeave = () => {
    setHoveredLink("");
  };


  return (
    <>
      <div className="navleft">
        <div id="sidebar">
          <nav>
            <ul>
              <li>
                <Link
                  to={`/trangchu`}
                  onMouseEnter={() => handleMouseEnter("/trangchu")}
                  onMouseLeave={handleMouseLeave}
                  className={(hoveredLink === "/trangchu" || location.pathname === "/trangchu") ? "active" : ""}
                >
                  <HomeOutlined />Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to={`/nhatkyhoatdong`}
                  onMouseEnter={() => handleMouseEnter("/nhatkyhoatdong")}
                  onMouseLeave={handleMouseLeave}
                  className={(hoveredLink === "/nhatkyhoatdong" || location.pathname === "/nhatkyhoatdong") ? "active" : ""}
                >
                  <EditOutlined />Nhật ký hoạt động
                </Link>
              </li>
              <li>
                <Link
                  to={`/tinhtoan`}
                  onMouseEnter={() => handleMouseEnter("/tinhtoan")}
                  onMouseLeave={handleMouseLeave}
                  className={(hoveredLink === "/tinhtoan" || location.pathname === "/tinhtoan") ? "active" : ""}
                >
                  <CalculatorOutlined />Tính Toán
                </Link>
              </li>
              <li>
                <Link
                  to={`/noidunggiaoduc`}
                  onMouseEnter={() => handleMouseEnter("/noidunggiaoduc")}
                  onMouseLeave={handleMouseLeave}
                  className={(hoveredLink === "/noidunggiaoduc" || location.pathname === "/noidunggiaoduc") ? "active" : ""}
                >
                  <ReadOutlined />Nội dung giáo dục
                </Link>
              </li>
              <li>
                <Link
                  to={`/congdong`}
                  onMouseEnter={() => handleMouseEnter("/congdong")}
                  onMouseLeave={handleMouseLeave}
                  className={(hoveredLink === "/congdong" || location.pathname === "/congdong") ? "active" : ""}
                >
                  <TeamOutlined />Cộng đồng
                </Link>
              </li>
              <li>
                <Link
                  to={`/ranking`}
                  onMouseEnter={() => handleMouseEnter("/ranking")}
                  onMouseLeave={handleMouseLeave}
                  className={(hoveredLink === "/ranking" || location.pathname === "/ranking") ? "active" : ""}
                >
                  <CrownOutlined />Bảng xếp hạng
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}


export default MainContent;
