import ReactDOM from 'react-dom/client';
import Init from './init';
import 'bootstrap/dist/css/bootstrap.min.css';


const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await Init());
};

app();
