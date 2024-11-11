import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/main/App';
import { AuthProvider } from 'react-oidc-context';

// TODO: Update with relevant info when project approved

const oidcConfig = {
  authority: 'https://login.met.no/auth/realms/Internal/',
  client_id: 'annotatedatlas',
  redirect_uri: 'https://annotated-atlas-dev.k8s.met.no/',
//  redirect_uri: 'http://localhost:8080/',
  realm: 'Internal',
  onSigninCallback: () => {
    const redirectLocation = sessionStorage.getItem('path');
    sessionStorage.removeItem('path');

    if (redirectLocation) {
      window.location.replace(redirectLocation);
    } else {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  },
  //redirect_uri: `${window.location.origin}${process.env.PUBLIC_URL}/`,
  //  'auth-server-url': 'https://login.met.no/auth/',
  //  'ssl-required': 'all',
  //  resource: 'devuke-frontend',
  //  'public-client': true,
  //  'confidential-port': 0,
};

console.log('redirectURI', `${window.location.origin}${process.env.PUBLIC_URL}/`);
const container = document.getElementById('app-root');
const root = createRoot(container!);
root.render(
  <AuthProvider
    {...oidcConfig}
    loadUserInfo={true}
    scope="openid email profile"
  >
    <App />
  </AuthProvider>,
);
