import "./App.css";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import CountriesPage from "./Pages/CountriesPage/CountriesPage";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import { useEffect, useRef } from "react";
import {
  fetchCountries,
  setupLocalStoragePlanner,
} from "./state/slices/countries.slice";
import { Spinner } from "./Components/Spinner/Spinner";
import { ToastContainer } from "react-toastify";
import { TripPlanPage } from "./Pages/TripPlanPage/TripPlanPage";
import { loadPlannerFromLocalStorage } from "./services/data.service";
import { CreateTripPage } from "./Pages/CreateTripPage/CreateTripPage";
import { TripViewPage } from "./Pages/TripViewPage/TripViewPage";

function App() {
  const isLoading = useAppSelector((state) => state.countries.isLoading);
  const countries = useAppSelector((state) => state.countries.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);
  const initRef = useRef(false);
  useEffect(() => {
    // imav problem so interfejsite i neznaev kako da go resam nemozev nisto da najdam i moram od chat gpt.
    if (initRef.current) return;
    if (!countries.length) return;
    const savedTrips = loadPlannerFromLocalStorage();
    if (savedTrips.length) {
      const lastTrip = savedTrips[savedTrips.length - 1];
      const countriesToSetup = countries.map((country) => {
        const planned = lastTrip.countries.find(
          (c) => c.name === country.name.common
        );
        return planned
          ? { ...country, inPlanner: true, days: planned.days }
          : { ...country, inPlanner: false, days: 0 };
      });
      dispatch(setupLocalStoragePlanner(countriesToSetup));
    }
    initRef.current = true;
  }, [countries, dispatch]);
  const appName = "Trip Planner App";
  const linkData = [
    { name: "Home", path: "/" },
    { name: "Asia", path: "/asia" },
    { name: "Africa", path: "/africa" },
    { name: "Europe", path: "/europe" },
    { name: "Americas", path: "/americas" },
    { name: "Oceania", path: "/oceania" },
    { name: "Plan Trip", path: "/plan-trip" },
    { name: "Create Trip", path: "/create-trip" },
    { name: "View Trips", path: "/view-trips" },
  ];
  return (
    <>
      {isLoading && <Spinner />}
      <ToastContainer position="bottom-right" />
      <div className="App">
        <Header title={appName} continents={linkData} />
        <main>
          <Routes>
            <Route
              path="/"
              element={<CountriesPage selectedContinent={""} />}
            ></Route>
            <Route
              path="/asia"
              element={<CountriesPage selectedContinent={"Asia"} />}
            ></Route>
            <Route
              path="/africa"
              element={<CountriesPage selectedContinent={"Africa"} />}
            ></Route>
            <Route
              path="/europe"
              element={<CountriesPage selectedContinent={"Europe"} />}
            ></Route>
            <Route
              path="/americas"
              element={<CountriesPage selectedContinent={"Americas"} />}
            ></Route>
            <Route
              path="/oceania"
              element={<CountriesPage selectedContinent={"Oceania"} />}
            ></Route>
            <Route path="/plan-trip" element={<TripPlanPage />}></Route>
            <Route path="/create-trip" element={<CreateTripPage />}></Route>
            <Route path="/view-trips" element={<TripViewPage />}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
