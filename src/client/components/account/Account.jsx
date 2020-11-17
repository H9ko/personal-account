import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { actionsAuth, selectorsAuth } from '../../features/auth/authSlice';
import { actionsModals } from '../../features/modals/modalsSlice';
import ModalRoot from '../../features/modals/ModalRoot';
import {
  asyncActionsContacts,
  selectorContacts,
  actionsContacts,
} from '../contacts/contactsSlice';
import Contacts from '../contacts/Contacts';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useSelector(selectorContacts.selectSearchText);
  console.log('SearchBar -> searchText', searchText);
  return (
    <div className="flex-grow-1">
      <form className="form-inline d-flex justify-content-center md-form form-sm mt-0">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-search"
          fill="currentColor"
          xmlns="https://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
          />
          <path
            fillRule="evenodd"
            d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
          />
        </svg>
        <input
          className="form-control form-control-sm ml-3 w-75"
          type="text"
          placeholder="Найти по имени"
          aria-label="Search"
          onChange={(e) => {
            dispatch(
              actionsContacts.changeSearchText({ text: e.target.value })
            );
          }}
          text={searchText}
        />
      </form>
    </div>
  );
};

const Account = () => {
  const isAuthenticated = useSelector(selectorsAuth.selectIsAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncActionsContacts.getContacts());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(actionsModals.showModal({ modalType: 'ADD_CONTACT' }));
  };
  const handleLogOut = () => {
    dispatch(actionsAuth.logOut());
  };
  const history = useHistory();
  console.log('Account -> isAuthenticated', isAuthenticated);
  if (!isAuthenticated) {
    history.push('/');
  }
  return (
    <div>
      <div className="d-flex m-3 align-items-center">
        <Button onClick={handleAdd} type="button">
          Добавить новый контакт
        </Button>
        <SearchBar />
        <Button onClick={handleLogOut} type="button">
          Выйти
        </Button>
      </div>
      <Contacts />
      <ModalRoot />
    </div>
  );
};

export default Account;
