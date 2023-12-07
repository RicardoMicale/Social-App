'use client';

import React from 'react';
import { Post } from '@/models';
import Form from '../common/Form';

interface PostFormProps {
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  actions?: { name: string; action: () => void }[];
}

export default function PostForm({ post, setPost, actions }: PostFormProps) {
  return (
    <Form title="Share your thoughts!" actions={actions}>
      <section className="flex flex-col justify-center items-start gap-4">
        <div className="flex flex-col justify-start items-start w-full gap-1">
          <label htmlFor="title" className="text-sm text-slate-500 ml-1">
            Title
          </label>
          <input
            type="text"
            placeholder="What is the post about?"
            name="title"
            id="title"
            className="bg-slate-100 px-4 py-2 rounded-md w-full border-[1px] border-slate-200 text-sm"
            onChange={(e) => {
              e.preventDefault();
              setPost({ ...post, title: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-1">
          <label htmlFor="body" className="text-sm text-slate-500 ml-1">
            Content
          </label>
          <textarea
            placeholder="Write your tex here..."
            name="body"
            id="body"
            className="resize-none bg-slate-100 px-4 py-2 rounded-md w-full border-[1px] border-slate-200 text-sm h-40"
            onChange={(e) => {
              e.preventDefault();
              if (setPost) setPost({ ...post, body: e.target.value });
            }}
          />
        </div>
      </section>
    </Form>
  );
}
