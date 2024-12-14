import FocusTrap from 'focus-trap-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalState, useLockBodyScroll, useMount, useUnmount } from 'react-use';
import styled from 'styled-components';
import { Heading3 } from '../Typography';

interface Props {
  handleClose?: () => void;
  footerContent?: React.ReactElement;
  headline: string;
}

export const useModalState = createGlobalState<boolean>(false);

export const Modal: React.FC<Props> = ({ children, handleClose, headline, footerContent }) => {
  useLockBodyScroll(true);
  const [, setModalState] = useModalState();
  useMount(() => {
    setModalState(true);
  });
  useUnmount(() => {
    setModalState(false);
  });

  function close() {
    if (!handleClose) {
      return;
    }
    handleClose();
  }
  const element = document.getElementById('modal-container');

  if (!element) {
    return null;
  }

  return ReactDOM.createPortal(
    <FocusTrap>
      <div>
        <ModalShadow onClick={close} />
        <ModalContainer>
          <ModalHeader>
            <ModalHeading>{headline}</ModalHeading>
          </ModalHeader>
          <ModalContent>{children}</ModalContent>
          {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
        </ModalContainer>
      </div>
    </FocusTrap>,
    element,
  );
};

const ModalContainer = styled.div`
  --content-padding: 27px;
  display: flex;
  flex-direction: column;
  width: 640px;
  max-width: calc(100vw - 64px);
  min-width: min(calc(100vw - 64px), 400px);
  max-height: 86vh;
  min-height: 200px;
  background-color: white;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 5;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 4px;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const ModalShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: #505050;
  opacity: 0.7;
  z-index: 4;
`;

export const ModalContent = styled.div`
  overflow: auto;
  padding: var(--content-padding);
`;

const ModalHeader = styled.div`
  padding: 25px var(--content-padding) 8px var(--content-padding);
  background: white;
`;

const ModalHeading = styled(Heading3)`
  margin: 0;
  line-height: 1;
  text-transform: uppercase;
`;

const ModalFooter = styled.div`
  padding: var(--content-padding);
  background: white;
`;
