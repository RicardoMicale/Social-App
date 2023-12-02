'use client';

import React from 'react';
import { User } from '../models';
import { useParams } from 'next/navigation';

interface UserContextProps {
  children: React.ReactNode;
}

export type UserContext = {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
};

const initialState = {};

const UserContext = React.createContext<UserContext>(initialState);

export function UserContextProvider({ children }: UserContextProps) {
  const [user, setUser] = React.useState<User>({});
  // TODO QUERY CURRENT USER

  const router = useParams();

  // current user
  // React.useEffect(
  //   function syncUserData() {
  //     if (!userLoading && userData) {
  //       localStorage.setItem('user', userData?.currentUser?._id);
  //       setUser(userData?.currentUser);
  //     } else if (!userData?.currentUser?._id) {
  //       if (
  //         localStorage.getItem('login') !== '1' &&
  //         router.pathname.includes('/app')
  //       )
  //         router.push('/login');
  //     }
  //   },
  //   [userData, userLoading]
  // );

  const context = React.useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}
