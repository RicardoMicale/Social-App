import React from 'react';
import LoaderIcon from '../icons/LoaderIcon';

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoaderIcon className="h-12 w-12 animate-spin text-indigo-600" />
    </div>
  );
}
