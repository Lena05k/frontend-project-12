/* eslint func-names: 0, prefer-arrow-callback: 0, functional/no-this-expression: 0 */
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, Form, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import cn from 'classnames';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useApi } from '../../hooks';
import { closeModal } from '../../slices/modalSlice';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';

const Rename = () => {
  const { t } = useTranslation();
  const api = useApi();
  const dispatch = useDispatch();
  const inputElement = useRef();
  const setCloseModal = () => dispatch(closeModal());
  const channels = useSelector(channelsSelectors.selectAll);
  const currentRenameId = useSelector(({ modalsSlice }) => modalsSlice.id);
  const [currentChannel] = channels.filter((channel) => channel.id === currentRenameId);
  const channelNames = channels.map((channel) => channel.name);

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string()
      .required(t('yup.errors.required'))
      .min(3, t('yup.errors.channelNameLength'))
      .max(20, t('yup.errors.channelNameLength'))
      .notOneOf(channelNames, t('yup.errors.uniqName')),
  });

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async ({ name }) => {
      try {
        await api.renameChannel({ id: currentRenameId, name });
        toast.success(t('socketMessages.successfulChannelRename'));
        setCloseModal();
      } catch (err) {
        toast.error(t('yup.errors.networkError'));
      }
    },
  });

  const nameFieldClass = cn('mb-2', {
    'is-invalid': formik.errors.name,
  });

  return (
    <Modal centered show onHide={setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className={nameFieldClass}
              ref={inputElement}
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              data-testid="input-body"
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('rename.label')}</Form.Label>
            <div className="invalid-feedback">{formik.errors.name}</div>
            <div className="d-flex justify-content-end">
              <Button onClick={setCloseModal} variant="secondary" className="me-2">{t('rename.cancelButton')}</Button>
              <Button type="submit" variant="primary">{t('rename.submitButton')}</Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;