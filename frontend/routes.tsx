import FeedIcon from '@/components/icons/FeedIcon';
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
    icon: <FeedIcon className="w-5 h-5" />,
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
    as: 'search',
    icon: <SearchIcon className="w-5 h-5" />,
  },
];
