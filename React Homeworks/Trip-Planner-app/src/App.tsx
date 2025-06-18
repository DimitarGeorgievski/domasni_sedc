import { useState } from "react";
import "./App.css";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import CountriesPage from "./Pages/CountriesPage/CountriesPage";

function App() {
  const appName = "Trip Planner App";
  const linkData: string[] = [
    "Home",
    "Asia",
    "Africa",
    "Europe",
    "Americas",
    "Oceania",
  ];
  const [selectedContinent, setSelectedContinent] = useState("");
  return (
    // iskreno mi nemase logika interface-ot sto e za countries i morav barem da si go napram ponormalen da e so korisni informaci i se nadevam deka e okej
    <div className="App">
      <Header onContinentClick={(continent) => setSelectedContinent(continent === "Home" ? "" : continent)} title={appName} continents={linkData} />
      <main>
        <CountriesPage selectedContinent={selectedContinent}/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
