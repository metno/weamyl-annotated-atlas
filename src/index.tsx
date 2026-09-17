import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/main/App';
import { AuthProvider } from 'react-oidc-context';

// TODO: Update with relevant info when project approved

const redirectUri = `${window.location.origin}/`;

const oidcConfig = {
  authority: 'https://login.met.no/auth/realms/Internal/',
  client_id: 'annotatedatlas',
  redirect_uri: redirectUri,
  response_type: 'code',
  disablePKCE: false,
  realm: 'Internal',
  loadUserInfo: true,
  scope: 'openid email profile',
  onSigninCallback: () => {
    const redirectLocation = sessionStorage.getItem('path');
    sessionStorage.removeItem('path');

    if (redirectLocation) {
      window.location.replace(redirectLocation);
    } else {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  },
};

const container = document.getElementById('app-root');
const root = createRoot(container!);
root.render(
  <AuthProvider {...oidcConfig}>
    <App />
  </AuthProvider>,
);
