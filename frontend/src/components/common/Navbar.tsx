'use client';

import React from 'react';
import { routes } from '../../../routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import SignInIcon from '../icons/SignInIcon';
import EditIcon from '../icons/EditIcon';

export default function Navbar() {
  const pathname = usePathname();
  const [user] = useUser();

  return (
    <div className="w-full flex items-center justify-between px-16 py-6 bg-misc-white">
      <Link href="/feed" className="font-bold text-indigo-600">
        Social App
      </Link>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {user && Object.keys(user).length > 0 ? (
          routes.map((route) => (
            <Link
              key={route.as}
              href={route.href}
              className={`${
                pathname.includes(route.as) ||
                (pathname === '/' && route.as === 'feed')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-slate-800 hover:bg-slate-200'
              } flex items-center justify-center gap-4 py-2.5 px-6 rounded-md`}
            >
              {route.icon}
              <span>{route.name}</span>
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-between gap-4 flex-row md:flex-row ">
            <Link
              href="/login"
              className="px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-slate-200 text-slate-800"
            >
              <SignInIcon className="h-5 w-5" />
              Log in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-md flex items-center justify-center gap-2 bg-indigo-600 text-misc-white hover:bg-indigo-500"
            >
              <EditIcon className="h-5 w-5" />
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
