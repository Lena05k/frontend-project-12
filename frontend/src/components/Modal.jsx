import React from 'react';
import { useSelector } from 'react-redux';
import { Modal as ModalComponent } from 'react-bootstrap';
import getModal from './modals/index';

const Modal = () => {
  const { type } = useSelector((state) => state.modalsSlice);
  const modalShow = !!type;

  if (!type) {
    return null;
  }
  const Component = getModal(type);
  console.log('type:', type);

  return (
    <ModalComponent show={modalShow} centered>
      <Component />
    </ModalComponent>
  );
};
export default Modal;
