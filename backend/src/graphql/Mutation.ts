import {
  CommentTC,
  FollowRequestTC,
  LikeTC,
  PostTC,
  TrendTC,
  UserTC,
} from '../models';

const Mutation = {
  createUser: UserTC.mongooseResolvers.createOne(),
  updateUser: UserTC.mongooseResolvers.updateOne(),
  //  createPost: PostTC.mongooseResolvers.createOne(),
  updatePost: PostTC.mongooseResolvers.updateOne(),
  createComment: CommentTC.mongooseResolvers.createOne(),
  updateComment: CommentTC.mongooseResolvers.updateOne(),
  createLike: LikeTC.mongooseResolvers.createOne(),
  updateLike: LikeTC.mongooseResolvers.updateOne(),
  createFollowRequest: FollowRequestTC.mongooseResolvers.createOne(),
  updateFollowRequest: FollowRequestTC.mongooseResolvers.updateOne(),
  createTrend: TrendTC.mongooseResolvers.createOne(),
  updateTrend: TrendTC.mongooseResolvers.updateOne(),
};

export default Mutation;
