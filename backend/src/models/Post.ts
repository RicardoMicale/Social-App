import { Schema, Document, model, Types } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import {
  CommentDocument,
  CommentTC,
  LikeDocument,
  LikeTC,
  UserDocument,
  UserTC,
} from '.';

export interface PostDocument extends Document {
  title: string;
  body: string;
  author: Types.ObjectId | UserDocument;
  comments?: (Types.ObjectId | CommentDocument)[];
  commentCount?: Number;
  likes?: (Types.ObjectId | LikeDocument)[];
  likeCount?: Number;
  createdAt?: Date;
  updatedAt?: Date;
  active?: Boolean;
}

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Enter a post title'],
      trim: true,
    },
    body: {
      type: String,
      required: [true, 'Enter your post body text'],
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    commentCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Like',
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Post = model<PostDocument>('Post', postSchema);
export const PostTC = composeMongoose(Post);

PostTC.addRelation('user', {
  resolver: () => UserTC.mongooseResolvers.dataLoader(),
  prepareArgs: {
    _id: (source) => source.author,
    skip: null,
    sort: null,
  },
  projection: { user: 1 },
});

PostTC.addRelation('comment', {
  resolver: () => CommentTC.mongooseResolvers.dataLoaderMany(),
  prepareArgs: {
    _ids: (source) => source.comments,
    skip: null,
    sort: null,
  },
  projection: { comment: 1 },
});

PostTC.addRelation('like', {
  resolver: () => LikeTC.mongooseResolvers.dataLoaderMany(),
  prepareArgs: {
    _ids: (source) => source.likes,
    skip: null,
    sort: null,
  },
  projection: { like: 1 },
});
