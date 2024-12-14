import styled from 'styled-components';
import { colors } from './styles';

export const CardGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 32px;
  grid-auto-rows: 1fr;
  margin-bottom: 80px;
  flex: auto;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;
export const PageWidth = styled.div`
  padding: 0 80px;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;

  @media screen and (max-width: 640px) {
    padding: 0 20px;
  }

  @media print {
    max-width: unset;
    padding: 0;
    margin: 0;
    width: 100%;
    position: relative;
  }
`;

export const AppContainer = styled.main`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
  flex-direction: column;

  @media print {
    position: relative;
    display: block;
    max-width: unset;
  }
`;

export const Columns = styled.section<{ columns?: number; preferredSize?: string }>`
  display: grid;
  grid-gap: 32px;
  grid-auto-rows: 1fr;
  grid-template-columns: ${(props): string =>
    (props.columns && `repeat(${props.columns}, 1fr);`) ||
    `repeat(auto-fit, minmax(${props.preferredSize || '20rem'} , 1fr));`};

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  word-wrap: anywhere; // Prevents layout beyond screen bounds when long text links in body

  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

type StackProps = {
  gap: string;
};

export const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    ${(props): string => (props.gap ? `margin-bottom: ${props.gap}` : '')}
  }
`;

export const MainColumn = styled.div`
  flex: 1;
  padding-right: 1rem;
  box-sizing: border-box;
`;

export const Sidebar = styled.div<{ mobileStickToBottom?: boolean; hideMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  margin-bottom: 1em;

  @media (min-width: 800px) {
    max-width: 18rem;
    margin-right: 48px;
    padding-right: 40px;
    border-right: 1px solid ${colors.neutral3};
  }

  @media (max-width: 800px) {
    ${(props) =>
      props.mobileStickToBottom &&
      `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 3;
      background: rgba(220, 220, 220, 0.9);
      box-shadow: 0 -4px 10px rgba(0,0,0,.1);
      padding: 20px;
      max-height: 20vh;
      margin-bottom: 0;
      overflow: scroll;
      transition: 0.2s max-height ease-in-out;

      &:focus, &:focus-within {
        max-height: 60vh;
      }
    `}
  }

  @media (max-width: 800px) {
    ${(props) =>
      props.hideMobile &&
      `
      display: none;
    `}
  }
`;

export const StickySection = styled.div`
  position: sticky;
  top: 32px;
  height: min-content;

  .index-heading {
    margin: 0.5rem 0;
    padding-top: 1rem;
  }
`;

export const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:first-child) {
    margin-top: 2em;
    padding-top: 2em;
    border-top: 1px solid ${colors.neutral3};
  }
`;

export const ContentDivider = styled.div`
  margin-top: 2em;
  padding-top: 2em;
  border-top: 1px solid ${colors.neutral3};
`;

export const PrintHidden = styled.div`
  @media print {
    display: none;
  }
`;

export const MobileWindow = styled.div`
  @media (min-width: 801px) {
    display: none;
  }
`;

export const PrintPageBreak = styled.div`
  page-break-after: always;
  break-before: always;
  position: relative;
`;

export const PrintNoBreak = styled.div`
  position: relative;
  page-break-inside: avoid;
  break-inside: avoid-page;
`;
