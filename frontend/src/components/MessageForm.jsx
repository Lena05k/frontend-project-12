import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useApi, useAuth } from '../hooks';
import ArrowRightIcon from '../assets/arrow-right-icon.svg';

const MessageForm = () => {
  const { t } = useTranslation();
  const api = useApi();
  const inputRef = useRef();
  const { user: { username } } = useAuth();
  const { currentChannelId } = useSelector((state) => state.channels);

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const { message } = values;
      const body = leoProfanity.clean(message);

      try {
        await api.addNewMessage({ body, channelId: currentChannelId, username });
        resetForm();
      } catch {
        toast.error(t('yup.errors.networkError'));
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            name="message"
            id="message"
            aria-label={t('forms.newMessage.ariaLabel')}
            placeholder={t('forms.newMessage.placeholder')}
            className="border-0 p-0 ps-2 form-control"
            onChange={formik.handleChange}
            value={formik.values.message}
            disabled={formik.isSubmitting}
            ref={inputRef}
          />
          <button type="submit" disabled={formik.isSubmitting} className="btn btn-group-vertical border-0">
            <span className="visually-hidden">{t('buttonNames.send')}</span>
            <img src={ArrowRightIcon} alt="arrow right icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
