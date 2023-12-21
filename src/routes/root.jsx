import { Outlet,Link } from "react-router-dom";
import NavbarComponent from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import MainContent from "../components/maincontent.jsx";

export default function Root() {
  return (
    <>
      <header id="header">
        <NavbarComponent />
      </header>

      {/* Sử dụng component con MainContent */}
      <main id="main">
        <MainContent />
      </main>

      <footer id="footer">
        <Footer />
      </footer>
    </>
  );
  }