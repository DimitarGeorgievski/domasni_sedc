import "./Navbar.css";

interface NavbarProps {
  linkData: string[];
  onContinentClick: (continent: string) => void
}

function Navbar({ linkData, onContinentClick }: NavbarProps) {
  return (
    <nav className="Navbar">
      <ul>
        {linkData.map((link, i) => (
          <li key={i}>
            <a href="#" onClick={() => {
              onContinentClick(link)
            }}>{link}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
