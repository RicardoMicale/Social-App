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

//  USER

export const GET_USER = gql`
  query GET_USER($data: GetUserInput) {
    getUser(data: $data) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_USERS = gql`
  query GET_USERS {
    users {
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
        ...UserFragment
        followers {
          _id
        }
        followRequests {
          _id
          sentBy {
            _id
          }
        }
        following {
          _id
        }
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_POSTS = gql`
  query GET_POSTS {
    getPosts {
      posts {
        ...PostFragment
      }
    }
  }
  ${POST_FRAGMENT}
`;

//  REQUESTS

export const GET_REQUESTS = gql`
  query GET_REQUESTS($data: GetFollowRequestsInput) {
    getFollowRequests(data: $data) {
      followRequestsCount
      followRequests {
        _id
        sentBy {
          _id
          username
          firstName
          lastName
        }
        sentTo {
          _id
          username
          firstName
          lastName
        }
        status
      }
    }
  }
`;
