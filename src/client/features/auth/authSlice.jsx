/* eslint-disable no-param-reassign */
import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import Axios from 'axios';
import routes from '../../utils/routes';

const initialState = {
  isAuthenticated: !!localStorage.getItem('jwtToken'),
  error: null,
  jwtToken: localStorage.getItem('jwtToken'),
};

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

const todosSlice = createSlice({
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
      state.error = null;
    },
    [login.rejected]: (state, { payload }) => {
      state.isAuthenticated = false;
      state.jwtToken = null;
      state.error = payload;
    }
  },
});

export const {
  actions: actionsAuth
} = todosSlice;
export const asyncActionsAuth = { login };

export default todosSlice.reducer;

export const selectError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
// export const selectTodoIds = createSelector(
//   // First, pass one or more "input selector" functions:
//   selectTodos,
//   // Then, an "output selector" that receives all the input results as arguments
//   // and returns a final result value
//   (todos) => todos.map((todo) => todo.id)
// );
export const selectorsAuth = {
  selectError,
  selectIsAuthenticated,
};
