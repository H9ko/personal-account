import React from 'react';
import { useSelector } from 'react-redux';
import AddContact from './AddContact';
import EditContact from './EditContact';
import Info from './Info';
// import AddChannel from './modals/AddChannel';
import { selectorsModals } from './modalsSlice';
// import RenameChannel from './modals/RenameChannel';
import RemoveContact from './RemoveContact';
// import InfoChannel from './modals/InfoChannel';

const MODAL_COMPONENTS = {
  REMOVE_CONTACT: RemoveContact,
  INFO: Info,
  ADD_CONTACT: AddContact,
  EDIT_CONTACT: EditContact,
  /* other modals */
};

const ModalRoot = () => {
  const curModalType = useSelector(selectorsModals.selectModalType);
  if (!curModalType) {
    return null;
  }
  const SpecificModal = MODAL_COMPONENTS[curModalType];
  return <SpecificModal />;
};
export default ModalRoot;
