import { useState } from "react";
import "./App.css";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import CountriesPage from "./Pages/CountriesPage/CountriesPage";
import { Route, Routes } from "react-router-dom";

function App() {
  const appName = "Trip Planner App";
  const linkData = [
    { name: "Home", path: "/" },
    { name: "Asia", path: "/asia" },
    { name: "Africa", path: "/africa" },
    { name: "Europe", path: "/europe" },
    { name: "Americas", path: "/americas" },
    { name: "Oceania", path: "/oceania" },
  ];
  const [selectedContinent, setSelectedContinent] = useState("");
  return (
    // iskreno mi nemase logika interface-ot sto e za countries i morav barem da si go napram ponormalen da e so korisni informaci i se nadevam deka e okej
    <div className="App">
      <Header
        onContinentClick={(continent) =>
          setSelectedContinent(continent === "Home" ? "" : continent)
        }
        title={appName}
        continents={linkData}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={<CountriesPage selectedContinent={selectedContinent} />}
          ></Route>
          <Route
            path="/asia"
            element={<CountriesPage selectedContinent={selectedContinent} />}
          ></Route>
          <Route
            path="/africa"
            element={<CountriesPage selectedContinent={selectedContinent} />}
          ></Route>
          <Route
            path="/europe"
            element={<CountriesPage selectedContinent={selectedContinent} />}
          ></Route>
          <Route
            path="/americas"
            element={<CountriesPage selectedContinent={selectedContinent} />}
          ></Route>
          <Route
            path="/oceania"
            element={<CountriesPage selectedContinent={selectedContinent} />}
          ></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

{
  /* <CountriesPage selectedContinent={selectedContinent}/> */
}
export default App;
