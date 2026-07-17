import {
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { ChartPie } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { NavLink } from "react-router-dom";
import ConfirmationModal from "../ui/ConfirmationModal";

const SideBar = () => {
  const { isLoggedIn, logout, authenticateUser } = useContext(AuthContext);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const customTheme = {
    root: {
      base: "bg-white dark:bg-gray-900",
    },
  };

  if (isLoggedIn) {
    return (
      <>
        <Sidebar className="fixed left-0 top-15 h-[calc(100vh-3.5rem)] w-64 bg-none">
          <SidebarItems className="h-full flex flex-col justify-between">
            <SidebarItemGroup>
              <SidebarItem as={NavLink} to="/dashboard" icon={undefined}>
                Dashboard
              </SidebarItem>
              <SidebarCollapse icon={undefined} label="Invoices">
                <SidebarItem as={NavLink} to="/invoices">
                  List All
                </SidebarItem>
                <SidebarItem as={NavLink} to="/invoices/new">
                  Add invoice
                </SidebarItem>
              </SidebarCollapse>
              <SidebarItem as={NavLink} to="/clients" icon={undefined}>
                Clients
              </SidebarItem>
              <SidebarItem as={NavLink} to="/profile" icon={undefined}>
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
};

export default SideBar;
