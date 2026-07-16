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
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";

const NavBar = () => {
  const { user, isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return (
      <Navbar fluid rounded>
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
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownItem>Profile</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>
      </Navbar>
    );
  }

  return (
    <Navbar fluid rounded>
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
