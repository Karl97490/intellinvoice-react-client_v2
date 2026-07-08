import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import NavBar from "./NavBar";
import Footer from "./Footer";

const PrivateLayout = () => {
  return (
    <div className="min-h-screen flex">
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
