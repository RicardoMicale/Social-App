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
