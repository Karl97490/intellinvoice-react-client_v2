import {
  Footer as FooterFlowbite,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { NavLink } from "react-router-dom";
import { Link } from "lucide-react";

const Footer = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return (
      <FooterFlowbite container className="mt-5">
        <FooterCopyright by="Crack it Squad" year={2026} />
        <FooterLinkGroup>
          <FooterLink as={NavLink} to="/dashboard">
            Dashboard
          </FooterLink>
          <FooterLink href="/profile">Profile</FooterLink>
          <FooterLink href="https://github.com/Karl97490">GitHub</FooterLink>
          <FooterLink href="https://www.linkedin.com/in/karlpery-potonie">
            LinkedIn
          </FooterLink>
        </FooterLinkGroup>
      </FooterFlowbite>
    );
  }
};

export default Footer;
