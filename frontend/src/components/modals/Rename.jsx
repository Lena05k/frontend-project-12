import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, Form, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useApi } from '../../hooks';
import { closeModal } from '../../slices/modalSlice';
import { actions, selectors } from '../../slices/channelsSlice';

const Rename = () => {
  const { t } = useTranslation();
  const api = useApi();
  const dispatch = useDispatch();
  const setCloseModal = () => dispatch(closeModal());
  const inputElement = useRef();

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  const channels = useSelector(selectors.selectAll);
  const channel = useSelector(({ modalsSlice }) => modalsSlice.item);
  const currentChannel = channels.filter((chanel) => chanel.id === channel);
  const channelNames = channels.map((chanel) => chanel.name);

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
    onSubmit: async () => {
      const { name } = formik.values;
      try {
        const data = await api.renameChannel({ id: channel.id, name });
        dispatch(actions.setCurrentChannelId(data));
        toast.success(t('socketMessages.successfulChannelRename'));
        setCloseModal();
      } catch (err) {
        toast.error(t('yup.errors.networkError'));
      }
    },
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
              ref={inputElement}
              id="name"
              name="name"
              type="text"
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.name || ''}
              isInvalid={formik.touched.name && formik.errors.name}
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
