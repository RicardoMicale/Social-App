import { User } from '@/models';
import React from 'react';
import Card from '../common/Card';
import Link from 'next/link';

interface UserSearchCardProps {
  user: User;
}

export default function UserSearchCard({ user }: UserSearchCardProps) {
  return (
    <Link href={`/user/${user?._id}`}>
      <div className="bg-misc-white shadow-custom rounded-md py-6 px-8 hover:border-2 hover:border-indigo-400 border-misc-white border-2">
        <h2 className="font-bold text-slate-700">{`${user?.firstName ?? ''} ${
          user?.lastName ?? ''
        }`}</h2>
        <span className="text-sm text-slate-400">@{user?.username ?? ''}</span>
        <section className="mt-4 flex flex-wrap items-start justify-start gap-x-4 gap-y-2">
          <div>
            <span className="font-bold text-slate-800">
              {String(user?.followerCount ?? '')}
            </span>{' '}
            <span className="text-slate-500 text-sm">Followers</span>
          </div>
          <div>
            <span className="font-bold text-slate-800">
              {String(user?.followingCount ?? '')}
            </span>{' '}
            <span className="text-slate-500 text-sm">Following</span>
          </div>
          <div>
            <span className="font-bold text-slate-800">
              {String(user?.postCount ?? '')}
            </span>{' '}
            <span className="text-slate-500 text-sm">Posts</span>
          </div>
        </section>
      </div>
    </Link>
  );
}
