import {
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { NavLink, useLocation } from "react-router-dom";
import ConfirmationModal from "../ui/ConfirmationModal";

const SideBar = ({ isSidebarOpen = false, onCloseSidebar = () => {} }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth < 1024) {
      onCloseSidebar();
    }
  }, [location.pathname, onCloseSidebar]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        onCloseSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onCloseSidebar]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onCloseSidebar();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isSidebarOpen, onCloseSidebar]);

  useEffect(() => {
    const isMobileOrTablet = window.innerWidth < 1024;

    if (isSidebarOpen && isMobileOrTablet) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  if (isLoggedIn) {
    return (
      <>
        {isSidebarOpen && (
          <button
            aria-label="Close sidebar"
            className="fixed inset-0 top-15 z-30 bg-black/30 lg:hidden"
            onClick={onCloseSidebar}
            type="button"
          />
        )}
        <Sidebar
          className={`fixed left-0 top-15 z-40 h-[calc(100vh-3.5rem)] w-64 bg-none transform transition-transform duration-200 lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarItems className="h-full flex flex-col justify-between">
            <SidebarItemGroup>
              <SidebarItem
                as={NavLink}
                to="/dashboard"
                icon={undefined}
                onClick={onCloseSidebar}
              >
                Dashboard
              </SidebarItem>
              <SidebarCollapse icon={undefined} label="Invoices">
                <SidebarItem
                  as={NavLink}
                  to="/invoices"
                  onClick={onCloseSidebar}
                >
                  List All
                </SidebarItem>
                <SidebarItem
                  as={NavLink}
                  to="/invoices/new"
                  onClick={onCloseSidebar}
                >
                  Add invoice
                </SidebarItem>
              </SidebarCollapse>
              <SidebarItem
                as={NavLink}
                to="/clients"
                icon={undefined}
                onClick={onCloseSidebar}
              >
                Clients
              </SidebarItem>
              <SidebarItem
                as={NavLink}
                to="/profile"
                icon={undefined}
                onClick={onCloseSidebar}
              >
                Profile
              </SidebarItem>
            </SidebarItemGroup>
            <SidebarItemGroup>
              <SidebarItem
                className="cursor-pointer"
                onClick={() => setOpenLogoutModal(true)}
                icon={undefined}
              >
                Sign Out
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
        <ConfirmationModal
          show={openLogoutModal}
          status={"signout"}
          title={"Confirm signout"}
          message={"Do you wish to signout ?"}
          confirmText={"Signout"}
          isLoading={undefined}
          onClose={() => setOpenLogoutModal(false)}
          onConfirm={logout}
        />
      </>
    );
  }

  return null;
};

export default SideBar;
