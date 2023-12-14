import { app } from './firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage(app);

export const uploadImage = async (path: string, file: File) => {
  const imageStore = ref(storage, `images/${path}`);
  const res = await uploadBytes(imageStore, file);
  return res;
};

export const getImage = async (path: string) => {
  const imageStore = ref(storage, path);
  const url = await getDownloadURL(imageStore);
  return url;
};
