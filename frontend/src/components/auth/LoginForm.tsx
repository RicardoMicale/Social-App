'use client';

import React from 'react';
import Form from '../common/Form';
import EyeOffIcon from '../icons/EyeOffIcon';
import EyeOnIcon from '../icons/EyeOnIcon';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '@/graphql/mutations';
import { ToastContext } from '@/context/ToastContext.context';
import { useNotify } from '@/hooks/useNotify';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  //  STATES
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [, setUser] = useUser();
  const { notify } = React.useContext(ToastContext);

  const router = useRouter();

  //  MUTATION
  const [signIn] = useMutation(SIGN_IN);

  //  FUNCTIONS
  const handleLogin = async () => {
    try {
      const user = await signIn({
        variables: {
          data: {
            email,
            password,
          },
        },
      });

      if (user?.data) {
        if (setUser) setUser({ ...user?.data.signIn?.user });
        if (notify) notify('Logged in successfully', 'success');

        localStorage.setItem(
          'firebaseId',
          user?.data?.signIn?.user?.firebaseId
        );
        router.push('/feed');
      }
    } catch (err) {
      console.log(err);
      if (notify) notify(`Error: ${err}`, 'error');
    }
  };

  //  VARIABLES
  const actions = [
    {
      name: 'Log in',
      action: handleLogin,
    },
  ];
  return (
    <div className="w-full flex flex-col justify-start items-start gap-4 mt-8">
      <Form title="Log in to your account" actions={actions}>
        <div className="flex flex-col justify-center items-start gap-4">
          <div className="flex flex-col justify-start items-start w-full gap-1">
            <label htmlFor="email" className="text-sm text-slate-500 ml-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email here..."
              name="email"
              className="bg-slate-100 px-4 py-2 rounded-md w-full border-[1px] border-slate-200 text-sm"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-1">
            <label htmlFor="password" className="text-sm text-slate-500 ml-1">
              Password
            </label>
            <div className="w-full flex justify-start items-center gap-4">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                name="password"
                className="bg-slate-100 px-4 py-2 rounded-md w-full border-[1px] border-slate-200 text-sm"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-600"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-6 w-6" />
                ) : (
                  <EyeOnIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </Form>
      <span className="text-slate-600 text-sm">
        Don{`'`}t have an account?{' '}
        <Link href="/register" className="text-indigo-600 underline">
          Register here!
        </Link>
      </span>
    </div>
  );
}
