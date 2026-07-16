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

const SideBar = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return (
      <Sidebar className="fixed left-0 top-15 h-[calc(100vh-4rem)] w-64">
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem href="#" icon={undefined}>
              Dashboard
            </SidebarItem>
            <SidebarCollapse icon={undefined} label="E-commerce">
              <SidebarItem href="#">Products</SidebarItem>
              <SidebarItem href="#">Sales</SidebarItem>
              <SidebarItem href="#">Refunds</SidebarItem>
              <SidebarItem href="#">Shipping</SidebarItem>
            </SidebarCollapse>
            <SidebarItem href="#" icon={undefined}>
              Inbox
            </SidebarItem>
            <SidebarItem href="#" icon={undefined}>
              Users
            </SidebarItem>
            <SidebarItem href="#" icon={undefined}>
              Products
            </SidebarItem>
            <SidebarItem href="#" icon={undefined}>
              Sign In
            </SidebarItem>
            <SidebarItem href="#" icon={undefined}>
              Sign Up
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    );
  }
};

export default SideBar;
