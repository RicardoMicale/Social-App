import { schemaComposer } from 'graphql-compose';
import { Comment, CommentTC, Post, User } from '../models';

type TCreateCommentInput = {
  postId: String;
  userId: String;
  body: String;
};

const CreateCommentInput = `
  input CreateCommentInput {
    postId: String!
    userId: String!
    body: String!
  }
`;

export const createComment = schemaComposer.createResolver<
  any,
  {
    data: TCreateCommentInput;
  }
>({
  name: 'createComment',
  kind: 'mutation',
  description: 'Creates comment and adds it to the post comments',
  type: CommentTC.getTypeName(),
  args: {
    data: CreateCommentInput,
  },
  async resolve({ args }) {
    const { postId, userId, body } = args?.data;

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user) {
      throw new Error('User not found');
    }

    if (!post) {
      throw new Error('Post not found');
    }

    const newComment = await Comment.create({
      body,
      post: postId,
      author: userId,
    });

    post.commentCount = post.commentCount + 1;
    post.comments = [...post.comments, newComment._id];
    post.save();

    return newComment;
  },
});
