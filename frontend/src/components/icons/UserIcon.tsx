import React from 'react';

function UserIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M12 14.5A6.25 6.25 0 1012 2a6.25 6.25 0 000 12.5zm0 0c-5.523 0-10 3.358-10 7.5m10-7.5c5.523 0 10 3.358 10 7.5"
      ></path>
    </svg>
  );
}

export default UserIcon;
