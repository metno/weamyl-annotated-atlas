import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/main/App';
import { AuthProvider } from 'react-oidc-context';

// TODO: Update with relevant info when project approved

const oidcConfig = {
  authority: 'https://login.met.no/auth/realms/Internal/',
  client_id: 'annotatedatlas',
  //  redirect_uri: 'https://annotated-atlas-dev.k8s.met.no/',
  redirect_uri: `${window.location.origin}/`,
  //  redirect_uri: 'http://localhost:8080/',
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

console.log('redirectURI', `${window.location.origin}/`);
const container = document.getElementById('app-root');
const root = createRoot(container!);
root.render(
  <AuthProvider {...oidcConfig}>
    <App />
  </AuthProvider>,
);
