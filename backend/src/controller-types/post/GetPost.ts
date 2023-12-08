import { PostTC, UserTC } from '../../models';

//  POSTS BY AUTHOR ID

export type TGetUserPostsInput = {
  author: String;
};

export const GetUserPostsInput = `
  input GetUserPostsInput {
    author: String!
  }
`;

export const GetUserPostsType = `
  type GetUserPostsType {
    posts: [${PostTC.getTypeName()}]
    user: ${UserTC.getTypeName()}
  }
`;

//  SINGLE POST BY ID

export type TGetPostInput = {
  post: String;
};

export const GetPostInput = `
  input GetPostInput {
    post: String!
  }
`;

//  FEED POSTS

export type TGetFeedInput = {
  user: String;
};

export const GetFeedInput = `
  input GetFeedInput {
    user: String!
  }
`;

export const GetFeedType = `
  type GetFeedType {
    feed: [${PostTC.getTypeName()}]
  }
`;
