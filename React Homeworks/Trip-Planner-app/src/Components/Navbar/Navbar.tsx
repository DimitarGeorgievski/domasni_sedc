import { Link } from "react-router-dom";
import "./Navbar.css";

interface linkDataProps {
  name: string;
  path: string;
}

interface NavbarProps {
  linkData: linkDataProps[];
  onContinentClick: (continent: string) => void;
}

function Navbar({ linkData, onContinentClick }: NavbarProps) {
  return (
    <nav className="Navbar">
      <ul>
        {linkData.map((link, i) => (
          <li key={i}>
            <Link to={link.path} onClick={() => onContinentClick(link.name)}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
