import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContainer, PageWidth } from './Layout';
import { Heading1, Paragraph } from './Typography';

interface Props {
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({ resetErrorBoundary }: Props) => {
  const location = useLocation();
  const [lastLocation, setLastLocation] = useState(location.pathname);

  useEffect(() => {
    // Attempt to reset the error boundary when user navigates to another page
    if (lastLocation !== location.pathname) {
      setLastLocation(location.pathname);
      resetErrorBoundary();
    }
  }, [lastLocation, location.pathname, resetErrorBoundary]);

  return (
    <AppContainer>
      <PageWidth>
        <Heading1>An error occurred</Heading1>
        <Paragraph>
          Please use the <strong>Report Bug</strong> button to report this, if this is a bug.
        </Paragraph>
        <Paragraph>We are sorry for the inconvenience.</Paragraph>
      </PageWidth>
    </AppContainer>
  );
};
