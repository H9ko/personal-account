import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { unwrapResult } from '@reduxjs/toolkit';
import { selectorsModals, actionsModals } from './modalsSlice';
import { asyncActionsContacts } from '../../components/contacts/contactsSlice';

const RemoveContact = () => {
  const dispatch = useDispatch();
  const id = useSelector(selectorsModals.selectModalProps);
  const handleHide = () => {
    dispatch(actionsModals.hideModal());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        asyncActionsContacts.removeContact({ id })
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
    <Modal show onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Button type="submit" className="btn btn-primary">
            Confirm remove contact
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveContact;
