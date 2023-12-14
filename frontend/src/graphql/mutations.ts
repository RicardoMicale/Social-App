import { gql } from '@apollo/client';
import { USER_FRAGMENT } from './fragments';

//  AUTH

export const SIGN_UP = gql`
  mutation SIGN_UP($data: SignUpInput) {
    signUp(data: $data) {
      _id
      firstName
      lastName
      username
      email
      firebaseId
    }
  }
`;

export const SIGN_IN = gql`
  mutation SIGN_IN($data: SignInInput) {
    signIn(data: $data) {
      user {
        _id
        firstName
        lastName
        username
        email
        firebaseId
      }
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SIGN_OUT {
    signOut {
      success
    }
  }
`;

//  POSTS

export const CREATE_POST = gql`
  mutation CREATE_POST($data: CreatePostInput) {
    createPost(data: $data) {
      _id
      title
      body
      commentCount
      likeCount
      createdAt
    }
  }
`;

//  USER

export const FOLLOW_USER = gql`
  mutation FOLLOW_USER($data: FollowUserInput) {
    followUser(data: $data) {
      status
    }
  }
`;

export const MODIFY_FOLLOW_REQUEST = gql`
  mutation MODIFY_FOLLOW_REQUEST($data: ModifyRequestInput) {
    modifyFollowRequest(data: $data) {
      sentBy {
        _id
        firstName
        lastName
      }
      sentTo {
        _id
        firstName
        lastName
      }
      status
    }
  }
`;

export const LIKE_POST = gql`
  mutation LIKE_POST($data: CreateLikeInput) {
    likePost(data: $data) {
      _id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UPDATE_USER(
    $record: UpdateOneUserInput!
    $filter: FilterUpdateOneUserInput
  ) {
    updateUser(record: $record, filter: $filter) {
      record {
        _id
      }
    }
  }
`;

//  COMMENTS

export const CREATE_COMMENT = gql`
  mutation CREATE_COMMENT($data: CreateCommentInput) {
    createComment(data: $data) {
      _id
    }
  }
`;
