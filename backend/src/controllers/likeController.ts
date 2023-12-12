import { schemaComposer } from 'graphql-compose';
import {
  CreateLikeInput,
  TCreateLikeInput,
} from '../controller-types/like/CreateLike';
import { Post, LikeTC, User, Like } from '../models';

export const likePost = schemaComposer.createResolver<
  any,
  {
    data: TCreateLikeInput;
  }
>({
  name: 'likePost',
  kind: 'mutation',
  description: 'Likes a post',
  type: LikeTC.getType(),
  args: { data: CreateLikeInput },
  async resolve({ args }) {
    const { post: postId, user: userId } = args?.data;

    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (!post) {
      throw new Error('Post not found');
    }

    const like = await Like.create({
      post: postId,
      likedBy: userId,
    });

    post.likes = [...post.likes, like._id];
    post.likeCount = post.likeCount + 1;

    post.save();

    return like;
  },
});
