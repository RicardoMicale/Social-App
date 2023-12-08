import { schemaComposer } from 'graphql-compose';
import { FollowRequest, FollowRequestTC, User, UserTC } from '../models';
import {
  FollowUserInput,
  GetFollowersInput,
  GetFollowersType,
  GetFollowingInput,
  GetFollowingType,
  ModifyRequestInput,
  TFollowUserInput,
  TGetFollowersInput,
  TModifyRequestInput,
} from '../controller-types/user/Follow';
import { TGetUserInput } from '../controller-types/user/User';
import { GetUserInput } from '../controller-types/user/User';

export const followUser = schemaComposer.createResolver<
  any,
  {
    data: TFollowUserInput;
  }
>({
  name: 'followUser',
  kind: 'mutation',
  description: 'Follows a user account',
  type: FollowRequestTC.getType(),
  args: {
    data: FollowUserInput,
  },
  async resolve({ args }) {
    const { sentBy, sentTo } = args?.data;

    const userSender = await User.findById(sentBy);
    const userReceiver = await User.findById(sentTo);

    if (!userSender) {
      throw new Error(`User sending the request doesn't exist`);
    }

    if (!userReceiver) {
      throw new Error(`User receiving the request doesn't exist`);
    }

    //  creates request
    const newFollowRequest = await FollowRequest.create({
      sentBy,
      sentTo,
    });

    //  updates user receiving the request
    //  adds the request to their request list
    userReceiver.followRequests = [
      ...userReceiver.followRequests,
      newFollowRequest,
    ];
    userReceiver.followRequestCount = userReceiver.followRequestCount + 1;
    userReceiver.save();

    return newFollowRequest;
  },
});

export const modifyFollowRequest = schemaComposer.createResolver<
  any,
  {
    data: TModifyRequestInput;
  }
>({
  name: 'modifyRequest',
  kind: 'mutation',
  description: 'Accepts or rejects user follow request',
  type: FollowRequestTC.getType(),
  args: {
    data: ModifyRequestInput,
  },
  async resolve({ args }) {
    const { request, status } = args?.data;

    const followRequest = await FollowRequest.findById(request);

    if (!followRequest) {
      throw new Error(`Follow request doesn't exist`);
    }

    const receiver = await User.findById(followRequest.sentTo);
    const sender = await User.findById(followRequest.sentBy);

    if (!receiver) {
      throw new Error(`User receiving doesn't exist`);
    }

    //  accepts the request
    followRequest.status = status;
    followRequest.save();

    //  filters by the id being different than the request accepted
    //  updates the follow request array
    receiver.followRequests = receiver.followRequests.filter((fr) => {
      fr._id !== followRequest._id;
    });

    if (status === 'accepted') {
      //  if the request is accepted, add the user to the receivers follower list and update the follower count
      receiver.followers = [...receiver.followers, sender._id];
      receiver.followerCount = receiver.followerCount + 1;
      // adds the user to the sender following list and updates the following count
      sender.following = [...sender.following, receiver._id];
      sender.followingCount = sender.followingCount + 1;
    }
    receiver.save();

    return followRequest;
  },
});

type TGetFollowRequestsInput = {
  userId: String;
};

const GetFollowRequestsInput = `
  input GetFollowRequestsInput {
    userId: String!
  }
`;

const GetFollowRequestsType = `
  type GetFollowRequestsType {
    followRequests: [${FollowRequestTC.getType()}]
    followRequestsCount: Int
  }
`;

export const getFollowRequests = schemaComposer.createResolver<
  any,
  {
    data: TGetFollowRequestsInput;
  }
>({
  name: 'getFollowRequests',
  kind: 'query',
  description: 'Gets pending follow requests for a user',
  type: GetFollowRequestsType,
  args: {
    data: GetFollowRequestsInput,
  },
  async resolve({ args }) {
    const { userId } = args?.data;

    const user = await User.findById(userId).populate('followRequests');

    if (!user) {
      throw new Error(`User doesn't exist`);
    }

    return {
      followRequests: user.followRequests,
      followRequestsCount: user.followRequestCount,
    };
  },
});

export const getUser = schemaComposer.createResolver<
  any,
  {
    data: TGetUserInput;
  }
>({
  name: 'getUser',
  kind: 'query',
  description: 'Get user object with populatedFields',
  type: UserTC.getType(),
  args: {
    data: GetUserInput,
  },
  async resolve({ args }) {
    const { userId } = args?.data;

    //  gets the user with their posts
    const user = await User.findById(userId).populate('posts');

    if (!user) {
      throw new Error(`User doesn't exist`);
    }

    return user;
  },
});

export const getFollowers = schemaComposer.createResolver<
  any,
  {
    data: TGetFollowersInput;
  }
>({
  name: 'getFollowers',
  kind: 'query',
  description: 'Get users followers',
  type: GetFollowersType,
  args: {
    data: GetFollowersInput,
  },
  async resolve({ args }) {
    const { userId } = args?.data;

    const user = await User.findById(userId).populate('followers');

    if (!user) {
      throw new Error(`User doesn't exist`);
    }

    return { followers: user.followers, followersCount: user.followerCount };
  },
});

export const getFollowing = schemaComposer.createResolver<
  any,
  {
    data;
  }
>({
  name: 'getFollowing',
  kind: 'query',
  description: 'Gets the users that are followed by the user',
  type: GetFollowingType,
  args: {
    data: GetFollowingInput,
  },
  async resolve({ args }) {
    const { userId } = args?.data;

    const user = await User.findById(userId).populate('following');

    if (!user) {
      throw new Error(`User doesn't exist`);
    }

    return { followers: user.following, followersCount: user.followingCount };
  },
});
