import { createSlice } from "@reduxjs/toolkit";
import { LoaderType } from "./types";

const initialState: LoaderType =  {
  isPreloader: false,
  counter:0
}
const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setPreloader: (state, action) => {
      state.isPreloader = action.payload;
    },
    setCounter: (state, {payload}) => {
      state.counter = payload;
    },
    clearStore(state){
    }
  },
});

export const { setPreloader, setCounter,clearStore } = loaderSlice.actions;

export default loaderSlice.reducer;

