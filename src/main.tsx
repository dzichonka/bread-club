import './main.css';
import './styles/style.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
