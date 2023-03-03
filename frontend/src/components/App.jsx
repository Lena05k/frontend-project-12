import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './LoginPage';
import ChatPage from './ChatPage'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
