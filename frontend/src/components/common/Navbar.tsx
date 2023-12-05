'use client';

import React from 'react';
import { routes } from '../../../routes';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import SignInIcon from '../icons/SignInIcon';
import EditIcon from '../icons/EditIcon';
import SignOutIcon from '../icons/SignOutIcon';
import { useMutation } from '@apollo/client';
import { SIGN_OUT } from '@/graphql/mutations';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useUser();

  const [signOut] = useMutation(SIGN_OUT);

  const logOut = async () => {
    try {
      const success = await signOut();
      if (success) {
        router.push('/login');
        localStorage.setItem('firebaseId', '');
        if (setUser) setUser({});
      }
    } catch (err) {
      console.log(err);
    }
  };

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
                  : 'text-slate-800 hover:bg-slate-100'
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
              className="px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-slate-100 text-slate-800"
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
        {user && Object.keys(user).length > 0 && (
          <button
            type="button"
            onClick={() => {
              logOut();
            }}
            className="px-4 py-2 rounded-md flex items-center justify-center gap-2 bg-indigo-600 text-misc-white hover:bg-indigo-500"
          >
            <SignOutIcon className="h-5 w-5" />
            Log out
          </button>
        )}
      </div>
    </div>
  );
}
