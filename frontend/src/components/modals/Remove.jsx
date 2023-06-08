import React from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../hooks';
import { closeModal } from '../../slices/modalSlice';
import { actions } from '../../slices/channelsSlice';

const Remove = () => {
  const { t } = useTranslation();
  const api = useApi();
  const dispatch = useDispatch();
  const removeId = useSelector(({ modalsSlice }) => modalsSlice.id);

  const setCloseModal = () => dispatch(closeModal());

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = api.removeChannel(removeId);
      dispatch(actions.setCurrentChannelId(data.id));
      toast.success(t('socketMessages.successfulChannelRemove'));
      setCloseModal();
    } catch (error) {
      toast.error(t('socketMessages.failedDataLoading'));
    }
  };

  return (
    <Modal centered show onHide={setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <p className="lead">{t('remove.confirm')}</p>
          <div className="d-flex justify-content-end">
            <Button onClick={setCloseModal} variant="secondary" className="me-2">
              {t('remove.cancelButton')}
            </Button>
            <Button type="submit" variant="danger">{t('buttonNames.delete')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
