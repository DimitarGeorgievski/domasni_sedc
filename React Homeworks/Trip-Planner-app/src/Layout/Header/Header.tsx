import Navbar from "../../Components/Navbar/Navbar";
import "./Header.css"

interface LinkDataProps{
    name: string;
    path: string;
}

interface HeaderProps{
    title: string;
    continents: LinkDataProps[];
}

function Header({title, continents, }: HeaderProps){
    return (
        <header className="Header">
            <h1>{title}</h1>
            <Navbar linkData={continents}/>
            <hr />
        </header>
    )
}

export default Header