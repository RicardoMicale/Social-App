import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    _id
    createdAt
    updatedAt
    active
    firstName
    lastName
    email
    birthDate
    postCount
    followerCount
    followRequestCount
    followingCount
    photo
    username
  }
`;

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    _id
    createdAt
    title
    body
    author
    comments {
      body
    }
    commentCount
    likeCount
  }
`;
