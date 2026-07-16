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
import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import ConfirmationModal from "../ui/ConfirmationModal";

const NavBar = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  if (isLoggedIn) {
    return (
      <>
        <Navbar fluid rounded className="fixed top-0 left-0 right-0 z-50">
          <NavbarBrand>
            <img
              src="/favicon.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Flowbite React
            </span>
          </NavbarBrand>
          <div className="flex md:order-2">
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
    <Navbar fluid rounded className="fixed top-0 left-0 right-0 z-50">
      <NavbarBrand>
        <img
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button className="cursor-pointer">Get started</Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavLink to="#" active>
          Home
        </NavLink>
        <NavLink to="#">About</NavLink>
        <NavLink to="#">Contact</NavLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavBar;
