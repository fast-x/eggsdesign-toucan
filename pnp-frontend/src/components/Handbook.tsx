import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from './styles';
import { Heading2 } from './Typography';

interface Props {
  title: string;
  imageURL?: string;
  bookColor?: string;
  linkTo?: string;
}

const Handbook: React.FunctionComponent<Props> = ({ title, bookColor, linkTo }) => {
  return (
    <Container bookColor={bookColor}>
      <HeadingContainer>
        <Heading2>
          <Link className="header-link" to={linkTo ?? '#'}>
            {title}
          </Link>
        </Heading2>
      </HeadingContainer>
    </Container>
  );
};

export default Handbook;

const Container = styled.div<{ bookColor?: string }>`
  border-radius: 4px 16px 16px 4px;
  background-color: ${(props) => props.bookColor || colors.neutral3};
  height: 380px;
  min-width: 16em;
  max-width: 20em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.08);
`;

const HeadingContainer = styled.div`
  background: white;
  padding: 8px 16px;
  text-align: center;
  transform: translateY(-20%);

  .header-link {
    text-decoration: inherit;
    color: inherit;
  }
`;
