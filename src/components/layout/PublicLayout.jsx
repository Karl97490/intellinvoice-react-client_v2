import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1">
        <NavBar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PublicLayout;
