import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { unwrapResult } from '@reduxjs/toolkit';
import { selectorsModals, actionsModals } from './modalsSlice';
import { asyncActionsContacts } from '../../components/contacts/contactsSlice';

const AddContact = () => {
  const dispatch = useDispatch();
  // const id = useSelector(selectorsModals.selectModalProps);
  const handleHide = () => {
    dispatch(actionsModals.hideModal());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        asyncActionsContacts.addContact({
          name: 'vov',
          email: 'eee',
          phone: '123',
        })
      );
      unwrapResult(resultAction);
      handleHide();
    } catch ({ message }) {
      dispatch(
        actionsModals.showModal({
          modalType: 'INFO',
          modalProps: { message },
        })
      );
    }
  };
  return (
    <Modal show onHide={handleHide} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>Add contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Фамилия</th>
                <th scope="col">Телефон</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Form.Control id="name" placeholder="Enter name..." />
                </td>
                <td>
                  <Form.Control id="email" placeholder="Enter email..." />
                </td>
                <td>
                  <Form.Control id="phone" placeholder="Enter phone..." />
                </td>
                <td>
                  <Button type="submit">Добавить</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddContact;
