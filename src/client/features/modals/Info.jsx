import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { selectorsModals, actionsModals } from './modalsSlice';

const Info = () => {
  const dispatch = useDispatch();
  const { message } = useSelector(selectorsModals.selectModalProps);
  const handleHide = () => {
    dispatch(actionsModals.hideModal());
  };

  const handleSubmit = () => {
    handleHide();
  };

  return (
    <Modal show onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
          <Button type="submit" className="btn btn-primary">
            OK
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Info;
