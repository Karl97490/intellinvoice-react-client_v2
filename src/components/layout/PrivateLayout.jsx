import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";

const PrivateLayout = () => {
  return (
    <div className="min-h-screen flex">
      <SideBar />
      <div className="flex-1">
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PrivateLayout;
