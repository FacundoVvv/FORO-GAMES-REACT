import ReactDOM from 'react-dom/client';
import { createDOMRoot } from '@Types/Dom';
import { App } from './App';
import { AuthProvider } from '@Contexts/Auth_context';
import { SocketProvider } from '@Contexts/Socket_context';
import './index.css';
import { Toaster } from 'react-hot-toast';

const root = createDOMRoot({
  rootSelector: '#root',
  errorMessage: 'Root element required to start the application',
});

ReactDOM.createRoot(root).render(
  // <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <Toaster position="top-right" />
        <App />
      </SocketProvider>
    </AuthProvider>
  // </React.StrictMode>
);