import type { Country } from "../../models/countries.model";
import "./CountryCard.css";

interface CountryCardProps {
  Country: Country;
}

function CountryCard({ Country }: CountryCardProps) {
  return (
    <article className="card">
      <h1>{Country.country}</h1>
      <div className="wrapper">
        <ul className="cities">
          <h2>Cities</h2>
          {Country.cities.map((city, i) => (
            <li key={i}>{city}</li>
          ))}
        </ul>
        <ul className="destinations">
          <h2>Destinations</h2>
          {Country.destinations.map((destination, i) => (
            <li key={i}>{destination}</li>
          ))}
        </ul>
        <ul>
            <h2>Population</h2>
            <li><p>{Country.population}</p></li>
        </ul>
      </div>
    </article>
  );
}

export default CountryCard;
