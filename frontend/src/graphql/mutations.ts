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
