import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import styled from 'styled-components';
import { CenterContent } from '../../components';
import Avatar from '../../components/Avatar';
import Header from '../../components/layout/Header';
import Layout from '../../components/layout/Layout';
import PostList from '../../components/posts/PostList';
import { getAllTags, getPostsByAuthorId, getProfileFromEmail } from '../../scripts/api';
import { tokens } from '../../styles/variables';

import { loginRedirectConfig } from '../../scripts/helpers';
import { Post, TagByUser, User, UserProfile } from '../../types';
import { useContext, useCallback, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
interface Props {
  user: User;
  posts?: Post[];
  tags: TagByUser[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session === null || !session.user?.email) {
    return loginRedirectConfig;
  }
  const userProfile = await getProfileFromEmail(session.user.email);
  const posts = await getPostsByAuthorId(userProfile._id);
  const tags = await getAllTags();

  const props: Props = {
    user: {
      ...userProfile,
      _id: userProfile._id,
      email: session.user.email,
      title: userProfile.title ?? null,
      // @ts-ignore
      image: userProfile?.image ?? null,
    },
    posts,
    tags,
  };
  return { props };
};

const Me: NextPage<Props> = ({ user, posts, tags }) => {
  const { setUser } = useContext(AuthContext);
  const setUserAuth = useCallback(() => {
    setUser(user);
  }, [setUser, user]);

  useEffect(() => {
    setUserAuth();
  }, [setUserAuth]);
  return (
    <Layout>
      <Header tags={tags} />
      <main>
        <CenterContent>
          <Wrapper>
            <header></header>
            <FaceInfo>
              <Avatar image={user.image} isProfilePage size={100} className="avatar" />
              <h2>
                {user.firstName} {user.lastName}
              </h2>
              <span>{user.title}</span>
            </FaceInfo>
            {posts && (
              <Padding>
                <PostList posts={posts} title={`Your posts (${posts?.length})`} />
              </Padding>
            )}
          </Wrapper>
        </CenterContent>
      </main>
    </Layout>
  );
};

const Padding = styled.div`
  padding: 0 1.5rem;
`;

const Wrapper = styled.div`
  header {
    width: 100%;
    height: 184px;
    background-color: ${tokens.colors.blue[900].value};
    background-image: url("data:image/svg+xml,%3Csvg width='720' height='360' viewBox='0 0 720 360' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M180 180V180C279.411 180 360 260.589 360 360V360H180V180Z' fill='%23FE5F55'/%3E%3Cpath d='M720 -7.89402e-06C620.589 -3.53427e-06 540 80.5887 540 180V180L720 180L720 -7.89402e-06V-7.89402e-06Z' fill='%23C9E7F8'/%3E%3Cpath d='M540 180V180C540 279.411 459.411 360 360 360V360L360 180L540 180Z' fill='%23798BCC'/%3E%3Cpath d='M540 180V180C540 279.411 620.589 360 720 360V360L720 180L540 180Z' fill='%233DBEB3'/%3E%3Cpath d='M206 90C206 54.6538 234.654 26 270 26V26C305.346 26 334 54.6538 334 90V90C334 125.346 305.346 154 270 154V154C234.654 154 206 125.346 206 90V90Z' fill='%23C9E7F8'/%3E%3Cpath d='M0 0H180V180H0V0Z' fill='%23FFBF01'/%3E%3C/svg%3E");
    background-position: center;
  }
  .log-out {
    margin-left: auto;
  }
  h2 {
    margin-top: 4rem;
  }
  .text-content {
    display: none;
  }
`;

const FaceInfo = styled.div`
  text-align: center;
  margin-top: -2.5rem;
  margin-bottom: 2.5rem;
  h2 {
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
`;

export default Me;
