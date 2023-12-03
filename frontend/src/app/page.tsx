'use client';

import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const [user] = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (user) router.push('/feed');
    else router.push('/login');
  }, [user]);

  return (
    <main className="bg-neutral-100 flex min-h-screen flex-col items-center justify-between p-24" />
  );
}
