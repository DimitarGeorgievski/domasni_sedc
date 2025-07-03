import { toast } from "react-toastify";
import type { Country } from "../../models/countries.model";
import Button from "../Button/Button";
import "./CountryCard.css";
import { useAppDispatch } from "../../utils/hooks";
import { addCountryToTrip } from "../../state/slices/countries.slice";

interface CountryCardProps {
  Country: Country;
}

function CountryCard({ Country }: CountryCardProps) {
  const dispatch = useAppDispatch();
  return (
    <article
      className="card"
      style={{
        border: Country.landlocked
          ? "3px solid lightgreen"
          : "3px solid lightblue",
      }}
    >
      <div className="flag">
        <img src={Country.flags.png} alt={Country.flags.alt} />
      </div>
      <h1>{Country.name.common}</h1>
      <div className="wrapper">
        <div className="wrapper-text">
          <p>Population:</p>
          <p>Area:</p>
          <p>Capital:</p>
        </div>
        <div className="wrapper-info">
          <p>{Country.population}</p>
          <p>{Country.area}</p>
          <p>{Country.capital}</p>
          <Button
            disabled={Country.inPlanner}
            onBtnClick={() => {
              toast.info("Product successfully added to TripPlanner");
              dispatch(addCountryToTrip(Country))
            }}
          >
            {Country.inPlanner ? (
            "ADDED"
          ) : (
            <i className="fa-solid fa-plane"></i>
          )}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default CountryCard;
