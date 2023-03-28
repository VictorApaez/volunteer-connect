import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    addUser: (state, action) => {
      state = action.payload;
    },
    deleteUser: (state, action) => {
      return null;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userReducer = userSlice.reducer;
