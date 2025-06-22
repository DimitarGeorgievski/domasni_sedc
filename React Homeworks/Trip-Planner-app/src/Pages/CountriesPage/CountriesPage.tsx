import "./CountriesPage.css";
import CountryCard from "../../Components/CountryCard/CountryCard";
import countriesData from "../../data/countries.json";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useState } from "react";

interface CountriesPageProps {
  selectedContinent: string;
}

function CountriesPage({ selectedContinent }: CountriesPageProps) {
  const [searchInput, setSearchInput] = useState("");
  let filterCountries = countriesData;
  if(selectedContinent !== ""){
    filterCountries = filterCountries.filter((country) => country.continent === selectedContinent)
  }
  if(selectedContinent === ""){
    filterCountries = filterCountries.filter((country) => country.country.toLowerCase().includes(searchInput.toLowerCase()))
  }
  // dali e dobar pristap na vakov nacin da se primenvat filteri?
  const onSearch = (input: string) => {
    setSearchInput(input);
  };
  return (
    <div>
      {selectedContinent === "" && <SearchBar onSearch={onSearch} />}
      <section className="countries">
        {filterCountries.map((country) => (
          <CountryCard key={country.country} Country={country} />
        ))}
      </section>
    </div>
  );
}

export default CountriesPage;
