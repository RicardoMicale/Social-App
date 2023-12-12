'use client';

import { Post, User } from '@/models';
import React from 'react';
import Card from '../common/Card';
import dayjs from 'dayjs';
import CommentIcon from '../icons/CommentIcon';
import HeartIcon from '../icons/HeartIcon';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { LIKE_POST } from '@/graphql/mutations';
import { ToastContext } from '@/context/ToastContext.context';
import { useUser } from '@/hooks/useUser';

dayjs.locale('es');

interface PostItemProps {
  post: Post;
  author: User;
  isLiked?: boolean;
}

export default function PostItem({ post, author, isLiked }: PostItemProps) {
  //  STATES
  const [clickable, setCLickable] = React.useState(true);
  const { notify } = React.useContext(ToastContext);
  const [user] = useUser();
  const [liked, setLiked] = React.useState(isLiked ?? false);
  const [likeCount, setLikeCount] = React.useState(post?.likeCount ?? 0);

  React.useEffect(() => {
    if (post) {
      setLikeCount(post?.likeCount ?? 0);
    }
  }, [post]);

  //  MUTATION
  const [likePost] = useMutation(LIKE_POST);

  //  FUNCTIONS
  const like = async () => {
    try {
      //  prevents double clicking
      if (!clickable) {
        return;
      }
      setCLickable(false);

      const like = await likePost({
        variables: {
          data: {
            post: post?._id ?? '',
            user: user?._id ?? '',
          },
        },
      });

      if (like) {
        setLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (err) {
      console.log(err);
      if (notify) notify(`Error: ${err}`, 'error');
    } finally {
      setCLickable(true);
    }
  };
  return (
    <Card>
      <section>
        <div className="flex items-center justify-between mb-4">
          <Link
            href={`/user/${author?._id}`}
            className="text-indigo-500 text-sm hover:underline"
          >
            @{author?.username ?? ''}
          </Link>
          <span className="text-slate-500 text-sm">
            {dayjs(post?.createdAt ?? null).format('DD/MM/YYYY - HH:mm')}
          </span>
        </div>
        <h2 className="font-bold text-xl text-slate-700">
          {post?.title ?? ''}
        </h2>
      </section>
      <p className="py-4 text-slate-800">{post?.body ?? ''}</p>
      <section className="pt-2 flex items-center justify-start gap-8 border-t-[1px] border-t-slate-200 text-slate-600">
        <Link
          href={`/post/${post?._id}`}
          className="flex items-center justify-start gap-2"
        >
          <CommentIcon className="h-4 w-4" />
          <span className="text-sm">
            {String(post?.commentCount) ?? 0} comments
          </span>
        </Link>
        <div className="flex items-center justify-start gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (!isLiked) {
                like();
              }
            }}
          >
            <HeartIcon
              className={`h-4 w-4 ${liked ? 'text-rose-600' : ''}`}
              fill={`${liked ? 'currentColor' : 'transparent'}`}
            />
          </button>
          <span className="text-sm">{String(likeCount) ?? 0} likes</span>
        </div>
      </section>
    </Card>
  );
}
