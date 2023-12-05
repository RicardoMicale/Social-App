'use client';

import React from 'react';
import { User } from '../models';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '@/graphql/queries';

interface UserContextProps {
  children: React.ReactNode;
}

export type TUserContext = {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = React.createContext<TUserContext>({});

export function UserContextProvider({ children }: UserContextProps) {
  const firebaseId =
    typeof window !== 'undefined' ? localStorage.getItem('firebaseId') : '';

  const { loading, data, error } = useQuery<{ me: User }>(CURRENT_USER, {
    variables: {
      data: {
        firebaseId,
      },
    },
  });
  const [user, setUser] = React.useState<User>({});
  // TODO QUERY CURRENT USER

  const router = useRouter();

  //  current user
  React.useEffect(
    function syncUserData() {
      if (!loading && data) {
        localStorage.setItem('user', data?.me?._id ?? '');
        setUser(data?.me);
        console.log(data?.me);
      } else if (!data?.me?._id) {
        if (localStorage.getItem('firebaseId') === '') router.push('/login');
      }
    },
    [data, loading]
  );

  const context = React.useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}
