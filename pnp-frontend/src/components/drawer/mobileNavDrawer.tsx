import React, { ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import useScrollBlock from '../../hooks/use-scroll-block';
import { Button } from '../input/Button';
import { ContentDivider } from '../Layout';
import { useWindowScroll } from 'react-use';

type Props = {
  label: string | ReactNode;
  buttonLabel?: string;
  onApply?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};

function MobileNavDrawer({ label, buttonLabel, onApply, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();
  const { y } = useWindowScroll();

  const handleToggleDrawer = () => {
    if (isOpen) {
      allowScroll();
      setIsOpen(false);
      return;
    }
    blockScroll();
    setIsOpen(true);
  };

  const handleApply = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onApply) {
      onApply(event);
    }
    handleToggleDrawer();
  };

  return (
    <>
      <DrawerStyle showText={y === 0}>
        <Button onClick={handleToggleDrawer}>{label}</Button>
      </DrawerStyle>
      <DrawerOverlayStyle showDrawer={isOpen} onClick={handleToggleDrawer} />
      <DrawerNavStyle showDrawer={isOpen}>
        <DrawerContentStyle>
          <Button onClick={handleApply}>{buttonLabel ? buttonLabel : 'Apply'}</Button>
          <ContentDivider />
          {children}
        </DrawerContentStyle>
      </DrawerNavStyle>
    </>
  );
}

export default MobileNavDrawer;

const DrawerOverlayStyle = styled.button<{ showDrawer: boolean }>`
  display: none;
  position: fixed;
  top: -2rem;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  background: black;

  ${(props) =>
    props.showDrawer === true &&
    css`
      display: block;
      opacity: 0.3;
      border: none;
    `}
`;

const DrawerNavStyle = styled.div<{ showDrawer: boolean }>`
  visibility: hidden;
  position: fixed;
  top: -2rem;
  left: 0;
  bottom: 0;
  z-index: 101;
  transition: all;
  background: white;
  padding-top: 2rem;
  transition-duration: 500ms;
  transform: translate3d(-100%, 0px, 0px);
  width: 80vw;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.showDrawer === true &&
    css`
      display: block;
      visibility: visible;
      transform: translate3d(0, 0, 0) !important;
    `}
`;

const DrawerStyle = styled.div<{ showText: boolean }>`
  display: none;
  position: fixed;
  right: 2rem;
  bottom: 3rem;
  z-index: 10;
  background: transparent;
  border: none;

  @media (max-width: 800px) {
    display: block;
  }

  & > button span {
    padding-right: 0rem;
    max-width: 0;
    -webkit-transition: max-width 1s, padding 1s;
    transition: max-width 1s, padding 1s;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
    overflow: hidden;
  }

  ${(props) =>
    props.showText === true &&
    css`
      & > button span {
        padding-right: 0.5rem;
        max-width: 7rem;
      }
    `}
`;

const DrawerContentStyle = styled.div`
  padding: 1rem 1rem 3rem;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
`;
