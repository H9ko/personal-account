/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import { getContacts } from '../contacts/contactsSlice';
import routes from '../../utils/routes';

const initialState = {
  isAuthenticated: localStorage.getItem('jwtToken') !== 'null',
  authError: null,
  registrationError: null,
  jwtToken: localStorage.getItem('jwtToken'),
};

export const registation = createAsyncThunk(
  'auth/registration',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Axios.post(routes.registerPath(), userData);
      const { accessToken } = response.data;
      localStorage.setItem('jwtToken', accessToken);
      return accessToken;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Axios.post(routes.signinPath(), userData);
      const { accessToken } = response.data;
      localStorage.setItem('jwtToken', accessToken);
      return accessToken;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      const accessToken = null;
      localStorage.setItem('jwtToken', accessToken);
      state.isAuthenticated = false;
      state.jwtToken = accessToken;
      state.error = null;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      const accessToken = payload;
      state.isAuthenticated = true;
      state.jwtToken = accessToken;
      state.authError = null;
    },
    [login.rejected]: (state, { payload }) => {
      state.isAuthenticated = false;
      state.jwtToken = null;
      state.authError = payload;
    },
    [registation.fulfilled]: (state, { payload }) => {
      const accessToken = payload;
      state.isAuthenticated = true;
      state.jwtToken = accessToken;
      state.registationError = null;
    },
    [registation.rejected]: (state, { payload }) => {
      state.isAuthenticated = false;
      state.jwtToken = null;
      state.registationError = payload;
    },
    [getContacts.rejected]: (state, { payload }) => {
      state.isAuthenticated = false;
      state.jwtToken = null;
      state.authError = payload;
    },
  },
});

export const { actions: actionsAuth } = authSlice;
export const asyncActionsAuth = { login, registation };

export default authSlice.reducer;

export const selectAuthError = (state) => state.auth.authError;
export const selectRegistrationError = (state) => state.auth.registationError;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectorsAuth = {
  selectAuthError,
  selectRegistrationError,
  selectIsAuthenticated,
};
