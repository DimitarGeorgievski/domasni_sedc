import "./CountriesPage.css";
import CountryCard from "../../Components/CountryCard/CountryCard";
import countriesData from "../../data/countries.json";

interface CountriesPageProps{
  selectedContinent: string;
}

function CountriesPage({selectedContinent}: CountriesPageProps) { 
  const filterCountries = selectedContinent ? countriesData.filter(country => country.continent === selectedContinent) : countriesData;
  return (
    <section className="countries">
      {filterCountries
      .map((country) => (
        <CountryCard key={country.country} Country={country} />
      ))}
    </section>
  );
}

export default CountriesPage;
