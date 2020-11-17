import { configureStore } from '@reduxjs/toolkit';

import auth from './features/auth/authSlice';
import contacts from './features/contacts/contactsSlice';
import modals from './features/modals/modalsSlice';

const store = configureStore({
  reducer: {
    auth,
    contacts,
    modals,
  },
});

export default store;
