import { Outlet,Link } from "react-router-dom";
import Navbar from "../components/header.jsx";

export default function Root() {
    return (
      <>
      <div id="header">
        <Navbar/>
      </div>
      <div id="main">
      <body>
        <div id="sidebar">
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
            </ul>
          </nav>
        </div>
        <div id="detail">
            <Outlet></Outlet>
        </div>
        </body>
      </div>
       
        <div id ="footer">
            <h1>Footer</h1>
        </div>
      </>
    );
  }