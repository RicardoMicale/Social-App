'use client';

import React from 'react';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <div className="w-full grid lg:grid-cols-2 place-items-center gap-4 py-8">
      <LoginForm />
    </div>
  );
}
