import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
