import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { actionsModals } from './modalsSlice';
import { asyncActionsContacts } from '../contacts/contactsSlice';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string().min(3).required('Required'),
  phone: Yup.string().min(3).required('Required'),
});

const AddContact = () => {
  const dispatch = useDispatch();
  const handleHide = () => {
    dispatch(actionsModals.hideModal());
  };

  const f = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(
          asyncActionsContacts.addContact(values)
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
    },
  });

  return (
    <Modal show onHide={handleHide} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>Add contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Email</th>
                <th scope="col">Телефон</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Form.Control
                    onChange={f.handleChange}
                    value={f.values.name}
                    isInvalid={!!f.errors.name}
                    id="name"
                    placeholder="Enter name..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {f.errors.name}
                  </Form.Control.Feedback>
                </td>
                <td>
                  <Form.Control
                    onChange={f.handleChange}
                    value={f.values.email}
                    isInvalid={!!f.errors.email}
                    id="email"
                    placeholder="Enter email..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {f.errors.email}
                  </Form.Control.Feedback>
                </td>
                <td>
                  <Form.Control
                    onChange={f.handleChange}
                    value={f.values.phone}
                    isInvalid={!!f.errors.phone}
                    id="phone"
                    placeholder="Enter phone..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {f.errors.phone}
                  </Form.Control.Feedback>
                </td>
                <td>
                  <Button disabled={f.errors.body} type="submit">
                    Добавить
                  </Button>
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
