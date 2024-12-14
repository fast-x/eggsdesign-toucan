import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { borderRadius, colors } from './styles';

interface EmployeeContributionProps {
  to: string;
  imageURL: string;
}

export const EmployeeContribution: React.FC<EmployeeContributionProps> = ({ to, imageURL, children, ...props }) => {
  const element = to ? Link : 'section';

  return (
    <EmployeeContributionCard to={to} as={element} {...props}>
      <div className="image-container">{imageURL && <img src={imageURL} alt="" />}</div>
      <EmployeeContributionContent>{children}</EmployeeContributionContent>
    </EmployeeContributionCard>
  );
};

const EmployeeContributionCard = styled.section<{ to: string }>`
  display: flex;
  text-decoration: none;
  margin-bottom: 2rem;

  &:hover .image-container img {
    ${(props) => props.to && 'transform: scale(1.02)'};
  }

  .image-container {
    border-radius: 100%;
    overflow: hidden;
    height: 11rem;
    width: 11rem;
    flex: none;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: 0.2s;
  }
`;

export const EmployeeContributionContent = styled.div`
  padding-top: 0.2rem;
  padding-left: 1rem;
  color: ${colors.neutral1};

  p,
  h1,
  h3 {
    margin: 0.4rem 0;
  }

  .contribution-placeholder {
    color: ${colors.neutral2};
  }
`;

interface ProjectContributionProps {
  to: string;
  imageURL?: string;
  isExternal: boolean;
}

export const ProjectContribution: React.FC<ProjectContributionProps> = ({
  to,
  imageURL,
  children,
  isExternal,
  ...props
}) => {
  return (
    <ProjectContributionCard {...props}>
      <Link to={to} className="image-container">
        <img src={imageURL} alt="" className={cn({ 'no-image': !imageURL })} />
        {isExternal && <ExternalBadge>External project</ExternalBadge>}
      </Link>
      <ProjectContributionContent>{children}</ProjectContributionContent>
    </ProjectContributionCard>
  );
};

const ExternalBadge = styled.div`
  display: block;
  position: absolute;
  top: 0;
  padding: 0.5em;
  margin: 1em;
  color: black;
  text-align: center;
  font-weight: 500;
  background: ${colors.secondary3};
  border-radius: ${borderRadius.small};
`;

const ProjectContributionCard = styled.section`
  text-decoration: none;
  margin-bottom: 3rem;
  border-radius: ${borderRadius.small};
  overflow: hidden;
  border: 1px solid ${colors.neutral3}88;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr;

  .image-container {
    overflow: hidden;
    height: 16rem;
    flex: none;
    display: block;
    position: relative;
    page-break-inside: avoid;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;

    &.no-image {
      background: ${colors.neutral3}44;
      border: none;
    }
  }
`;

export const ProjectContributionContent = styled.div`
  color: ${colors.neutral1};
  padding: 12px;

  & > * {
    margin: 0.5rem 0;
  }

  .contribution-placeholder {
    font-style: italic;
    color: ${colors.neutral2};
  }
`;
