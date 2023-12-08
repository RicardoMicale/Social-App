import { Post, User } from '@/models';

export const filterPosts = (keyword: string, posts: Post[]) => {
  const _posts = posts?.filter((post) => post?.body?.includes(keyword));
  return _posts;
};

export const filterUser = (keyword: string, users: User[]) => {
  const _users = users?.filter((user) => {
    return (
      user?.email?.includes(keyword) ||
      user?.firstName?.includes(keyword) ||
      user?.lastName?.includes(keyword) ||
      user?.username?.includes(keyword)
    );
  });

  return _users;
};
