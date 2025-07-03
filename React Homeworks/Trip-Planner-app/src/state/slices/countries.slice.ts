import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Country } from "../../models/countries.model";
import { httpService } from "../../services/http.service";

interface CountriesState {
  value: Country[];
  isLoading: boolean;
}

const initialState: CountriesState = {
  isLoading: false,
  value: [],
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    try {
      const { data } = await httpService.get(
        "/all?fields=name,capital,region,area,flags,population,landlocked"
      );
      return data.map((country: Country) => ({
        ...country,
        inPlanner: false,
        days: 0,
      }));
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    addCountryToTrip(
      state,
      { payload: selectedCountry }: PayloadAction<Country>
    ) {
      for (const country of state.value) {
        if (country.name.common === selectedCountry.name.common) {
          country.inPlanner = true;
          country.days = 1;
        }
      }
    },
    removeCountryFromTrip(
      state,
      { payload: selectedCountry }: PayloadAction<Country>
    ) {
      for (const country of state.value) {
        if (country.name.common === selectedCountry.name.common) {
          country.inPlanner = false;
          country.days = 0;
        }
      }
    },
    addCountryDay(state, {payload: selectedCountry}: PayloadAction<Country>){
     for(const country of state.value){
      if(country.name.common === selectedCountry.name.common){
        country.days++;
        break;
      }
     } 
    },
    removeCountryDay(state, {payload: selectedCountry}: PayloadAction<Country>){
     for(const country of state.value){
      if(country.name.common === selectedCountry.name.common){
        country.days--;
        break;
      }
     } 
    },
    resetPlanner(state) {
      for (const country of state.value) {
        country.days = 0;
        country.inPlanner = false;
      }
    },
    setupLocalStoragePlanner(state, {payload: plannerCountries}: PayloadAction<Country[]>){
      plannerCountries.forEach(plannerCountry => {
        for(const country of state.value){
          if(plannerCountry.name.common === country.name.common){
            country.inPlanner = plannerCountry.inPlanner;
            country.days = plannerCountry.days;
            break;
          }
        }
      })
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<CountriesState>) => {
    builder.addCase(fetchCountries.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCountries.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setupLocalStoragePlanner,resetPlanner,addCountryToTrip,addCountryDay,removeCountryDay,removeCountryFromTrip } = countriesSlice.actions;

export default countriesSlice;
