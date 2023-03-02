import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import App from './components/App';
import Login from './components/LoginPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={router}>
      <App />
  </Provider>
);

