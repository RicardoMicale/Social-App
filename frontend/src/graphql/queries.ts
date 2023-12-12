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

export const GET_FEED = gql`
  query GET_FEED($data: GetFeedInput) {
    getFeed(data: $data) {
      feed {
        post {
          _id
          createdAt
          title
          body
          commentCount
          likeCount
        }
        user {
          ...UserFragment
        }
        isLiked
      }
    }
  }
  ${USER_FRAGMENT}
`;

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

export const GET_POST = gql`
  query GET_POST($data: GetPostInput) {
    getPost(data: $data) {
      post {
        ...PostFragment
      }
      user {
        username
        _id
        firstName
        lastName
        photo
        email
      }
      comments {
        body
        author {
          username
          _id
          firstName
          lastName
          email
          photo
          following {
            _id
          }
          followers {
            _id
          }
        }
      }
      likes {
        likedBy {
          username
          _id
          firstName
          lastName
          email
          photo
          following {
            _id
          }
          followers {
            _id
          }
        }
      }
    }
  }
  ${POST_FRAGMENT}
`;

export const GET_POST_LIKES = gql`
  query GET_POST_LIKES($data: GetPostLikesInput) {
    getPostLikes(data: $data) {
      likeCount
      likes {
        likedBy {
          username
          firstName
          lastName
          _id
          photo
        }
      }
    }
  }
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
