import { Schema, Document, model, Types } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import bcrypt from 'bcryptjs';
import {
  FollowRequestDocument,
  FollowRequestTC,
  PostDocument,
  PostTC,
} from '.';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  birthDate?: Date;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  active?: Boolean;
  posts?: (Types.ObjectId | PostDocument)[];
  postCount?: number;
  followers?: (Types.ObjectId | UserDocument)[];
  followerCount?: number;
  followRequests?: (Types.ObjectId | FollowRequestDocument)[];
  followRequestCount?: number;
  following?: (Types.ObjectId | UserDocument)[];
  followingCount?: number;
  photo?: string;
  token?: string;
  firebaseId?: string;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter your first name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your last name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Please enter a valid username'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    active: {
      type: Boolean,
      default: true,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followerCount: {
      type: Number,
      default: 0,
    },
    followRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'FollowRequest',
      },
    ],
    followRequestCount: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    postCount: {
      type: Number,
      default: 0,
    },
    token: {
      type: String,
    },
    firebaseId: {
      type: String,
      unique: true,
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = model<UserDocument>('User', userSchema);
export const UserTC = composeMongoose(User);

UserTC.addRelation('posts', {
  resolver: () => PostTC.mongooseResolvers.dataLoaderMany(),
  prepareArgs: {
    _ids: (source) => source.posts,
    skip: null,
    sort: null,
  },
  projection: { post: 1 },
});

UserTC.addRelation('followRequests', {
  resolver: () => FollowRequestTC.mongooseResolvers.dataLoaderMany(),
  prepareArgs: {
    _ids: (source) => source.followRequests,
    skip: null,
    sort: null,
  },
  projection: { followRequest: 1 },
});

UserTC.addRelation('followers', {
  resolver: () => UserTC.mongooseResolvers.dataLoaderMany(),
  prepareArgs: {
    _ids: (source) => source.followers,
    skip: null,
    sort: null,
  },
  projection: { follower: 1 },
});

UserTC.addRelation('following', {
  resolver: () => UserTC.mongooseResolvers.dataLoaderMany(),
  prepareArgs: {
    _ids: (source) => source.following,
    skip: null,
    sort: null,
  },
  projection: { follower: 1 },
});
