import {
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { ChartPie } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return (
      <Sidebar className="fixed left-0 top-15 h-[calc(100vh-3.5rem)] w-64">
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
            <SidebarItem href="#" icon={undefined}>
              Sign Out
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    );
  }
};

export default SideBar;
