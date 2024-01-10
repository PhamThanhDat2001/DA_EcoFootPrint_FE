import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/header.jsx";
import Footer from "../components/footer.jsx";

// Tạo một component con để chứa nội dung
function MainContent() {
  return (
    <>
      <div className="navleft">
      <div id="sidebar" >
        <nav>
          <ul>
            <li>
              <Link to={`/trangchu`}>Trang chủ</Link>
            </li>
            <li>
              <Link to={`/nhatkyhoatdong`}>Nhật ký hoạt động</Link>
            </li>
            <li>
              <Link to={`/tinhtoan`}>Tính Toán</Link>
            </li>
            <li>
              <Link to={`/noidunggiaoduc`}>Nội dung giáo dục</Link>
            </li>
            <li>
              <Link to={`/congdong`}>Cộng đồng</Link>
            </li>
            <li>
              <Link to={`/ranking`}>Bảng xếp hạng</Link>
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
