'use client';

import React from 'react';
import Form from '../common/Form';
import { useUser } from '@/hooks/useUser';
import { User } from '@/models';
import { ToastContext } from '@/context/ToastContext.context';
import SendIcon from '../icons/SendIcon';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '@/graphql/mutations';
import { getImage, uploadImage } from '../../../firebase/storage';

export default function EditProfileForm() {
  const acceptedFiles = ['.jpg', '.jpeg', '.png'];

  //  STATES
  const [user] = useUser();
  const [currentUser, setCurrentUser] = React.useState<User>({
    ...(user ?? {}),
    __typename: undefined,
    _id: undefined,
  });
  const [clickable, setClickable] = React.useState(true);
  const [photo, setPhoto] = React.useState<File>();
  const { notify } = React.useContext(ToastContext);

  //  MUTATIONS
  const [updateUser] = useMutation(UPDATE_USER);

  //  FUNCTIONS
  const handleUpdate = async () => {
    try {
      //  prevents double clicking
      if (!clickable) return;
      setClickable(false);

      const path = `${user?.username}/${photo?.name}`;

      let res;
      let photoURL = '';

      if (photo) {
        if (acceptedFiles.includes(photo.type)) {
          if (notify)
            notify(
              `File format not supported, please upload a file with the following extensions: ${acceptedFiles.toString()}`,
              'error'
            );
        }
        res = await uploadImage(path, photo);
        if (notify) notify('Updated profile picture successfully', 'success');
      }

      if (res) {
        photoURL = await getImage(res.ref.fullPath);
      }

      const updatedUser = await updateUser({
        variables: {
          record: { ...currentUser, photo: photo?.name ? photoURL : null },
          filter: { _id: user?._id ?? '' },
        },
      });

      if (updatedUser) {
        if (notify) notify('Update profile successfully', 'success');
      }
    } catch (err) {
      console.log(err);
      // if (notify) notify(`Error: ${err}`, 'error');
    } finally {
      setClickable(true);
    }
  };

  const actions = [
    {
      name: 'Update profile',
      action: handleUpdate,
      icon: <SendIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="pt-16 px-32">
      <Form title="Edit profile" actions={actions}>
        <div className="flex flex-col md:flex-row justify-start items-start w-full gap-3">
          <div className="w-1/2 flex flex-col justify-start gap-1">
            <label htmlFor="firstName" className="text-sm text-slate-500 ml-1">
              Name
            </label>
            <input
              type="text"
              value={currentUser?.firstName ?? ''}
              name="firstName"
              id="firstName"
              className="bg-slate-100 text-slate-600 px-4 py-2 rounded-md w-full border-[1px] border-slate-200 text-sm"
              onChange={(e) => {
                e.preventDefault();
                setCurrentUser({ ...currentUser, firstName: e.target.value });
              }}
            />
          </div>
          <div className="w-1/2 flex flex-col justify-start gap-1">
            <label htmlFor="lastName" className="text-sm text-slate-500 ml-1">
              Last name
            </label>
            <input
              type="text"
              value={currentUser?.lastName ?? ''}
              name="lastName"
              id="lastName"
              className="bg-slate-100 text-slate-600 px-4 py-2 rounded-md w-full border-[1px] border-slate-200 text-sm"
              onChange={(e) => {
                e.preventDefault();
                setCurrentUser({ ...currentUser, lastName: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="w-full flex flex-col justify-start gap-1 mt-4">
          <label htmlFor="birthdate" className="text-sm text-slate-500 ml-1">
            Birthday
          </label>
          <input
            type="date"
            value={currentUser?.birthDate?.toISOString() ?? 0}
            name="birthdate"
            id="birthdate"
            className="bg-slate-100 text-slate-600 px-4 py-2 rounded-md w-full border-[1px] border-slate-200 text-sm"
            onChange={(e) => {
              e.preventDefault();
              setCurrentUser({
                ...currentUser,
                birthDate: new Date(e.target.value),
              });
            }}
          />
        </div>

        <div className="w-full flex flex-col justify-start gap-1 mt-4">
          <label htmlFor="photo" className="text-sm text-slate-500 ml-1">
            Photo
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            className="bg-slate-100 text-slate-600 px-4 py-2 rounded-md w-full border-[1px] border-slate-200 text-sm"
            onChange={(e) => {
              e.preventDefault();
              if (!e.target.files) {
                return;
              }
              setPhoto(e.target.files[0]);
            }}
          />
        </div>
      </Form>
    </div>
  );
}
