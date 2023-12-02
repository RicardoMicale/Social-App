import SearchIcon from '@/components/icons/SearchIcon';
import UserIcon from '@/components/icons/UserIcon';
import React from 'react';

interface IRoute {
  name: string;
  href: string;
  as: string;
  icon: React.ReactNode;
}

export const routes: IRoute[] = [
  {
    name: 'Feed',
    href: '/',
    as: 'feed',
    icon: null,
  },
  {
    name: 'Profile',
    href: '/profile',
    as: 'profile',
    icon: <UserIcon className="w-5 h-5" />,
  },
  {
    name: 'Search',
    href: '/search',
    as: 'home',
    icon: <SearchIcon className="w-5 h-5" />,
  },
];
