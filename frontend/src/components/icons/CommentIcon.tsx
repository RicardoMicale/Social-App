import React from 'react';

function CommentIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
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
        strokeWidth="2"
        d="M12 21a9 9 0 10-8.384-5.721c.15.382.214.795.145 1.2l-.644 3.828a.5.5 0 00.576.576l3.829-.645a2.265 2.265 0 011.199.146A8.977 8.977 0 0012 21z"
      ></path>
    </svg>
  );
}

export default CommentIcon;
