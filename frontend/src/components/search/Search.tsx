'use client';

import React from 'react';
import SearchBar from './SearchBar';
import { Post, User } from '@/models';
import PostItem from '../post/PostItem';
import { useQuery } from '@apollo/client';
import { GET_POSTS, GET_USERS } from '@/graphql/queries';
import { filterPosts, filterUser } from '@/lib/filters';
import UserSearchCard from './UserSearchCard';

export default function Search() {
  //  STATES
  const [users, setUsers] = React.useState<User[]>([]);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [userSearch, setUserSearch] = React.useState('');
  const [postSearch, setPostSearch] = React.useState('');

  //  QUERIES
  const { data: postsData, loading: postsLoading } = useQuery<{
    getPosts: { posts: Post[] };
  }>(GET_POSTS);

  const { data: usersData, loading: usersLoading } = useQuery<{
    users: User[];
  }>(GET_USERS);

  //  FUNCTIONS
  const searchPosts = () => {
    setPosts([...filterPosts(postSearch, postsData?.getPosts?.posts ?? [])]);
  };

  const searchUsers = () => {
    setUsers([...filterUser(userSearch, usersData?.users ?? [])]);
  };

  return (
    <div className="py-8">
      <h2 className="text-xl font-bold text-slate-700 mt-4 mb-8">Search</h2>
      <div className="w-full flex flex-col items-start justify-start gap-8">
        <section className="w-full  md:w-3/5">
          <SearchBar
            label="Search user"
            description="Search by username, first name, last name or email"
            placeholder="Enter your search here..."
            search={userSearch}
            setSearch={setUserSearch}
            submit={searchUsers}
          />
        </section>
        <div className="w-full flex flex-row flex-wrap items-center justify-start gap-4">
          {users?.length > 0 ? (
            users?.map((user) => <UserSearchCard key={user?._id} user={user} />)
          ) : (
            <span className="text-slate-700">No users found</span>
          )}
        </div>
        <section className="w-full md:w-3/5">
          <SearchBar
            placeholder="Enter your search here..."
            label="Search by keywords"
            search={postSearch}
            setSearch={setPostSearch}
            submit={searchPosts}
          />
        </section>
        <div className="w-3/5 flex flex-col items-start justify-start gap-8">
          {posts?.length > 0 ? (
            posts?.map((post) => (
              <PostItem
                post={post ?? {}}
                author={post?.author ?? {}}
                key={post?._id}
              />
            ))
          ) : (
            <span className="text-slate-700">No posts found</span>
          )}
        </div>
      </div>
    </div>
  );
}
