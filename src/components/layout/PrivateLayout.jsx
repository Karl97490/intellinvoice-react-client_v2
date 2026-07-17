import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";

const PrivateLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);
  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
      <SideBar isSidebarOpen={isSidebarOpen} onCloseSidebar={closeSidebar} />
      <div className="pt-15 lg:ml-64">
        <main className="p-6">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
