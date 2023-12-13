import { Outlet,Link } from "react-router-dom";
import Navbar from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import MainContent from "../components/maincontent.jsx";

export default function Root() {
  return (
    <>
      <header id="header">
        <Navbar />
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