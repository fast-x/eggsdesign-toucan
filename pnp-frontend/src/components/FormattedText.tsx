import styled from 'styled-components';

export const FormattedText = styled.article`
  p,
  ol,
  ul {
    font-size: 1rem;
    line-height: 1.6;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    &:first-child {
      margin-top: 0;
    }

    margin: 2em 0 0.5em;
  }
`;
