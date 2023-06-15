import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './modals/index';

const Modal = () => {
  const { type } = useSelector((state) => state.modalsSlice);
  if (type === null) return null;
  const CurrentModal = getModal(type);
  return <CurrentModal />;
};
export default Modal;
