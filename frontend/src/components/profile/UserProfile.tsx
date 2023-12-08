'user client';

import React from 'react';
import { GET_USER_POSTS } from '@/graphql/queries';
import { Post, User } from '@/models';
import { useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import PostItem from '../post/PostItem';
import AddIcon from '../icons/AddIcon';
import UserCard from '../user/UserCard';

export default function UserProfile() {
  //  STATES
  const params = useParams();
  const router = useRouter();
  const id = params?.id ?? '';
  const [currentUser, setCurrentUser] = React.useState<User>({});
  const [posts, setPosts] = React.useState<Post[]>([]);

  const { data, loading } = useQuery<{
    getUserPosts: { user: User; posts: Post[] };
  }>(GET_USER_POSTS, {
    variables: {
      data: {
        author: id,
      },
    },
  });

  React.useEffect(() => {
    if (!loading && data) {
      setCurrentUser({ ...data?.getUserPosts?.user });
      setPosts([...data?.getUserPosts?.posts]);
    }
  }, [data, loading]);

  return (
    <div className="w-full py-16 flex flex-col md:flex-row items-start-justify-start gap-16">
      <section className="w-full md:w-1/5">
        <UserCard currentUser={currentUser} />
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
