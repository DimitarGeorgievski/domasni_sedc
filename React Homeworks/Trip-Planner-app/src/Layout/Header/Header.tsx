import Navbar from "../../Components/Navbar/Navbar";
import "./Header.css"

interface LinkDataProps{
    name: string;
    path: string;
}

interface HeaderProps{
    title: string;
    continents: LinkDataProps[];
    onContinentClick: (continent: string) => void
}

function Header({title, continents, onContinentClick}: HeaderProps){
    return (
        <header className="Header">
            <h1>{title}</h1>
            <Navbar onContinentClick={onContinentClick} linkData={continents}/>
            <hr />
        </header>
    )
}

export default Header