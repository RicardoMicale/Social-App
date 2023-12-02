'use client';

export default function Home() {
  const user = null;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!user ? <span>a</span> : <span>feed</span>}
    </main>
  );
}
