interface MongooseModel {
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
}

export type FollowStatus = 'accepted' | 'rejected' | 'pending';

export interface User extends MongooseModel {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthDate?: Date;
  password?: string;
  posts?: Post[];
  postCount?: Number;
  followers?: User[];
  follower_count?: Number;
  photo?: string;
}

export interface Post extends MongooseModel {
  _id: string;
  title?: string;
  body?: string;
  author?: User;
  comments?: Comment[];
  commentCount?: Number;
  likes?: Like[];
  likeCount?: Number;
}

export interface Comment extends MongooseModel {
  _id: string;
  body?: string;
  author?: User;
  post?: Post;
}

export interface Like extends MongooseModel {
  _id: string;
  post?: Post;
  likedBy?: User;
}

export interface Trend extends MongooseModel {
  _id: string;
  hashtag?: string;
  occurrences?: Number;
}

export interface FollowRequest extends MongooseModel {
  _id: string;
  status: FollowStatus;
  sentBy: User;
  sentTo: User;
}
