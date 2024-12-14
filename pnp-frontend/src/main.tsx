import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate, MsalProvider } from '@azure/msal-react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';
import App from './App';
import FullPageWarningMessage from './components/layouts/FullPageWarningMessage';
import { CacheProvider } from './contexts/CacheContext';
import { FeatureProvider } from './contexts/FeatureContext';
import { LanguageProvider } from './contexts/LanguageContext';
import queryClient from './utils/ajax/queryClient';
import msalInstance, { tokenRequest } from './utils/msal/instance';

const root = document.getElementById('root');

if (window !== window.top || window !== window.parent) {
  ReactDOM.render(<></>, root);
}

if (import.meta.hot) {
  import.meta.hot.accept();
}

ReactDOM.render(
  <MsalProvider instance={msalInstance}>
    {/* All users must be logged in so we wrap the application in a MsalAuthenticationTemplate */}
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={tokenRequest}
      errorComponent={() => (
        <FullPageWarningMessage>
          <h1>Error</h1>
          <p>Something went wrong with your authentication.</p>
        </FullPageWarningMessage>
      )}
      loadingComponent={() => (
        <FullPageWarningMessage>
          <h1>Logging in</h1>
          <p>Just a moment 🙌</p>
        </FullPageWarningMessage>
      )}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <FeatureProvider>
            <CacheProvider>
              <App />
            </CacheProvider>
          </FeatureProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </MsalAuthenticationTemplate>
  </MsalProvider>,
  root,
);
