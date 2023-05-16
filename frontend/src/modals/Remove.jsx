import React from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useApi } from '../hooks';
import { actions as channelsActions } from '../slices/channelsSlice';
import { setLoadingStatus, setCurrentChannelId } from '../slices/userInterfaceSlice';

const Remove = (props) => {
  const { t } = useTranslation();
  const { socket } = useApi();
  const dispatch = useDispatch();

  const { defaultChannelId } = useSelector((state) => state.ui);
  const { loadingStatus } = useSelector((state) => state.ui);
  const { onHide, modalInfo: { item } } = props;

  const onClickDeleteBtn = () => {
    dispatch(setLoadingStatus('loading'));
    socket.emit('removeChannel', { id: item.id }, () => {
      dispatch(setCurrentChannelId(defaultChannelId));
      dispatch(channelsActions.removeChannel(item.id));
      dispatch(setLoadingStatus('idle'));
      toast.success(t('socketMessages.successfulChannelRemove'));
    });
    onHide();
  };

  return (
    <Modal centered show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('remove.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={onHide} variant="secondary" className="me-2">
            {t('remove.cancelButton')}
          </Button>
          <Button onClick={onClickDeleteBtn} variant="danger" disabled={loadingStatus === 'loading'}>{t('buttonNames.delete')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
