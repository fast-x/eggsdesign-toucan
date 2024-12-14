import { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
};

const FullPageWarningMessage = ({ children }: Props) => {
  return <FullPageWarningContainer>{children}</FullPageWarningContainer>;
};

const FullPageWarningContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  flex-flow: column;

  h1 {
    font-size: 3em;
    margin-bottom: 0;
  }

  p {
    font-size: 1.4em;
  }
`;

export default FullPageWarningMessage;
