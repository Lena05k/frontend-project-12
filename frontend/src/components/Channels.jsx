import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors, actions } from '../slices/channelsSlice';
import { showModal, closeModal } from '../slices/modalSlice';
import { ReactComponent as PlusIcon } from '../assets/plus-icon.svg';
import Channel from './Channel';
import getModal from './modals/index.js';

const renderChannel = ({ channel, showModal }) => (
  <Channel key={channel.id} channel={channel} showModal={showModal} />
);

const renderModal = () => {
  const { type }  = useSelector((state) => state.modals);
  if (type === null) return null;

  const Modal = getModal(type);
  return <Modal />;
};



const Channels = (channel) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const handleClick = (id) => {
    dispatch(actions.setCurrentChannelId(id));
  };

  const setShowModal = (type, item = null) => dispatch(showModal({ type, item }));

  return (
    <>
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
          <span>{t('titles.channels')}</span>
          <Button
            variant="primary"
            type="button"
            className="p-0 text-primary bg-light border-0 btn-group-vertical"
            onClick={() => setShowModal('addChannel')}
          >
            <PlusIcon className="bg-light m-1" />
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <ul className="nav flex-column nav-pills nav-fill px-2">
          {channels.map((channel) => renderChannel({ channel, setShowModal }))}
        </ul>
      </div>
      {renderModal(() => dispatch(closeModal()))}
    </>
  );
};

export default Channels;
