import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const fetchInitialData = createAsyncThunk(
  'fetchInitialData',
  async () => {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(
      routes.apiDataPath(),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
);

export default fetchInitialData;
