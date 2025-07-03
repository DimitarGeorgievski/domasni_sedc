export interface AddTripPlanReq {
  name: string;
  email: string;
  budget: number;
  passport: number;
  comments: string;
  countries: Country[]
}

export interface Country{
    name: string;
    days: number;
}
