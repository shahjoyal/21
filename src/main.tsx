import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AdminApp } from './AdminApp.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import './index.css';

// The admin CMS lives behind an unlinked, hidden path — there is no button
// or nav link to it anywhere in the customer-facing app.
const isAdminRoute = window.location.pathname.startsWith('/admin-portal-x7k2');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdminRoute ? (
      <AdminApp />
    ) : (
      <AuthProvider>
        <App />
      </AuthProvider>
    )}
  </StrictMode>,
);
