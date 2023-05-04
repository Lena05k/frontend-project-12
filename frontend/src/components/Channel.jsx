import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { setCurrentChannelId } from '../slices/userInterfaceSlice';

const Channel = ({ channel, showModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.ui);
  const { id, name, removable } = channel;

  const onClick = () => {
    dispatch(setCurrentChannelId(id));
  };

  const btnVariant = id === currentChannelId ? 'secondary' : 'light';

  const btnClass = cn(
    'w-100',
    'rounded-0',
    'text-start',
    'btn',
    'text-truncate',
  );

  const renderDropdown = () => (removable
    ? (
      <>
        <Dropdown.Toggle variant={btnVariant} className="flex-grow-0 dropdown-toggle-split">
          <span className="visually-hidden">{t('buttonNames.channelManagement')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => showModal('removing', channel)} eventKey="1">{t('buttonNames.delete')}</Dropdown.Item>
          <Dropdown.Item onClick={() => showModal('renaming', channel)} eventKey="2">{t('buttonNames.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </>

    )
    : null);

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="w-100">
        <Button variant={btnVariant} onClick={onClick} type="button" className={btnClass}>
          <span className="me-1">#</span>
          { name }
        </Button>
        {renderDropdown()}
      </Dropdown>
    </li>
  );
};

export default Channel;
