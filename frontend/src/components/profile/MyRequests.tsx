'use client';

import { GET_REQUESTS } from '@/graphql/queries';
import { useUser } from '@/hooks/useUser';
import { FollowRequest } from '@/models';
import { useQuery } from '@apollo/client';
import React from 'react';
import RequestItem from './RequestItem';
import Loading from '../common/Loading';

export default function MyRequests() {
  const [user] = useUser();
  //  STATES

  const [requests, setRequests] = React.useState<FollowRequest[]>([]);
  const [requestCount, setRequestCount] = React.useState(0);

  //  QUERIES
  const { data, loading } = useQuery<{
    getFollowRequests: {
      followRequests: FollowRequest[];
      followRequestsCount: number;
    };
  }>(GET_REQUESTS, {
    variables: {
      data: {
        userId: user?._id ?? '',
      },
    },
  });

  React.useEffect(() => {
    if (!loading && data) {
      setRequests([...(data?.getFollowRequests?.followRequests ?? [])]);
      setRequestCount(data?.getFollowRequests?.followRequestsCount ?? 0);
    }
  }, [data, loading]);

  if (loading) return <Loading />;

  return (
    <div className="py-16">
      <h2 className="font-bold text-slate-700 text-xl mb-2">Follow requests</h2>
      <span className="text-slate-500">
        You have {requestCount} follower requests
      </span>
      <div className="mt-6">
        {requests?.map((request) => (
          <RequestItem followRequest={request} key={request?._id} />
        ))}
      </div>
    </div>
  );
}
