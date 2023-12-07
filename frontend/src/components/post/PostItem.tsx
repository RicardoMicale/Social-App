'use client';

import { Post, User } from '@/models';
import React from 'react';
import Card from '../common/Card';
import dayjs from 'dayjs';
import CommentIcon from '../icons/CommentIcon';
import HeartIcon from '../icons/HeartIcon';

dayjs.locale('es');

interface PostItemProps {
  post: Post;
  author: User;
}

export default function PostItem({ post, author }: PostItemProps) {
  //  TODO AUTHOR NAME -> LINK TO USER PROFILE
  //  TODO COMMENT ICON -> ADD COMMENT
  //  TODO LIKE ICON -> ADD LIKE
  //  TODO BUTTON LINK TO POST DETAILS
  return (
    <Card>
      <section>
        <div className="flex items-center justify-between mb-4">
          <span className="text-indigo-500 text-sm">
            @{author?.username ?? ''}
          </span>
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
        <div className="flex items-center justify-start gap-2">
          <CommentIcon className="h-4 w-4" />
          <span className="text-sm">
            {String(post?.commentCount) ?? 0} comments
          </span>
        </div>
        <div className="flex items-center justify-start gap-2">
          <HeartIcon className="h-4 w-4" />
          <span className="text-sm">{String(post?.likeCount) ?? 0} likes</span>
        </div>
      </section>
    </Card>
  );
}
