import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action) => {
      const { email, username, password } = action.payload;
      const user = { email, username, password };
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
      state.isAuthenticated = true;
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        state.user = storedUser;
        state.isAuthenticated = true;
      } else {
        alert("Invalid email or password");
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateProfile: (state, action) => {
      const updatedProfile = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(updatedProfile));
      state.user = updatedProfile;
    }
  },
});

export const { signup, login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
