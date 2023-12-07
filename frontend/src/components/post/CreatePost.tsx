import React from 'react';
import PostForm from './PostForm';
import { Post } from '@/models';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '@/graphql/mutations';
import { ToastContext } from '@/context/ToastContext.context';
import { useUser } from '@/hooks/useUser';

export default function CreatePost() {
  //  STATES
  const [post, setPost] = React.useState<Post>({});
  const [clickable, setClickable] = React.useState(true);
  const { notify } = React.useContext(ToastContext);
  const [user] = useUser();

  //  MUTATIONS
  const [createPost] = useMutation(CREATE_POST);

  const handleCreate = async () => {
    try {
      //  prevents double clicking
      if (!clickable) {
        return;
      }
      setClickable(false);

      const newPost = await createPost({
        variables: {
          data: {
            title: post?.title ?? '',
            body: post?.body ?? '',
            author: user?._id ?? '',
          },
        },
      });

      if (newPost) {
        if (notify) notify('Post created successfully', 'success');
        setPost({});
      }
    } catch (err) {
      console.log(err);
      if (notify) notify(`Error: ${err}`, 'error');
    } finally {
      setClickable(true);
    }
  };

  //  VARIABLES
  const actions = [
    {
      name: 'Submit',
      action: handleCreate,
    },
  ];

  return <PostForm post={post} setPost={setPost} actions={actions} />;
}
