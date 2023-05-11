import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { io } from 'socket.io-client';
import initChat from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const socket = io();
  root.render(await initChat(socket));
};

app();
