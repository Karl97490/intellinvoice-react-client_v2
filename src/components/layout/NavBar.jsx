import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
  Avatar,
  Button,
} from "flowbite-react";
import { Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import ConfirmationModal from "../ui/ConfirmationModal";
import Logo from "../../assets/images/intellinvoice-logo.svg";

const NavBar = ({ isSidebarOpen = false, onToggleSidebar = () => {} }) => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  if (isLoggedIn) {
    return (
      <>
        <Navbar
          fluid
          rounded
          className="fixed top-0 left-0 right-0 z-50 bg-gray-50"
        >
          <NavbarBrand>
            <img
              src={Logo}
              className="mr-3 h-6 sm:h-9"
              alt="IntellInvoice Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              IntellInvoice
            </span>
          </NavbarBrand>
          <div className="flex md:order-2">
            <Button
              color="light"
              pill
              className="mr-2 lg:hidden"
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
              onClick={onToggleSidebar}
            >
              {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  className="cursor-pointer"
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">{`${user?.firstName} ${user?.lastName}`}</span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </DropdownHeader>
              <DropdownItem as={Link} to="/dashboard">
                Dashboard
              </DropdownItem>
              <DropdownItem as={Link} to="/profile">
                Profile
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={() => setOpenLogoutModal(true)}>
                Sign out
              </DropdownItem>
            </Dropdown>
          </div>
        </Navbar>
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

  return (
    <Navbar
      fluid
      rounded
      className="fixed top-0 left-0 right-0 z-50 bg-gray-50"
    >
      <NavbarBrand as={Link} to="/">
        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="IntellInvoice Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          IntellInvoice
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button as={Link} to="/login" className="cursor-pointer">
          Get started
        </Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse className="dark:text-white">
        <NavLink to="/" active>
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavBar;
