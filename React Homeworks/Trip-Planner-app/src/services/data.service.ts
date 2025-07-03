import type { AddTripPlanReq } from "../models/TripPlan.model";

export const saveCartInLocalStorage = (Countries: AddTripPlanReq[]) => {
    const countryJSON = JSON.stringify(Countries);
    localStorage.setItem("Planner", countryJSON);
}

export const loadPlannerFromLocalStorage= (): AddTripPlanReq[] => {
    const countryJSON = localStorage.getItem("Planner");
    if(!countryJSON) return [];
    return JSON.parse(countryJSON)
}