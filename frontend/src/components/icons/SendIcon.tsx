import React from 'react';

function SendIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
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
        d="M8 12h4m-4.27-.486L4.57 5.826c-.477-.86.442-1.82 1.322-1.38l13.32 6.66a1 1 0 010 1.788l-13.32 6.66c-.88.44-1.8-.52-1.322-1.38l3.16-5.688a1 1 0 000-.972z"
      />
    </svg>
  );
}

export default SendIcon;
