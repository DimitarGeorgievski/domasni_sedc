import { useNavigate } from "react-router-dom";
import { selectCountriesInPlanner } from "../../state/selectors";
import { useAppSelector } from "../../utils/hooks";
import Button from "../Button/Button";
import { PlannerItem } from "../PlannerItem/PlannerItem";
import "./PlannerList.css";

export function PlannerList() {
  const navigate = useNavigate()
  const plannerCountries = useAppSelector(selectCountriesInPlanner);
  return (
    <>
      {plannerCountries.length > 0 ? (
        <div className="PlannerList">
            <ol>
                {plannerCountries.map((country) => (
                    <PlannerItem key={country.name.common} country={country}/>
                ))}
            </ol>
            <div className="createTripBtn">
              <Button onBtnClick={() => {
              navigate("/create-trip")
            }}>Create Trip</Button>
            </div>
        </div>
      ) : (
        <h3 className="Planner-heading">No products in planner</h3>
      )}
    </>
  );
}
