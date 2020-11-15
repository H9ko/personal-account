import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import { actionsAuth } from '../../features/auth/authSlice';
import { asyncActionsContacts } from './contactsSlice';

const SearchBar = () => {
  const ff = '';
  return (
    <div>
      <form className="form-inline d-flex justify-content-center md-form form-sm mt-0">
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
          <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
        </svg>
        <input
          className="form-control form-control-sm ml-3 w-75"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
      </form>
    </div>

  );
};
const Contacts = () => {
  const jwt = '';
  const contacts = useSelector((state) => state.contacts);
  console.log('Contacts -> contacts', contacts);

  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Фото</th>
          <th scope="col">Имя</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Username</th>
        </tr>
      </thead>
      <tbody>
        {contacts && contacts.map(({
          id, name, email, avatar, phone
        }) => {
          const dd = '';
          return (
            <tr>
              <th scope="row">{id}</th>
              <td><img src={avatar} alt="avatar" width="50px" /></td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{phone}</td>
            </tr>
          );
        })}

      </tbody>
    </table>
  );
};

const Account = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    console.log('dispatch(asyncActionsContacts.getContacts());');
    dispatch(asyncActionsContacts.getContacts());
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(actionsAuth.logOut());
    history.push('/');
  };
  return (
    <div>
      <div className="d-flex">
        <SearchBar />
        <button type="button" className="btn btn-primary" onClick={handleLogOut}>LogOut</button>
      </div>
      
      <Contacts />
      
    </div>
  );
};

export default Account;
