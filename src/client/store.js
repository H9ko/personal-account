import { configureStore } from '@reduxjs/toolkit';

import auth from './features/auth/authSlice';
import contacts from './components/account/contactsSlice';

const store = configureStore({
  reducer: {
    auth,
    contacts,
  },
});

export default store;
