import "./CountriesPage.css";
import CountryCard from "../../Components/CountryCard/CountryCard";
import countriesData from "../../data/countries.json";

interface CountriesPageProps{
  selectedContinent: string;
}

function CountriesPage({selectedContinent}: CountriesPageProps) { 
  return (
    <section className="countries">
      {countriesData
      .filter(country => country.continent === selectedContinent)
      .map((country) => (
        <CountryCard key={country.country} Country={country} />
      ))}
    </section>
  );
}

export default CountriesPage;
