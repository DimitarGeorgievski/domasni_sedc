import type { Country } from "../../models/countries.model";
import Button from "../Button/Button";
import "./PlannerItem.css";
import { useAppDispatch } from "../../utils/hooks";
import {
  addCountryDay,
  removeCountryDay,
  removeCountryFromTrip,
} from "../../state/slices/countries.slice";
import { toast } from "react-toastify";

interface PlannerItemProps {
  country: Country;
}

export function PlannerItem({ country }: PlannerItemProps) {
  const dispatch = useAppDispatch();
  return (
    <li className="PlannerItem">
      <strong>{country.name.common}</strong>
      <div className="days-wrapper">
        <Button
          disabled={country.days === 30}
          onBtnClick={() => {
            dispatch(addCountryDay(country));
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </Button>
        <div className="display">
          {country.days} Days
        </div>
        <Button
          disabled={country.days === 1}
          onBtnClick={() => {
            dispatch(removeCountryDay(country));
          }}
        >
          <i className="fa-solid fa-minus"></i>
        </Button>
        <Button
          onBtnClick={() => {
            toast.info("Product removed from Planner");
            dispatch(removeCountryFromTrip(country));
          }}
        >
          <i className="fa-solid fa-x"></i>
        </Button>
      </div>
    </li>
  );
}
