import Navbar from "./public-header";
import Footer from "./footer/public-footer";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      {children}

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default MainLayout;
