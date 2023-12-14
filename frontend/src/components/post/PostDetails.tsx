'use client';

import React from 'react';
import PostItem from './PostItem';
import { Comment, Like, Post, User } from '@/models';
import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_POST, GET_POST_LIKES } from '@/graphql/queries';
import LikeItem from './LikeItem';
import CommentForm from '../comment/CommentForm';
import CommentItem from '../comment/CommentItem';
import Loading from '../common/Loading';
import { useUser } from '@/hooks/useUser';

export default function PostDetails() {
  //  STATES
  const [post, setPost] = React.useState<{
    post?: Post;
    user?: User;
    comments?: Comment[];
    likes?: Like[];
  }>({});
  const [user] = useUser();
  const params = useParams();

  //  QUERIES

  const { data, loading } = useQuery<{
    getPost: { post: Post; user: User; comments: Comment[]; likes: Like[] };
  }>(GET_POST, {
    variables: {
      data: {
        post: params?.id ?? '',
      },
    },
  });

  React.useEffect(() => {
    if (!loading && data) {
      setPost({ ...(data?.getPost ?? {}) });
      console.log(data);
    }
  }, [data, loading]);

  //  FUNCTIONS

  const isLiked = () => {
    if (post?.post?.likeCount === 0) return false;

    const likes = post?.likes?.map((like) => like?.likedBy?._id);

    return likes?.includes(user?._id);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-16 flex items-start justify-start gap-4">
      <section className="w-full md:w-3/5 flex items-start justify-start flex-col gap-4">
        <PostItem
          post={post?.post ?? {}}
          author={post?.user ?? {}}
          isLiked={isLiked()}
        />
        <CommentForm />
        <div className="w-full">
          {post?.comments?.length ? (
            post?.comments?.map((comment) => (
              <CommentItem comment={comment} key={comment?._id ?? ''} />
            ))
          ) : (
            <span className="text-slate-600">Be the first one to comment!</span>
          )}
        </div>
      </section>
      <section className="overflow-scroll w-full md:w-2/5 bg-misc-white rounded-md py-2 px-4 shadow-custom">
        <h3 className="border-b-2 border-b-slate-100 pb-2 font-bold text-slate-700 text-lg mb-4">
          Likes
        </h3>
        {post?.likes?.length ? (
          <div className="flex items-start justify-start flex-col gap-2">
            {post?.likes?.map((like, index) => (
              <LikeItem key={index} like={like} />
            ))}
          </div>
        ) : (
          <span className="text-slate-600">No likes yet!</span>
        )}
      </section>
    </div>
  );
}
