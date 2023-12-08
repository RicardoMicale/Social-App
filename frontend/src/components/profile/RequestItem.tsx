import { FollowRequest } from '@/models';
import React from 'react';
import CheckIcon from '../icons/CheckIcon';
import DeleteIcon from '../icons/DeleteIcon';
import { useMutation } from '@apollo/client';
import { MODIFY_FOLLOW_REQUEST } from '@/graphql/mutations';
import { ToastContext } from '@/context/ToastContext.context';

interface RequestItemProps {
  followRequest: FollowRequest;
}

export default function RequestItem({ followRequest }: RequestItemProps) {
  //  STATES
  const [clickable, setClickable] = React.useState(true);
  const { notify } = React.useContext(ToastContext);

  //  MUTATIONS
  const [modifyFollowRequest] = useMutation(MODIFY_FOLLOW_REQUEST);

  //  FUNCTIONS

  const handleUpdate = async (newStatus: string) => {
    try {
      // prevents double clicking
      if (!clickable) return;
      setClickable(false);

      const request = await modifyFollowRequest({
        variables: {
          data: {
            request: followRequest?._id ?? '',
            status: newStatus,
          },
        },
      });

      if (request) {
        const notifyText =
          newStatus === 'accepted'
            ? 'You have a new follower!'
            : 'Request declined successfully';
        if (notify) notify(notifyText, 'success');
      }
    } catch (err) {
      console.log(err);
      if (notify) notify(`Error: ${err}`, 'error');
    } finally {
      setClickable(true);
    }
  };

  return (
    <div className="w-3/5 flex items-center justify-between bg-misc-white px-8 py-4 shadow-custom rounded-md">
      <div>
        <h3 className="font-bold text-slate-800">
          {`${followRequest?.sentBy?.firstName ?? ''} ${
            followRequest?.sentBy?.lastName ?? ''
          }`}
        </h3>
        <span className="text-slate-400 mt-2">
          @{followRequest?.sentBy?.username ?? ''}
        </span>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <button
          type="button"
          className="px-6 py-2 flex items-center justify-center gap-2 rounded-md bg-emerald-400 text-misc-white hover:bg-emerald-500"
          onClick={(e) => {
            e.preventDefault();
            handleUpdate('accepted');
          }}
        >
          <CheckIcon className="h-5 w-5" />
          Accept
        </button>
        <button
          type="button"
          className="px-6 py-2 flex items-center justify-center gap-2 rounded-md bg-rose-600 text-misc-white hover:bg-rose-700"
          onClick={(e) => {
            e.preventDefault();
            handleUpdate('rejected');
          }}
        >
          <DeleteIcon className="h-5 w-5" />
          Decline
        </button>
      </div>
    </div>
  );
}
