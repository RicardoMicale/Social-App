import { Schema, Document, model, Types } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import bcrypt from 'bcryptjs';
import { PostDocument, PostTC } from '.';

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
  postCount?: Number;
  followers?: (Types.ObjectId | UserDocument)[];
  follower_count?: Number;
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

UserTC.addRelation('post', {
  resolver: () => PostTC.mongooseResolvers.dataLoaderMany(),
  prepareArgs: {
    _ids: (source) => source.posts,
    skip: null,
    sort: null,
  },
  projection: { post: 1 },
});
