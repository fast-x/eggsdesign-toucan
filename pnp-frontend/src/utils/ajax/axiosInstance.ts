import { InteractionRequiredAuthError } from '@azure/msal-browser';
import axios from 'axios';
import msalInstance, { tokenRequest } from '../msal/instance';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 6000,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(async (config) => {
  const activeAccount = msalInstance.getActiveAccount();
  const accounts = msalInstance.getAllAccounts();

  if (!activeAccount && accounts.length === 0) {
    throw new Error('User is not logged in');
  }

  try {
    const authResult = await msalInstance.acquireTokenSilent({ ...tokenRequest, account: accounts[0] });

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${authResult.accessToken}`,
      },
    };
  } catch (e) {
    // If the user needs to re authenticate we log them out
    if (e instanceof InteractionRequiredAuthError) {
      msalInstance.logoutRedirect();
    }

    throw e;
  }
});

export default axiosInstance;
