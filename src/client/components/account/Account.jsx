import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { actionsAuth } from '../../features/auth/authSlice';
import { actionsModals } from '../../features/modals/modalsSlice';
import ModalRoot from '../../features/modals/ModalRoot';
import { asyncActionsContacts } from './contactsSlice';

const SearchBar = () => {
  const ff = '';
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
          placeholder="Search"
          aria-label="Search"
        />
      </form>
    </div>
  );
};
const Actions = ({ id }) => {
  const dd = '';
  const dispatch = useDispatch();
  const handleRemoveContact = (id) => () => {
    dispatch(
      actionsModals.showModal({ modalType: 'REMOVE_CONTACT', modalProps: id })
    );
  };
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <Button>
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-pen"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
          />
        </svg>
      </Button>
      <Button onClick={handleRemoveContact(id)}>
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-trash"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path
            fillRule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </Button>
    </div>
  );
};
const Contacts = () => {
  const jwt = '';
  const contacts = useSelector((state) => state.contacts);
  console.log('Contacts -> contacts', contacts);
  return (
    <table className="table table-hover">
      <thead className="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Фото</th>
          <th scope="col">Имя</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Username</th>
          <th scope="col">buttons</th>
        </tr>
      </thead>
      <tbody>
        {contacts &&
          contacts.map(({ id, name, email, avatar, phone }) => {
            const dd = '';
            return (
              <tr key={id} valign="center">
                <th className="align-middle" scope="row">
                  {id}
                </th>
                <td className="align-middle">
                  <img
                    src={avatar}
                    className="rounded"
                    alt="avatar"
                    width="35px"
                  />
                </td>
                <td className="align-middle">{name}</td>
                <td className="align-middle">{email}</td>
                <td className="align-middle">{phone}</td>
                <td className="align-middle">
                  <Actions id={id} />
                </td>
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLogOut}
        >
          LogOut
        </button>
      </div>
      <Contacts />
      <ModalRoot />
    </div>
  );
};

export default Account;
