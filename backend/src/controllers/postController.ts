import {
  GetFeedInput,
  GetFeedType,
  GetPostInput,
  GetUserPostsInput,
  GetUserPostsType,
  TGetFeedInput,
  TGetPostInput,
  TGetUserPostsInput,
} from '../controller-types/post/GetPost';
import {
  CreatePostInput,
  TCreatePostInput,
} from '../controller-types/post/CreatePost';
import {
  Post,
  PostTC,
  PostDocument,
  User,
  UserTC,
  UserDocument,
} from '../models';
import { schemaComposer } from 'graphql-compose';

export const createPost = schemaComposer.createResolver<
  any,
  {
    data: TCreatePostInput;
  }
>({
  name: 'createPost',
  kind: 'mutation',
  description: 'Creates a post for the user received as author',
  type: PostTC.getType(),
  args: {
    data: CreatePostInput,
  },
  async resolve({ args }) {
    const { author, title, body } = args?.data;
    const user = await User.findById(author);

    if (!user) {
      throw new Error('User does not exist!');
    }

    if (title === '') {
      throw new Error('Title must not be empty!');
    }

    if (body === '') {
      throw new Error('Body must not be empty!');
    }

    const post = await Post.create({
      author: user._id,
      title,
      body,
      comments: [],
      likes: [],
    });

    //  adds the new post id to users posts
    user.posts = [...user.posts, post._id];
    await user.save();

    return post;
  },
});

//  getFeed

export const getUserPosts = schemaComposer.createResolver<
  any,
  {
    data: TGetUserPostsInput;
  }
>({
  name: 'userPosts',
  kind: 'query',
  description: 'Get the posts from a specific user',
  type: GetUserPostsType,
  args: {
    data: GetUserPostsInput,
  },
  async resolve({ args }) {
    const { author } = args?.data;
    //  gets the user with its posts
    const user = await User.findById(author).populate('posts');

    if (!user) {
      throw new Error(`User doesn't exist!`);
    }

    const posts = [...user.posts];

    return { posts, user };
  },
});

export const getPost = schemaComposer.createResolver<
  any,
  {
    data: TGetPostInput;
  }
>({
  name: 'getPost',
  kind: 'query',
  description: 'Gets a post from its id',
  type: PostTC.getType(),
  args: {
    data: GetPostInput,
  },
  async resolve({ args }) {
    //  gets the post with its author and comments as objects instead of MongoIDs
    const post = await Post.findById(args?.data?.post)
      .populate('comments')
      .populate('author');

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  },
});

export const getFeed = schemaComposer.createResolver<
  any,
  {
    data: TGetFeedInput;
  }
>({
  name: 'feed',
  kind: 'query',
  description: 'Gets the posts on the users feed',
  type: GetFeedType,
  args: {
    data: GetFeedInput,
  },
  async resolve({ args }) {
    const { user: userId } = args?.data;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error(`User doesn't exist`);
    }

    //  TODO FEED POSTS LOGIC

  },
});
