/* eslint-disable no-param-reassign */
import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import Axios from 'axios';
import routes from '../../utils/routes';

const initialState = {
  isAuthenticated: false,
  error: null,
  jwtToken: null,
};

// Thunk functions

export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await Axios.post(routes.signinPath(), userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const todosSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      state.isAuthenticated = true;
      state.jwtToken = payload.accessToken;
      state.error = null;
    },
    [login.rejected]: (state, { payload }) => {
      state.isAuthenticated = false;
      state.jwtToken = null;
      state.error = payload;
    }
  },
});

// export const {
// } = todosSlice.actions;

export default todosSlice.reducer;

export const selectAuthError = (state) => state.auth.error;
// export const selectTodoIds = createSelector(
//   // First, pass one or more "input selector" functions:
//   selectTodos,
//   // Then, an "output selector" that receives all the input results as arguments
//   // and returns a final result value
//   (todos) => todos.map((todo) => todo.id)
// );
