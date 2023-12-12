'use client';

import React from 'react';
import { Post, User } from '@/models';
import PostItem from '../post/PostItem';
import { useQuery } from '@apollo/client';
import { GET_FEED, GET_USER_POSTS } from '@/graphql/queries';
import { useUser } from '@/hooks/useUser';
import AddIcon from '../icons/AddIcon';
import CreatePost from '../post/CreatePost';
import Loading from '../common/Loading';

interface IFeed {
  post: Post;
  user: User;
  isLiked: boolean;
}

export default function Feed() {
  //  STATES
  const [feed, setFeed] = React.useState<IFeed[]>([]);

  const [user] = useUser();

  //  QUERY & MUTATION
  const { data, loading } = useQuery<{
    getFeed: { feed: IFeed[] };
  }>(GET_FEED, {
    variables: {
      data: {
        user: user?._id,
      },
    },
  });

  React.useEffect(() => {
    if (!loading && data) {
      setFeed([...(data?.getFeed?.feed ?? [])]);
    }
  }, [data, loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-10 w-full">
      <button
        type="button"
        className="bg-indigo-600 text-misc-white px-6 py-3 rounded-md flex items-center justify-between gap-2 hover:bg-indigo-500"
        onClick={() => {}}
      >
        <AddIcon className="h-5 w-5" />
        Create post
      </button>
      {/* Post section */}
      <section className="md:w-3/5">
        <div className="w-full mt-8 flex flex-col items-start justify-start gap-8">
          {feed.length > 0 ? (
            feed?.map((feedPost) => (
              <PostItem
                post={feedPost?.post ?? {}}
                key={feedPost?.post?._id ?? ''}
                author={feedPost?.user ?? {}}
                isLiked={feedPost?.isLiked}
              />
            ))
          ) : (
            <span className="text-slate-600">
              There are no posts in your feed!
            </span>
          )}
        </div>
      </section>
      {/* Trend section */}
    </div>
  );
}
