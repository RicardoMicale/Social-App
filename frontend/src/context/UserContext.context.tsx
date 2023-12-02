'use client';

import React from 'react';
import { User } from '../models';

interface UserContextProps {
  children: React.ReactNode
}

export type UserContext = {
  user?: User,
  setUser?: React.Dispatch<React.SetStateAction<User>>,
};

const initialState = {};

const UserContext = React.createContext<UserContext>(initialState);

export function UserContextProvider({ children }: UserContextProps) {
  const [user, setUser] = React.useState<User>(null);
}
