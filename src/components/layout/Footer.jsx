import {
  Footer as FooterFlowbite,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";

const Footer = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return (
      <FooterFlowbite container className="mt-5">
        <FooterCopyright by="Crack it Squad" year={2026} />
        <FooterLinkGroup>
          <FooterLink href="#">Dashboard</FooterLink>
          <FooterLink href="#">GitHub</FooterLink>
          <FooterLink href="#">LinkedIn</FooterLink>
          <FooterLink href="#">Profile</FooterLink>
        </FooterLinkGroup>
      </FooterFlowbite>
    );
  }
};

export default Footer;
