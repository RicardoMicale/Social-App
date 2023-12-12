import React from 'react';
import { useUser } from '@/hooks/useUser';
import { Like } from '@/models';

interface LikeItemProps {
  like: Like;
}

export default function LikeItem({ like }: LikeItemProps) {
  //  STATES

  const [user] = useUser();

  //  MUTATIONS

  //  FUNCTIONS
  

  return (
    <div>
      <h3>{like?.likedBy?.username ?? ''}</h3>
    </div>
  );
}
