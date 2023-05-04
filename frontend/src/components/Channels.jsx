import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { ReactComponent as PlusIcon } from '../images/plus-icon.svg';
import Channel from './Channel';
import getModal from '../modals/index.js';

const renderChannel = ({ channel, showModal }) => (
  <Channel key={channel.id} channel={channel} showModal={showModal} />
);

const renderModal = (({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Modal = getModal(modalInfo.type);
  return <Modal modalInfo={modalInfo} onHide={hideModal} />;
});

const Channels = () => {
  const { t } = useTranslation();
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  const channels = useSelector(channelsSelectors.selectAll);

  return (
    <>
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
          <span>{t('titles.channels')}</span>
          <Button
            variant="primary"
            type="button"
            className="p-0 text-primary bg-light border-0 btn-group-vertical"
            onClick={() => showModal('adding')}
          >
            <PlusIcon className="bg-light m-1" />
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <ul className="nav flex-column nav-pills nav-fill px-2">
          {channels.map((channel) => renderChannel({ channel, showModal }))}
        </ul>
      </div>

      {renderModal({ modalInfo, hideModal })}
    </>
  );
};

export default Channels;
