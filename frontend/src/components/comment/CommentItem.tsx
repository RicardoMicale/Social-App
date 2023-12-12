import { Comment } from '@/models';
import React from 'react';
import Card from '../common/Card';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const [user] = useUser();

  const connectionType = () => {
    console.log(comment);
    const following = comment?.author?.following?.map((u) => u?._id);
    const followers = comment?.author?.followers?.map((u) => u?._id);

    if (following?.includes(user?._id) && followers?.includes(user?._id)) {
      return { type: 'mutual', text: 'You follow each other' };
    }
    if (following?.includes(user?._id))
      return { type: 'you follow', text: 'Following' };
    // if (followers?.includes(user?._id))
    //   return { type: 'he follows', text: 'Follows you' };
    if (comment?.author?._id === user?._id)
      return { type: 'you', text: 'Your comment' };
    return null;
  };
  return (
    <Card>
      <header className="border-b-[1px] border-b-slate-200 pb-2 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-600">
            {`${comment?.author?.firstName ?? ''} ${
              comment?.author?.lastName ?? ''
            }`}
          </h3>
          <Link
            href={`/user/${comment?.author?._id}`}
            className="text-indigo-500 hover:underline text-sm"
          >
            @{comment?.author?.username ?? ''}
          </Link>
        </div>
        {connectionType() && (
          <span className="text-xs bg-slate-100 text-slate-500 py-1 px-3 rounded-sm">
            {connectionType()?.text}
          </span>
        )}
      </header>
      <section className="w-full pt-4">
        <p className="text-slate-500">{comment?.body}</p>
      </section>
    </Card>
  );
}
