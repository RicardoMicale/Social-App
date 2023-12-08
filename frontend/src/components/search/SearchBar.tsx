'use client';

import React from 'react';
import SearchIcon from '../icons/SearchIcon';

interface SearchBarProps {
  placeholder?: string;
  submit: () => void;
  label?: string;
  description?: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  placeholder = '',
  submit,
  label,
  description,
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex flex-col justify-start items-start bg-misc-white py-4 px-6 rounded-md shadow-custom gap-1"
    >
      <label htmlFor="search" className="text-slate-600 font-bold">
        {label}
      </label>
      <span className="text-sm text-slate-500 mb-2">{description}</span>
      <div className="w-full flex flex-col md:flex-row items-start justify-start gap-4">
        <input
          type="text"
          name="search"
          id="search"
          placeholder={placeholder}
          className="bg-slate-100 px-4 py-2 rounded-md w-full border-[1px] border-slate-200 text-sm"
          onChange={(e) => {
            e.preventDefault;
            setSearch(e.target.value);
          }}
        />
        <button
          type="submit"
          className="px-8 py-2 rounded-md flex items-center justify-between gap-2 bg-indigo-600 text-misc-white hover:bg-indigo-500"
        >
          <SearchIcon className="h-4 w-4" />
          Search
        </button>
      </div>
    </form>
  );
}
