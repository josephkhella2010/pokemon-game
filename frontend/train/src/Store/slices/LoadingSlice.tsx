import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  isLoading: boolean;
  error: string | null;
}

const initialState: initialStateType = {
  isLoading: false,
  error: null,
};

const LoadingSlice = createSlice({
  name: "LoadingSlice",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setClearLoading: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setLoading,setError,setClearLoading } = LoadingSlice.actions;

export default LoadingSlice.reducer;
