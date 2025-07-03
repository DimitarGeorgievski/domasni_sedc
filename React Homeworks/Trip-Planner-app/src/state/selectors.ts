import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const selectCountriesInPlanner = createSelector(
  [(state: RootState) => state.countries.value],
  products => products.filter(product => product.inPlanner)
);