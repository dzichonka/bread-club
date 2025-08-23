import './main.css';
import './styles/style.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './components/App/App';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: QueryClient;
  }
}

const queryClient = new QueryClient();
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
