'use client';

import React from 'react';
import Form from '../common/Form';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import CloseIcon from '../icons/CloseIcon';
import { ToastContext } from '@/context/ToastContext.context';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  //  STATES
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const checks: string[] = [];

  const [, setUser] = useUser();
  const { notify } = React.useContext(ToastContext);
  const router = useRouter();

  //  MUTATIONS
  const [signUp] = useMutation(SIGN_UP);

  //  FUNCTIONS
  const validPassword = () => {
    const _checks: string[] = [];
    if (password.length < 8)
      _checks.push('Password must be 8 or more characters long');
    if (!/[0-9]/.test(password))
      _checks.push('Password must contain at least one number');
    if (!/[a-z]/.test(password))
      _checks.push('Password must contain at least one lowercase letter');
    if (!/[A-Z]/.test(password))
      _checks.push('Password must contain at least one uppercase letter');

    return _checks;
  };

  const handleRegister = async () => {
    try {
      if (checks?.length > 0 || password === '') {
        if (notify) notify('Invalid password!', 'error');
        return;
      }

      if (password.length > 0 && password !== repeatPassword) {
        if (notify) notify(`Passwords don't match`, 'error');
        return;
      }
      console.log('password check passed');

      const newUser = await signUp({
        variables: {
          data: {
            email,
            password,
            username,
            firstName,
            lastName,
          },
        },
      });

      if (newUser) {
        if (notify && setUser) {
          notify('You have been registered', 'success');
          setUser({ ...newUser?.data?.signUp });
          console.log(newUser);
          localStorage.setItem(
            'firebaseId',
            newUser?.data?.signUp?.user?.firebaseId
          );
        }
        router.push('/feed');
      }
    } catch (err) {
      console.log(err);
      if (notify) notify(`Error: ${err}`, 'error');
    }
  };

  //  EFFECT
  React.useEffect(() => {
    checks.concat(...validPassword());
  }, [password, setPassword]);

  //  VARIABLES
  const actions = [
    {
      name: 'Register',
      action: handleRegister,
    },
  ];
  return (
    <div className="w-full flex flex-col justify-start items-start gap-4 mt-8">
      <Form title="Create an account" actions={actions}>
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

          <div className="flex flex-col md:flex-row justify-start items-start w-full gap-3">
            <div className="w-1/2 flex flex-col justify-start gap-1">
              <label
                htmlFor="firstName"
                className="text-sm text-slate-500 ml-1"
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name here..."
                name="firstName"
                className="bg-slate-100 px-4 py-2 rounded-md w-full border-[1px] border-slate-200 text-sm"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="w-1/2 flex flex-col justify-start gap-1">
              <label htmlFor="lastName" className="text-sm text-slate-500 ml-1">
                Last name
              </label>
              <input
                type="text"
                placeholder="Enter your last name here..."
                name="lastName"
                className="bg-slate-100 px-4 py-2 rounded-md w-full border-[1px] border-slate-200 text-sm"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full gap-1">
            <label htmlFor="username" className="text-sm text-slate-500 ml-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username here..."
              name="username"
              className="bg-slate-100 px-4 py-2 rounded-md w-full border-[1px] border-slate-200 text-sm"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col justify-start items-start w-full gap-1">
            <label htmlFor="password" className="text-sm text-slate-500 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              name="password"
              className="bg-slate-100 px-4 py-2 rounded-md w-full border-[1px] border-slate-200 text-sm"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {checks?.length > 0 && (
              <div>
                {checks.map((check, index) => (
                  <span
                    key={index}
                    className="text-red-500 text-xs flex items-center justify-start"
                  >
                    <CloseIcon className="h-3 w-3" />
                    {check}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-start items-start w-full gap-1">
            <label htmlFor="password2" className="text-sm text-slate-500 ml-1">
              Repeat password
            </label>
            <input
              type="password"
              placeholder="********"
              name="password2"
              className="bg-slate-100 px-4 py-2 rounded-md w-full border-[1px] border-slate-200 text-sm"
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
            />
          </div>
          {password !== repeatPassword && password.length > 0 && (
            <span className="text-red-500 text-xs flex items-center justify-start">
              <CloseIcon className="h-3 w-3" />
              Passwords don{`'`}t match
            </span>
          )}
        </div>
      </Form>
      <span className="text-slate-600 text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-indigo-600 underline">
          Log in here!
        </Link>
      </span>
    </div>
  );
}
