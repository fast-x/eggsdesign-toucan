import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Badge from './Badge';
import { PageWidth } from './Layout';
import Logo from '../assets/logo/EggsLogo';
import { colors } from './styles';
import { LanguagePicker } from './LanguagePicker';

export default function AppHeader() {
  return (
    <HeaderAppContainer>
      <HeaderPageWidth>
        <AppNavigation>
          <NavigationTitle to="/" end>
            <Logo />
            <span className="text app-name">Yolk Dashboard</span>
          </NavigationTitle>
          <NavigationPageLinks>
            <li>
              <NavigationPageLink to="/people">People</NavigationPageLink>
            </li>
            <li>
              <NavigationPageLink to="/projects">Projects</NavigationPageLink>
            </li>
            <li>
              <NavigationPageLink to="/approaches">Approaches</NavigationPageLink>
            </li>
            <li>
              <NavigationPageLink to="/clients">Clients</NavigationPageLink>
            </li>
            <li>
              <NavigationExternalLink href="http://wiki.eggsdesign.com">
                Wiki <Badge style={{ marginLeft: '4px' }}>NEW</Badge>
              </NavigationExternalLink>
            </li>
          </NavigationPageLinks>

          <LanguageSettings>
            <LanguagePicker />
          </LanguageSettings>
        </AppNavigation>
      </HeaderPageWidth>
    </HeaderAppContainer>
  );
}

const HeaderAppContainer = styled.div`
  border-bottom: 1px solid ${colors.neutral3};
  background: transparent;
  align-items: center;
  margin-bottom: 3em;

  @media print {
    display: none;
  }
`;

const HeaderPageWidth = styled(PageWidth)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavigationTitle = styled(NavLink)`
  text-decoration: none;
  color: ${colors.neutral1};
  font-family: 'Haffer', sans-serif;
  font-weight: 500;
  font-size: 1em;
  line-height: 1.5;
  text-transform: uppercase;
  margin: 0 1em 0 0;
  letter-spacing: 0.04em;
  display: flex;
  align-self: center;
  justify-content: center;
  align-items: center;

  :visited {
    color: ${colors.neutral1};
  }
`;

const NavigationPageLinks = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    list-style: none;
    text-decoration: none;

    &:not(:last-of-type) {
      margin-right: 2em;
    }
  }
`;

const NavigationPageLinkStyles = css`
  text-decoration: none;
  color: ${colors.neutral1};
  display: flex;
  align-items: center;
  margin: 0;
  padding: 1.5em 0;

  :hover,
  &.active {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: ${colors.neutral1};
      height: 3px;
      border-radius: 3px;
    }
  }
`;

const NavigationPageLink = styled(NavLink)`
  ${NavigationPageLinkStyles}
`;

const NavigationExternalLink = styled.a`
  ${NavigationPageLinkStyles}
`;

const LanguageSettings = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;

  li {
    list-style: none;

    &:not(:last-of-type) {
      margin-right: 1rem;
    }
  }

  button {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    border: none;
    height: 100%;
    cursor: pointer;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0);

    :hover,
    &.active {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const AppNavigation = styled.div`
  display: grid;
  grid-auto-flow: column;
  width: 100%;
  grid-auto-columns: auto 1fr auto auto;
  margin: 0;
  grid-gap: 16px;

  .text {
    margin-left: 1em;
  }

  .app-name {
    font-family: 'HafferPrototypo', 'Haffer', sans-serif;
    font-size: 1.75rem;
    text-transform: none;
  }

  @media (max-width: 800px) {
    margin-top: 1rem;

    ${NavigationTitle} {
      grid-column: 1;
      grid-row: 1;
      justify-content: left;
    }

    ${NavigationPageLinks} {
      grid-column: span 2;
      grid-row: 2;
      justify-content: center;
      flex-wrap: wrap;
    }

    ${NavigationPageLink}, ${NavigationExternalLink} {
      padding: 0.5em 0 1em 0;
    }

    ${LanguageSettings} {
      grid-column: 2;
      grid-row: 1;
      justify-content: flex-end;
    }

    .text {
      display: none;
    }
  }
`;
