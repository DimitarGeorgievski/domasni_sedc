import "./CountriesPage.css";
import CountryCard from "../../Components/CountryCard/CountryCard";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useState } from "react";
import { useAppSelector } from "../../utils/hooks";

interface CountriesPageProps {
  selectedContinent: string;
}

function CountriesPage({ selectedContinent }: CountriesPageProps) {
  const countries = useAppSelector(state => state.countries.value)
  const [searchInput, setSearchInput] = useState("");
  let filteredCountires = countries
  if (selectedContinent !== "") {
    filteredCountires = filteredCountires.filter(
      (country) => country.region === selectedContinent
    );
  }
  if (selectedContinent === "") {
    filteredCountires = filteredCountires.filter((country) =>
      country.name.common.toLowerCase().includes(searchInput.toLowerCase())
    );
  }
  filteredCountires = filteredCountires.slice(0, 10);
  // dali e dobar pristap na vakov nacin da se primenvat filteri?
  const onSearch = (input: string) => {
    setSearchInput(input);
  };
  return (
    <div>
      {selectedContinent === "" && <SearchBar onSearch={onSearch} />}
      <section className="countries">
        {filteredCountires.map((country) => (
          <CountryCard key={country.name.common} Country={country} />
        ))}
      </section>
    </div>
  );
}

export default CountriesPage;
