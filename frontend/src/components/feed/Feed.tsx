'use client';

import React from 'react';
import { Post, User } from '@/models';
import PostItem from '../post/PostItem';
import { useQuery } from '@apollo/client';
import { GET_USER_POSTS } from '@/graphql/queries';
import { useUser } from '@/hooks/useUser';
import AddIcon from '../icons/AddIcon';
import CreatePost from '../post/CreatePost';

export default function Feed() {
  //  STATES
  const [posts, setPosts] = React.useState<Post[]>([]);

  const [user] = useUser();

  //  QUERY & MUTATION
  // const [getFeed] = useQuery<Post[]>(GET_FEED)
  const { data, loading } = useQuery<{
    getUserPosts: { posts: Post[]; user: User };
  }>(GET_USER_POSTS, {
    variables: {
      data: {
        author: user?._id ?? '',
      },
    },
  });

  React.useEffect(() => {
    if (!loading && data) {
      setPosts([...(data?.getUserPosts?.posts ?? [])]);
      console.log(data);
    }
  }, [data, loading]);

  return (
    <div className="py-10 w-full md:w-3/5 ">
      <button
        type="button"
        className="bg-indigo-600 text-misc-white px-6 py-3 rounded-md flex items-center justify-between gap-2 hover:bg-indigo-500"
        onClick={() => {}}
      >
        <AddIcon className="h-5 w-5" />
        Create post
      </button>
      <CreatePost />
      {/* Post section */}
      <section>
        <div className="w-full mt-8 flex flex-col items-start justify-start gap-8">
          {posts.length > 0 ? (
            posts?.map((post) => (
              <PostItem
                post={post ?? {}}
                key={post?._id ?? ''}
                author={post?.author ?? {}}
              />
            ))
          ) : (
            <span className="text-slate-600">
              There are no posts in your feed today!
            </span>
          )}
        </div>
      </section>
      {/* Trend section */}
    </div>
  );
}
