import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './LoginPage';

function App() {
  return (
    <Routes path="/">
      <Route
        path="login"
        element={<Login />}>
      </Route>
    </Routes>
  );
};

export default App;
