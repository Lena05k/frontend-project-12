import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './LoginPage';

const App = () => {
  return (
    <React.StrictMode>
      <Routes path="/">
        <Route path="login" element={<Login />} />
      </Routes>
    </React.StrictMode>
  )
};

export default App;
