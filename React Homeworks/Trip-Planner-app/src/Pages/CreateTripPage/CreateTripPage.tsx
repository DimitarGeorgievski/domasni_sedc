import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { selectCountriesInPlanner } from "../../state/selectors";
import type { AddTripPlanReq } from "../../models/TripPlan.model";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  loadPlannerFromLocalStorage,
  saveCartInLocalStorage,
} from "../../services/data.service";
import { CreateTripForm } from "../../Components/CreateTripForm/CreateTripForm";
import type { Country } from "../../models/countries.model";
import type { Country as simpleCountry } from "../../models/TripPlan.model";
import { resetPlanner } from "../../state/slices/countries.slice";

export interface CreateTripFormValues {
  name: string;
  email: string;
  budget: number;
  passport: number;
  comments: string;
}
export function CreateTripPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const createTripForm = useForm<CreateTripFormValues>({
    defaultValues: {
      budget: 1,
      comments: "",
      email: "",
      name: "",
      passport: 1,
    },
  });
  const plannerCountries: Country[] = useAppSelector(selectCountriesInPlanner);
  const onCreateTripSubmit = () => {
    if (!createTripForm.formState.isValid) return;
    const { budget, comments, email, name, passport } =
      createTripForm.getValues();
    const simpleCountries: simpleCountry[] = plannerCountries.map(
      (country) => ({
        name: country.name.common,
        days: country.days,
      })
    );
    const addTripPlanReq: AddTripPlanReq = {
      name,
      budget,
      comments,
      email,
      passport,
      countries: simpleCountries
    };
    postNewTripPlan(addTripPlanReq);
  };
  const postNewTripPlan = async (body: AddTripPlanReq) => {
    try {
      const trips = loadPlannerFromLocalStorage();
      trips.push(body);
      saveCartInLocalStorage(trips);
      toast.success("Trip Successfully Created");
      dispatch(resetPlanner())
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while creating Trip");
    }
  };
  return (
      <CreateTripForm onSubmit={onCreateTripSubmit} form={createTripForm} />
  );
}
