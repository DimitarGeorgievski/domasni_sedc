import { NavLink } from "react-router-dom";
import "./Navbar.css";

interface linkDataProps {
  name: string;
  path: string;
}

interface NavbarProps {
  linkData: linkDataProps[];
}

function Navbar({ linkData }: NavbarProps) {
  return (
    <nav className="Navbar">
      <ul>
        {linkData.map((link, i) => (
          <li key={i}>
            <NavLink to={link.path}>{link.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
