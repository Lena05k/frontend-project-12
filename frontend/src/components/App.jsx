import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './ChatPage';
import LoginForm from './LoginPage';
import ErrorPage from './ErrorPath'

const App = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
);

export default App;
