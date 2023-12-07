import { gql } from '@apollo/client';
import { POST_FRAGMENT, USER_FRAGMENT } from './fragments';

export const CURRENT_USER = gql`
  query CURRENT_USER($data: CurrentUserInput) {
    me(data: $data) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

//  POSTS

export const GET_USER_POSTS = gql`
  query GET_USER_POSTS($data: GetUserPostsInput) {
    getUserPosts(data: $data) {
      posts {
        _id
        createdAt
        title
        body
        commentCount
        likeCount
      }
      user {
        _id
        username
      }
    }
  }
`;
