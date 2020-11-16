/* eslint-disable no-param-reassign */
import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import Axios from 'axios';
import faker from 'faker';
import { actionsModals } from '../../features/modals/modalsSlice';
import routes from '../../utils/routes';

const contactsAdapter = createEntityAdapter();

export const getContacts = createAsyncThunk(
  'contacts/get',
  async (userData, { getState, rejectWithValue }) => {
    const { jwtToken } = getState().auth;
    try {
      const response = await Axios.get(routes.contactsPath(), {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsAdapter.getInitialState({ searchText: '' }),
  reducers: {
    add: (state, { payload }) => {
      const { newUser } = payload;
      contactsAdapter.addOne(state, newUser);
    },
    remove: (state, { payload }) => {
      const { id } = payload;
      contactsAdapter.removeOne(state, id);
    },
    changeSearchText: (state, { payload }) => {
      const { text } = payload;
      state.searchText = text;
    },
  },
  extraReducers: {
    [getContacts.fulfilled]: (state, { payload }) => {
      contactsAdapter.setAll(state, payload);
    },
    [getContacts.rejected]: (state, { payload }) => {
      state.isAuthenticated = false;
      state.jwtToken = null;
      state.authError = payload;
    },
  },
});

export const removeContact = createAsyncThunk(
  'contacts/remove',
  async (userData, { dispatch, getState, rejectWithValue }) => {
    const { jwtToken } = getState().auth;
    const { id } = userData;
    console.log('userData', userData);

    try {
      const response = await Axios.delete(
        [routes.contactsPath(), id].join('/'),
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      console.log('response', response);
      dispatch(contactsSlice.actions.remove({ id }));
      // return response.data;
    } catch (err) {
      dispatch(actionsModals.showModal('INFO', err.response.data));
      // return rejectWithValue(err.response.data);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (userData, { dispatch, getState, rejectWithValue }) => {
    const { jwtToken } = getState().auth;
    const maxId = getState().contacts.ids.reduce((acc, id) =>
      id > acc ? id : acc
    );
    const { name, email, phone } = userData;
    const newUser = {
      id: maxId + 1,
      name,
      email,
      avatar: faker.internet.avatar(),
      phone,
    };
    console.log('userData', userData);

    try {
      const response = await Axios.post(routes.contactsPath(), newUser, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      dispatch(contactsSlice.actions.add({ newUser: response.data }));
      // return response.data;
    } catch (err) {
      dispatch(actionsModals.showModal('INFO', err.response.data));
      // return rejectWithValue(err.response.data);
    }
  }
);

export const { actions: actionsContacts } = contactsSlice;
export const asyncActionsContacts = { getContacts, removeContact, addContact };

export default contactsSlice.reducer;

const { selectAll } = contactsAdapter.getSelectors((state) => state.contacts);
const selectSearchText = (state) => state.contacts.searchText;

const filteredContacts = createSelector(
  selectAll,
  selectSearchText,
  (contacts, searchText) =>
    contacts.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    )
);

export const selectorContacts = {
  selectContacts: filteredContacts,
  selectSearchText,
};
