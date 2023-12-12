import React from 'react';
import Form from '../common/Form';
import SendIcon from '../icons/SendIcon';
import { ToastContext } from '@/context/ToastContext.context';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '@/graphql/mutations';
import { useParams } from 'next/navigation';
import { useUser } from '@/hooks/useUser';

export default function CommentForm() {
  //  STATES
  const [comment, setComment] = React.useState('');
  const [clickable, setClickable] = React.useState(true);
  const { notify } = React.useContext(ToastContext);
  const params = useParams();
  const [user] = useUser();

  //  MUTATIONS
  const [createComment] = useMutation(CREATE_COMMENT);

  //  FUNCTIONS

  const handleSubmit = async () => {
    try {
      //  prevents double clicking
      if (!clickable) return;
      setClickable(false);

      if (!comment.trim().length) {
        if (notify) notify('Comment must have a body of text', 'warning');
        return;
      }

      const newComment = await createComment({
        variables: {
          data: {
            body: comment,
            postId: params?.id ?? '',
            userId: user?._id ?? '',
          },
        },
      });

      if (newComment) {
        if (notify) notify('Commented successfully', 'success');
      }
    } catch (err) {
      console.log(err);
      if (notify) notify(`Error: ${err}`, 'error');
    } finally {
      setClickable(true);
    }
  };

  const actions = [
    {
      name: 'Send comment',
      action: handleSubmit,
      icon: <SendIcon className="h-5 w-5" />,
    },
  ];

  return (
    <Form title="Comment about this post" actions={actions}>
      <div className="flex flex-col justify-start items-start w-full gap-1">
        <textarea
          placeholder="Write your tex here..."
          name="body"
          id="body"
          className="resize-none bg-slate-100 px-4 py-2 rounded-md w-full border-[1px] border-slate-200 text-sm h-40"
          onChange={(e) => {
            e.preventDefault();
            setComment(e.target.value);
          }}
        />
      </div>
    </Form>
  );
}
