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
import { selectors as channelsSelectors, actions } from '../../slices/channelsSlice';

const Add = () => {
  const { t } = useTranslation();
  const api = useApi();
  const dispatch = useDispatch();
  const inputElement = useRef();
  const setCloseModal = () => dispatch(closeModal());
  const channels = useSelector(channelsSelectors.selectAll);
  const channelNames = channels.map((channel) => channel.name);
  const { loadingStatus } = useSelector((state) => state.ui);

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
      name: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: ({ name }) => {
      try {
        const data = api.createChannel({ name, changeable: true });
        dispatch(actions.setCurrentChannel(data.id));
        setCloseModal();
        toast.success(t('socketMessages.successfulChannelCreation'));
      } catch (error) {
        toast.error(t('socketMessages.failedDataLoading'));
      }
    },
  });

  const nameFieldClass = cn('mb-2', {
    'is-invalid': formik.errors.name,
  });

  return (
    <Modal centered show onHide={setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('add.title')}</Modal.Title>
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
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('add.label')}</Form.Label>
            <div className="invalid-feedback">{formik.errors.name}</div>
            <div className="d-flex justify-content-end">
              <Button onClick={setCloseModal} variant="secondary" className="me-2">
                {t('add.cancelButton')}
              </Button>
              <Button disabled={loadingStatus === 'loading'} type="submit">{t('add.submitButton')}</Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
