import * as msal from '@azure/msal-browser';

const msalConfig: msal.Configuration = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID || '',
    authority: import.meta.env.VITE_MSAL_AUTHORITY || '',
    redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI || '',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

const tokenRequest = {
  redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI || '',
  scopes: ['api://eggsdesign.com/Read'],
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export { tokenRequest };
export default msalInstance;
