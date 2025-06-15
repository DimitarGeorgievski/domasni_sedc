import "./CountriesPage.css";
import type { Country } from "../../models/countries.model";
import CountryCard from "../../Components/CountryCard/CountryCard";
import countriesData from "../../data/countries.json";
import { useState } from "react";

interface CountriesPageProps{
  selectedContinent: string;
}

function CountriesPage({selectedContinent}: CountriesPageProps) {
    const [countries, setCountries] = useState<Country[]>(countriesData)
  
  return (
    <section className="countries">
      {countries
      .filter(country => country.continent === selectedContinent)
      .map((country) => (
        <CountryCard key={country.country} Country={country} />
      ))}
    </section>
  );
}

export default CountriesPage;
