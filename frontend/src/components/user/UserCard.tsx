'use client';

import React from 'react';
import Image from 'next/image';
import { User } from '@/models';
import Card from '../common/Card';
import { useUser } from '@/hooks/useUser';
import AddIcon from '../icons/AddIcon';
import { useMutation } from '@apollo/client';
import { FOLLOW_USER } from '@/graphql/mutations';
import { ToastContext } from '@/context/ToastContext.context';

interface UserCardProps {
  currentUser: User;
}

export default function UserCard({ currentUser }: UserCardProps) {
  const [user] = useUser();
  const { notify } = React.useContext(ToastContext);

  //  STATES
  const [clickable, setClickable] = React.useState(true);

  //  MUTATIONS
  const [followUser] = useMutation(FOLLOW_USER);

  //  FUNCTIONS
  const sendFollow = async () => {
    try {
      //  prevents double clicking
      if (!clickable) return;
      setClickable(false);

      const sentBy = user?._id ?? '';
      const sentTo = currentUser?._id ?? '';

      const request = await followUser({
        variables: {
          data: {
            sentTo,
            sentBy,
          },
        },
      });

      if (request) {
        if (notify) notify('Follow request sent', 'success');
      }
    } catch (err) {
      console.log(err);
      if (notify) notify(`Error: ${err}`, 'error');
    } finally {
      setClickable(true);
    }
  };

  const followsMe = () => {
    //  checks if the user from the profile is following the logged in user
    //  if this is my profile, return false
    if (currentUser?._id === user?._id) return false;
    //  if this user does not have followers, return false
    if (currentUser?.followers?.length === 0) return false;

    // if the logged user is not in the followers list, return false
    const follower = currentUser?.followers?.reduce((acc, u) => {
      if (u?._id === user?._id) return true;
      return false;
    }, false);

    if (!follower) return false;

    return true;
  };

  const imFollowing = () => {
    //  checks if the user logged in is following this profiles user
    //  if this is my profile, return false
    if (currentUser?._id === user?._id) return false;
    //  if this user is not following, return false
    if (currentUser?.following?.length === 0) return false;

    //  if the logged user is not in the following of the users profile, return false
    const following = currentUser?.following?.reduce((acc, u) => {
      if (u?._id === user?._id) return true;
      return false;
    }, false);

    if (!following) return false;

    return true;
  };

  const hasRequest = () => {
    //  checks if the logged user has requested to follow the profiles user
    //  if this is my profile, return false
    if (currentUser?._id === user?._id) return false;
    //  if the user does not have requests, return false
    if (currentUser?.followRequests?.length === 0) return false;

    //  if the requests does not have the logged users id, return false
    const request = currentUser?.followRequests?.reduce((acc, fr) => {
      if (fr?.sentBy?._id === user?._id) return true;
      return false;
    }, false);

    if (!request) return false;

    return true;
  };

  const canFollow = () => {
    return currentUser?._id !== user?._id && !imFollowing() && !hasRequest();
  };

  return (
    <Card>
      <Image
        src={currentUser?.photo ?? '/circle.png'}
        alt={currentUser?.username ?? 'User profile picture'}
        width={200}
        height={200}
        className="rounded-full"
      />
      <div className="mt-8">
        <h3 className="font-bold text-slate-700 text-xl">
          {`${currentUser?.firstName ?? ''} ${currentUser?.lastName ?? ''}`}
        </h3>
        <span className="text-slate-400 text-sm">
          @{currentUser?.username ?? ''}
        </span>
        <div className="flex flex-col items-start justify-start mt-2">
          {followsMe() && !imFollowing() && (
            <span className="bg-slate-200 text-slate-700 rounded-sm text-xs px-2 py-1">
              Follows you
            </span>
          )}
          {followsMe() && imFollowing() && (
            <span className="bg-slate-200 text-slate-700 rounded-sm text-xs px-2 py-1">
              You follow each other
            </span>
          )}
        </div>
        <section className="mt-4 flex flex-wrap items-start justify-start gap-x-4 gap-y-2">
          <div>
            <span className="font-bold text-slate-800">
              {String(currentUser?.followerCount ?? '')}
            </span>{' '}
            <span className="text-slate-500 text-sm">Followers</span>
          </div>
          <div>
            <span className="font-bold text-slate-800">
              {String(currentUser?.followingCount ?? '')}
            </span>{' '}
            <span className="text-slate-500 text-sm">Following</span>
          </div>
          <div>
            <span className="font-bold text-slate-800">
              {String(currentUser?.postCount ?? '')}
            </span>{' '}
            <span className="text-slate-500 text-sm">Posts</span>
          </div>
        </section>
        {canFollow() && (
          <section className="mt-4">
            <button
              type="button"
              className="flex items-center justify-between gap-2 text-indigo-700"
              onClick={sendFollow}
            >
              <AddIcon className="h-4 w-4" />
              Follow
            </button>
          </section>
        )}
        {hasRequest() && <span className="">Pending</span>}
      </div>
    </Card>
  );
}
