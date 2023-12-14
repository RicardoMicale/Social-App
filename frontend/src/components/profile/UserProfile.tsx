'user client';

import React from 'react';
import { GET_USER_POSTS } from '@/graphql/queries';
import { Post, User } from '@/models';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import PostItem from '../post/PostItem';
import UserCard from '../user/UserCard';
import Loading from '../common/Loading';
import { getImage } from '../../../firebase/storage';

export default function UserProfile() {
  //  STATES
  const params = useParams();

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

  if (loading) return <Loading />;

  return (
    <div className="w-full py-16 flex flex-col md:flex-row items-start-justify-start gap-16">
      <section className="w-full md:w-1/5">
        <UserCard currentUser={currentUser} />
      </section>
      <section className="w-full md:w-3/5">
        <div className="w-full flex flex-col items-start justify-start gap-8">
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
