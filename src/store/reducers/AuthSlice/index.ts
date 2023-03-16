import { createSlice } from '@reduxjs/toolkit';
import { SignInUser } from './thunks';
import { Auth } from './types';


const initialState: Auth = {
  loading:false,
  success:'',
  error:''
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(SignInUser.pending, state => {
        state.loading = true;
        state.error = '';
        state.success = '';
      })
      .addCase(SignInUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = '';
        state.success = payload;
      })
      .addCase(SignInUser.rejected, (state, action) => {
        state.loading = false;
        state.success = '';
        if (action.error) {
          state.error = action.error.message;
        } else {
          state.error = 'Wrong username, password';
        }
      });
  },
  reducers: {
    clearState(state) {
      state.loading=false,
      state.success='',
      state.error=''
    },
  },
});

// // Action creators are generated for each case reducer function
export const { clearState } =
  authSlice.actions;
export default authSlice.reducer;
