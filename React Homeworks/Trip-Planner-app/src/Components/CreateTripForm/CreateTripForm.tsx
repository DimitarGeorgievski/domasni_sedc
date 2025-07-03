import type { UseFormReturn } from "react-hook-form";
import "./CreateTripForm.css";
import type { CreateTripFormValues } from "../../Pages/CreateTripPage/CreateTripPage";
import Button from "../Button/Button";

interface CreateTripFormProps {
  form: UseFormReturn<CreateTripFormValues>;
  onSubmit: () => void;
}

export function CreateTripForm({ form,onSubmit }: CreateTripFormProps) {
  const {
    register,
    formState: { isValid, isDirty },
    handleSubmit
  } = form;
  return (
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Passenger Name</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="budget">Budget</label>
          <input
            type="number"
            id="budget"
            {...register("budget", { required: true, min: 1 })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passport">Passport Number</label>
          <input
            type="text"
            id="passport"
            {...register("passport", { required: true, minLength:5 })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments</label>
          <input
            type="text"
            id="comments"
            {...register("comments", { required: true, maxLength: 300 })}
          />
        </div>
        {!isValid && isDirty && (
          <div className="form-error">All fields are required</div>
        )}
        <Button style={{marginTop: "10px"}} disabled={!isValid} onBtnClick={() => {

        }}>Submit</Button>
      </form>
  );
}
