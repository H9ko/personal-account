/* eslint-disable no-param-reassign */
import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import Axios from 'axios';
import routes from '../../utils/routes';

const initialState = [];

export const getContacts = createAsyncThunk(
  'contacts/get',
  async (userData, { getState, rejectWithValue }) => {
    const { jwtToken } = getState().auth;
    try {
      const response = await Axios.get('https://localhost:8080/api/contacts', { headers: { Authorization: `Bearer ${jwtToken}` } });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getContacts.fulfilled]: (state, { payload }) => {
      const ff="";
      return payload;
    },
    [getContacts.rejected]: (state, { payload }) => {
      state.isAuthenticated = false;
      state.jwtToken = null;
      state.authError = payload;
    },
  },
});

// export const {
//   actions: actionsAuth
// } = contactsSlice;
export const asyncActionsContacts = { getContacts };

export default contactsSlice.reducer;

// export const selectAuthError = (state) => state.contacts.authError;
// export const selectRegistrationError = (state) => state.contacts.registationError;
// export const selectIsAuthenticated = (state) => state.contacts.isAuthenticated;
// // export const selectTodoIds = createSelector(
// //   // First, pass one or more "input selector" functions:
// //   selectTodos,
// //   // Then, an "output selector" that receives all the input results as arguments
// //   // and returns a final result value
// //   (todos) => todos.map((todo) => todo.id)
// // );
// export const selectorsAuth = {
//   selectAuthError,
//   selectRegistrationError,
//   selectIsAuthenticated,
// };
