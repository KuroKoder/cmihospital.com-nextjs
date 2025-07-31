import Navbar from "../layout/public-header";
import Footer from "../layout/public-footer";
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
