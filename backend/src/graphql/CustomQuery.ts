import {
  getUser,
  getFollowers,
  getFollowing,
  getFollowRequests,
} from '../controllers/userController';
import { me } from '../controllers/authController';
import { getUserPosts, getPost, getPosts } from '../controllers/postController';

export default {
  me,
  getUserPosts,
  getPost,
  getUser,
  getFollowers,
  getFollowing,
  getFollowRequests,
  getPosts,
};
