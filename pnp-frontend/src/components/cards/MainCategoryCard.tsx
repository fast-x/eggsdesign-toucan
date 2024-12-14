import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  title: string;
  description: string;
  imageURL: string;
  link: string;
}

const MainCategoryCard = ({ title, description, imageURL, link }: Props) => {
  return (
    <Container backgroundImage={imageURL}>
      <Title>
        <CardLink to={link}>{title}</CardLink>
      </Title>
      <Description>{description}</Description>
    </Container>
  );
};

const Container = styled.section<{ backgroundImage: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 240px;
  padding: 48px;
  border-radius: 16px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.08);
  color: white;
  text-align: center;
  background: #233d4d;
  background-image: url('${(props) => props.backgroundImage}');
  background-size: cover;
  position: relative;
  overflow: hidden;

  &:after {
    content: ' ';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgb(59, 53, 92);
    opacity: 0.4;
    transition: 0.2s;
    z-index: 0;
  }

  &:hover {
    &:after {
      opacity: 0.6;
    }
  }
`;

const Title = styled.span`
  font-weight: 500;
  font-size: 40px;
  line-height: 56px;
  z-index: 1;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin: 32px 0 0 0;
  z-index: 1;
`;

const CardLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;

  /* For accessibility reasons; makes the link only read the title of the card, while covering the whole card */
  &:after {
    content: ' ';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
`;

export default MainCategoryCard;
