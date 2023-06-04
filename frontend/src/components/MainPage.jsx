import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth } from '../hooks';
import routes from '../routes';
import Channels from './Channels';
import Messages from './Messages';
import fetchInitialData from '../slices/fetchInitialData';
import { actions } from '../slices/channelsSlice';
import { addMessages } from '../slices/messagesSlice';
import { AuthContext } from '../contexts';

import MessageForm from './MessageForm';

const MainPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch();
  const headers = auth.getAuthHeader();
  const { addChannels, setCurrentChannelId } = actions;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.apiDataPath(), { headers });
        const { channels, messages, currentChannelId } = data || {};
        dispatch(addChannels(channels));
        dispatch(setCurrentChannelId(currentChannelId));
        dispatch(addMessages(messages));
      } catch (error) {
        toast.error(t('socketMessages.failedDataLoading'));
        console.error(error);
      }
    };
    if (fetchInitialData) {
      fetchData();
    }
  }, [dispatch, t, fetchInitialData]);


  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Messages />
            <MessageForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
