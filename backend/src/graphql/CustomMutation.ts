import { signIn, signOut, signUp } from '../controllers/authController';
import { createPost } from '../controllers/postController';
import { followUser, modifyFollowRequest } from '../controllers/userController';

export default {
  signIn,
  signUp,
  signOut,
  createPost,
  followUser,
  modifyFollowRequest,
};
