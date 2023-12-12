import {
  GetFeedInput,
  GetFeedType,
  GetPostInput,
  GetPostType,
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
import { Post, PostTC, User, Like, Comment } from '../models';
import { schemaComposer } from 'graphql-compose';
import { GetPostLikesType } from '../controller-types/like/GetLikes';
import { TGetPostLikesInput } from '../controller-types/like/GetLikes';
import { GetPostLikesInput } from '../controller-types/like/GetLikes';
import { Types } from 'mongoose';

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
    user.postCount = user.postCount + 1;
    await user.save();

    return post;
  },
});

const GetPostsType = `
  type GetPostsType {
    posts: [${PostTC.getType()}]
  }
`;

export const getPosts = schemaComposer.createResolver({
  name: 'getPosts',
  kind: 'query',
  description: 'Gets all posts',
  type: GetPostsType,
  async resolve() {
    const posts = await Post.find().populate('author');

    return { posts };
  },
});

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
  type: GetPostType,
  args: {
    data: GetPostInput,
  },
  async resolve({ args }) {
    //  gets the post with its author and comments as objects instead of MongoIDs
    const postId = args?.data?.post?.toString();

    const [post] = await Post.aggregate([
      {
        $match: { _id: new Types.ObjectId(postId) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      { $unwind: '$author' },
      {
        $lookup: {
          from: 'comments',
          localField: 'comments',
          foreignField: '_id',
          as: 'comments',
          // pipeline: [
          //   {
          //     $lookup: {
          //       from: 'user',
          //       localField: 'comments.author',
          //       foreignField: '_id',
          //       as: 'author',
          //     },
          //   },
          //   { $unwind: '$author' },
          // ],
        },
      },
      {
        $lookup: {
          from: 'likes',
          localField: 'likes',
          foreignField: '_id',
          as: 'likes',
          // pipeline: [
          //   {
          //     $lookup: {
          //       from: 'user',
          //       localField: 'likes.likedBy',
          //       foreignField: '_id',
          //       as: 'likedBy',
          //     },
          //   },
          //   { $unwind: '$author' },
          // ],
        },
      },
    ]);

    if (!post) {
      throw new Error('Post not found');
    }

    return {
      post,
      user: post.author,
      comments: post.comments,
      likes: post.likes,
    };
  },
});

export const getPostLikes = schemaComposer.createResolver<
  any,
  {
    data: TGetPostLikesInput;
  }
>({
  name: 'getPostLikes',
  kind: 'query',
  description: 'Gets the likes of a post',
  type: GetPostLikesType,
  args: {
    data: GetPostLikesInput,
  },
  async resolve({ args }) {
    const { postId } = args?.data;

    const likes = await Like.find({ post: postId });

    if (!likes) {
      throw new Error('Post not found');
    }

    return { likes, likeCount: likes.length };
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

    const user = await User.findById(userId).populate('following');

    if (!user) {
      throw new Error(`User doesn't exist`);
    }

    //  gets the user liked posts
    const userLikes = await Like.find({ likedBy: userId });

    const posts = await Post.aggregate([
      {
        $match: {
          author: { $in: user.following },
        },
      },
    ]);

    if (!posts) {
      throw new Error(`Posts do not exist`);
    }

    //  maps the ids of the users that the logged user follows
    const followingIds = user.following.map((follow) => String(follow._id));

    const userLikesIds = userLikes.map((like) => String(like.post));

    const feed = posts.map((post) => {
      const followIndex = followingIds.indexOf(String(post.author));
      const isLiked = userLikesIds.includes(String(post._id));
      return { post: { ...post }, user: user.following[followIndex], isLiked };
    });

    return { feed };
  },
});
