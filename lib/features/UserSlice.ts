import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  fullName: string;
  email:string
  phone: string;
  role: "user" | "author" | undefined;
}

const initialState: UserState = {
  id: "",
  fullName: "",
  email:"",
  phone: "",
  role: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
    },
    clearUser: (state) => {
      state.id = ""
      state.fullName = "";
      state.email = "";
      state.phone = "";
      state.role = undefined;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;