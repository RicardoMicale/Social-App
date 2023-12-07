//  CREATE REQUEST

import { UserTC } from '../../models';

export type TFollowUserInput = {
  sentTo: String;
  sentBy: String;
};

export const FollowUserInput = `
  input FollowUserInput {
    sentTo: String!
    sentBy: String!
  }
`;

//  MODIFY REQUEST

export type FollowStatus = 'accepted' | 'rejected' | 'pending';

export type TModifyRequestInput = {
  request: String;
  status: FollowStatus;
};

export const ModifyRequestInput = `
  input ModifyRequestInput {
    request: String!
    status: String!
  }
`;

//  FOLLOWERS

export type TGetFollowersInput = {
  userId: String;
};

export const GetFollowersInput = `
  input GetFollowersInput {
    userId: String;
  }
`;

export const GetFollowersType = `
  type getFollowersType {
    followers: [${UserTC.getTypeName()}]
    followerCount: Number
  }
`;

//  FOLLOWING

export type TGetFollowingInput = {
  userId: String;
};

export const GetFollowingInput = `
  input GetFollowingInput {
    userId: String!
  }
`;

export const GetFollowingType = `
  type getFollowersType {
    following: [${UserTC.getTypeName()}]
    followingCount: Number
  }
`;
