'use client';

import React from 'react';
import { GET_USER_POSTS } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import { useUser } from '@/hooks/useUser';
import { Post, User } from '@/models';
import UserCard from '../user/UserCard';
import AddIcon from '../icons/AddIcon';
import PostItem from '../post/PostItem';
import Link from 'next/link';
import RequestIcon from '../icons/RequestIcon';
import Loading from '../common/Loading';
import EditIcon from '../icons/EditIcon';
import { getImage } from '../../../firebase/storage';

export default function MyProfile() {
  //  STATES
  const [user] = useUser();
  const [currentUser, setCurrentUser] = React.useState<User>({});
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [photo, setPhoto] = React.useState('');

  const { data, loading } = useQuery<{
    getUserPosts: { user: User; posts: Post[] };
  }>(GET_USER_POSTS, {
    variables: {
      data: {
        author: user?._id ?? '',
      },
    },
  });

  React.useEffect(() => {
    if (!loading && data) {
      setCurrentUser({ ...data?.getUserPosts?.user });
      setPosts([...data?.getUserPosts?.posts]);
    }
  }, [data, loading]);

  if (loading) return <Loading />;

  return (
    <div className="w-full py-16 flex flex-col md:flex-row items-start-justify-start gap-16">
      <section className="w-full md:w-1/5">
        <UserCard currentUser={currentUser} />
        <Link
          href="/profile/requests"
          className="bg-indigo-600 text-misc-white px-6 py-3 rounded-md flex items-center justify-center gap-4 hover:bg-indigo-500 mt-4 cursor-pointer"
        >
          <RequestIcon className="h-5 w-5" />
          See follow requests
        </Link>
        <Link
          href="/profile/edit"
          className="border-2 border-indigo-600 bg-misc-white text-indigo-600 px-6 py-3 rounded-md flex items-center justify-center gap-4 hover:bg-slate-100 mt-4 cursor-pointer"
        >
          <EditIcon className="h-5 w-5" />
          Edit profile
        </Link>
      </section>
      <section className="w-full md:w-3/5">
        <button
          type="button"
          className="bg-indigo-600 text-misc-white px-6 py-3 rounded-md flex items-center justify-between gap-2 hover:bg-indigo-500"
          onClick={() => {}}
        >
          <AddIcon className="h-5 w-5" />
          Create post
        </button>
        <div className="w-full mt-8 flex flex-col items-start justify-start gap-8">
          {posts?.length > 0 ? (
            posts.map((post) => (
              <PostItem
                key={post?._id}
                post={post ?? {}}
                author={currentUser ?? {}}
              />
            ))
          ) : (
            <span>You have no posts yet!</span>
          )}
        </div>
      </section>
    </div>
  );
}
