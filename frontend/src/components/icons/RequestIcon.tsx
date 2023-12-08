import React from 'react';

function RequestIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_1_15917)">
        <path
          fill="currentColor"
          d="M3.73 22.455l.454-.891-.454.891zM1.545 20.27l.891-.454-.891.454zm16.91 0l-.891-.454.891.454zm-2.185 2.185l-.454-.891.454.891zm0-16.91l-.454.891.454-.891zm2.185 2.185l-.891.454.891-.454zM3.73 5.545l.454.891-.454-.891zM1.545 7.73l.891.454-.891-.454zM19 18a1 1 0 100 2v-2zM4 5a1 1 0 002 0H4zm1.309 11.278a1 1 0 001.382 1.444L5.31 16.278zm8 1.444a1 1 0 101.383-1.444l-1.383 1.444zM9 6h2V4H9v2zm9 7v2h2v-2h-2zm-7 9H9v2h2v-2zm-9-7v-2H0v2h2zm7 7c-1.417 0-2.419 0-3.203-.065-.771-.063-1.243-.182-1.613-.371l-.908 1.782c.7.356 1.463.51 2.359.583C6.519 24 7.616 24 9 24v-2zm-9-7c0 1.384 0 2.482.071 3.365.074.896.227 1.66.583 2.359l1.782-.908c-.189-.37-.308-.841-.371-1.613C2 17.419 2 16.417 2 15H0zm4.184 6.564a4 4 0 01-1.748-1.748l-1.782.908a6 6 0 002.622 2.622l.908-1.782zM18 15c0 1.417 0 2.419-.065 3.203-.063.771-.182 1.243-.371 1.613l1.782.908c.356-.7.51-1.463.583-2.359C20 17.482 20 16.384 20 15h-2zm-7 9c1.384 0 2.482 0 3.365-.071.896-.074 1.66-.227 2.359-.583l-.908-1.782c-.37.189-.841.308-1.613.371C13.419 22 12.417 22 11 22v2zm6.564-4.184a4 4 0 01-1.748 1.748l.908 1.782a6 6 0 002.622-2.622l-1.782-.908zM11 6c1.417 0 2.419 0 3.203.065.772.063 1.243.182 1.613.371l.908-1.782c-.7-.356-1.463-.51-2.359-.583C13.482 4 12.384 4 11 4v2zm9 7c0-1.384 0-2.482-.071-3.365-.074-.896-.227-1.66-.583-2.359l-1.782.908c.189.37.308.842.371 1.613C18 10.581 18 11.583 18 13h2zm-4.184-6.564a4 4 0 011.748 1.748l1.782-.908a6 6 0 00-2.622-2.622l-.908 1.782zM9 4c-1.384 0-2.481 0-3.365.071-.896.074-1.66.227-2.359.583l.908 1.782c.37-.189.842-.308 1.613-.371C6.581 6 7.583 6 9 6V4zm-7 9c0-1.417 0-2.419.065-3.203.063-.771.182-1.243.371-1.613L.654 7.276c-.356.7-.51 1.463-.583 2.359C0 10.518 0 11.616 0 13h2zm1.276-8.346A6 6 0 00.654 7.276l1.782.908a4 4 0 011.748-1.748l-.908-1.782zM9 2h9V0H9v2zm13 4v9h2V6h-2zm0 9a3 3 0 01-3 3v2a5 5 0 005-5h-2zM18 2a4 4 0 014 4h2a6 6 0 00-6-6v2zM9 0a5 5 0 00-5 5h2a3 3 0 013-3V0zM6.691 17.722c1.823-1.744 4.795-1.744 6.618 0l1.383-1.444c-2.596-2.485-6.788-2.485-9.383 0l1.382 1.444zm4.992-5.185c0 .808-.697 1.537-1.65 1.537v2c1.974 0 3.65-1.543 3.65-3.537h-2zm-1.65 1.537c-.953 0-1.65-.729-1.65-1.537h-2c0 1.994 1.676 3.537 3.65 3.537v-2zm-1.65-1.537c0-.808.697-1.537 1.65-1.537V9c-1.974 0-3.65 1.543-3.65 3.537h2zM10.033 11c.953 0 1.65.729 1.65 1.537h2c0-1.994-1.676-3.537-3.65-3.537v2z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_1_15917">
          <path fill="currentColor" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default RequestIcon;
