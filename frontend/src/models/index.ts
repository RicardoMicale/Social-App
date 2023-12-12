interface MongooseModel {
  _id?: string;
  __typename?: string;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
}

export type FollowStatus = 'accepted' | 'rejected' | 'pending';

export interface User extends MongooseModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  birthDate?: Date;
  password?: string;
  posts?: Post[];
  postCount?: number;
  followers?: User[];
  followRequests?: FollowRequest[];
  followRequestCount?: number;
  followerCount?: number;
  photo?: string;
  following?: User[];
  followingCount?: number;
}

export interface Post extends MongooseModel {
  title?: string;
  body?: string;
  author?: User;
  comments?: Comment[];
  commentCount?: number;
  likes?: Like[];
  likeCount?: number;
}

export interface Comment extends MongooseModel {
  body?: string;
  author?: User;
  post?: Post;
}

export interface Like extends MongooseModel {
  post?: Post;
  likedBy?: User;
}

export interface Trend extends MongooseModel {
  hashtag?: string;
  occurrences?: number;
}

export interface FollowRequest extends MongooseModel {
  status?: FollowStatus;
  sentBy?: User;
  sentTo?: User;
}
