'use client';

import React from 'react';
import RegisterForm from './RegisterForm';

export default function Register() {
  return (
    <div className="w-full grid lg:grid-cols-2 place-items-center gap-4 py-8">
      <RegisterForm />
    </div>
  );
}
