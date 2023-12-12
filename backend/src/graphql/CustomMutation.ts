import { signIn, signOut, signUp } from '../controllers/authController';
import { createPost } from '../controllers/postController';
import { followUser, modifyFollowRequest } from '../controllers/userController';
import { likePost } from '../controllers/likeController';
import { createComment } from '../controllers/commentController';

export default {
  signIn,
  signUp,
  signOut,
  createPost,
  followUser,
  modifyFollowRequest,
  likePost,
  createComment,
};
