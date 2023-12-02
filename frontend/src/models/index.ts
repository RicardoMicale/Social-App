interface MongooseModel {
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
}

export type FollowStatus = 'accepted' | 'rejected' | 'pending';

export interface User extends MongooseModel {
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
  title?: string;
  body?: string;
  author?: User;
  comments?: Comment[];
  commentCount?: Number;
  likes?: Like[];
  likeCount?: Number;
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
  occurrences?: Number;
}

export interface FollowRequest extends MongooseModel {
  status: FollowStatus;
  sentBy: User;
  sentTo: User;
}
