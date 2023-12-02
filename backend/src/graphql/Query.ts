import { CommentTC, LikeTC, PostTC, UserTC } from '../models';
import { FollowRequestTC } from '../models/FollowRequest';

const Query = {
  user: UserTC.mongooseResolvers.findOne(),
  users: UserTC.mongooseResolvers.findMany(),
  post: PostTC.mongooseResolvers.findOne(),
  posts: PostTC.mongooseResolvers.findMany(),
  like: LikeTC.mongooseResolvers.findOne(),
  likes: LikeTC.mongooseResolvers.findMany(),
  comment: CommentTC.mongooseResolvers.findOne(),
  comments: CommentTC.mongooseResolvers.findMany(),
  followRequest: FollowRequestTC.mongooseResolvers.findOne(),
  followRequests: FollowRequestTC.mongooseResolvers.findMany(),
};

export default Query;
