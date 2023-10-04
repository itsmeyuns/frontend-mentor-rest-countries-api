import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllCountries = createAsyncThunk(
  "countries/fetchAllCountries",
  async (_, thunkAPI) => {
    try {
      const response = await axios("https://restcountries.com/v3.1/all");
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCountryByCode = createAsyncThunk(
  "countries/getCountryByCode",
  async (code, thunkAPI) => {
    try {
      const response = await axios(
        `https://restcountries.com/v3.1/alpha/${code}`
      );
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCountryByRegion = createAsyncThunk(
  "countries/getCountryByRegion",
  async (region, thunkAPI) => {
    try {
      const response = await axios(
        `https://restcountries.com/v3.1/region/${region}`
      );

      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
