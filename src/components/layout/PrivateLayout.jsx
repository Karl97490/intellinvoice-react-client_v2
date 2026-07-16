import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";

const PrivateLayout = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <SideBar />
      <div className="ml-64 pt-15">
        <main className="p-6">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
