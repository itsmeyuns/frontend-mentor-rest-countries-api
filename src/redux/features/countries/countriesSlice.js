import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllCountries,
  getCountryByCode,
  getCountryByRegion,
} from "./countriesActions";

const initialState = {
  loading: false,
  countriesData: [],
  singleCountry: [],
  region: "",
  searchTerm: "",
  error: false,
  success: false,
  message: "",
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    reset: (state) => {
      state.countriesData = [];
      state.singleCountry = [];
      state.region = "";
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = "";
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCountries.fulfilled, (state, action) => {
      state.countriesData = action.payload;
      state.loading = false;
      state.error = false;
      state.message = "";
      state.success = true;
    });
    builder.addCase(fetchAllCountries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCountries.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
      state.countriesData = [];
    });

    builder.addCase(getCountryByCode.fulfilled, (state, action) => {
      state.singleCountry = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(getCountryByCode.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCountryByCode.rejected, (state, action) => {
      state.singleCountry = [];
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });

    builder.addCase(getCountryByRegion.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCountryByRegion.fulfilled, (state, action) => {
      state.countriesData = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(getCountryByRegion.rejected, (state, action) => {
      state.countriesData = [];
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const { reset, setRegion, setSearchTerm } = countriesSlice.actions;
export default countriesSlice.reducer;
