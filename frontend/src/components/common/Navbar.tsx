'use client';

import React from 'react';
import { routes } from '../../../routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="w-full flex items-center justify-between px-16 py-6">
      <Link href="/feed" className="font-bold text-indigo-600">
        Social App
      </Link>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {routes.map((route) => (
          <Link
            key={route.as}
            href={route.href}
            className={`${
              pathname.includes(route.as) ||
              (pathname === '/' && route.as === 'feed')
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-slate-700 hover:bg-slate-100'
            } flex items-center justify-center gap-4 py-2.5 px-6 rounded-md`}
          >
            {route.icon}
            <span>{route.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
