import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { actions } from '../slices/channelsSlice';
import { showModal } from '../slices/modalSlice';

const Channel = ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.channels);
  const { id, name, removable } = channel;

  const onClick = () => {
    dispatch(actions.setCurrentChannelId(id));
  };

  const setShowModal = (type, item = null) => dispatch(showModal({ type, item }));

  const onDelete = (e) => {
    e.preventDefault();
    setShowModal('removing', channel);
  };

  const onRename = (e) => {
    e.preventDefault();
    setShowModal('renaming', channel);
  };

  const btnVariant = id === currentChannelId ? 'secondary' : 'light';

  const renderDropdown = () => (removable
    ? (
      <>
        <Dropdown.Toggle variant={btnVariant} className="flex-grow-0 dropdown-toggle-split">
          <span className="visually-hidden">{t('buttonNames.channelManagement')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={onDelete} eventKey="1">{t('buttonNames.delete')}</Dropdown.Item>
          <Dropdown.Item onClick={onRename} eventKey="2">{t('buttonNames.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </>

    )
    : null);

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="w-100">
        <Button variant={btnVariant} onClick={onClick} type="button" className="w-100 rounded-0 text-start text-truncate btn">
          <span className="me-1">#</span>
          { name }
        </Button>
        {renderDropdown()}
      </Dropdown>
    </li>
  );
};

export default Channel;
