import styled from 'styled-components';
import React from 'react';
import { tokens } from '../styles/variables';
import { TagByUser } from '../types';
import Link from 'next/link';

type Props = {
  tags: TagByUser[];
  className?: string;
};

const Tags: React.FC<Props> = ({ tags, className }: Props) => {
  return (
    <Wrapper className={className}>
      {tags.map((item, index) => {
        return (
          <li key={`${item}-${index}`}>
            <Link passHref href={`/tags/${item.slug.current}`}>
              <Tag>#{item.value}</Tag>
            </Link>
          </li>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
  list-style: none;
`;

// TODO add as link?
const Tag = styled.a`
  color: ${tokens.colors.indigo['800'].value};
  text-transform: lowercase;
  font-size: 1.125rem;
  &:hover {
    color: #225877;
  }
  text-decoration: none;
`;

export default Tags;
