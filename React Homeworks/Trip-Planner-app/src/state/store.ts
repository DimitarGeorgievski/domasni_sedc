import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./slices/countries.slice";

const store = configureStore({
  reducer: {
    countries: countriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;