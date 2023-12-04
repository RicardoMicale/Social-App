'use client';

import React from 'react';

interface FormProps {
  children: React.ReactNode;
  title: string;
  actions?: { name: string; action: () => void }[];
}

export default function Form({ children, title, actions }: FormProps) {
  return (
    <form className="w-11/12 bg-misc-white p-6 rounded-md flex flex-col justify-between items-center gap-4 shadow-custom">
      <h3 className="w-full font-bold text-slate-700 mb-4 border-b-[1px] border-b-slate-100 pb-2">
        {title}
      </h3>
      <div className="w-full mb-6">{children}</div>
      <div className="w-full flex flex-col-reverse md:flex-row-reverse justify-start items-center gap-4">
        {actions?.map((_action, index) => (
          <button
            key={index}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              _action?.action();
            }}
            className={`${
              index === 0
                ? 'bg-indigo-600 text-misc-white hover:bg-indigo-500'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            } px-8 py-2 rounded-md`}
          >
            {_action?.name ?? ''}
          </button>
        )) ?? null}
      </div>
    </form>
  );
}
