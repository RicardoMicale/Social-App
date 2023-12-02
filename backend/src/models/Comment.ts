import { Schema, Document, model, Types } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { UserDocument, UserTC, PostDocument, PostTC } from '.';

export interface CommentDocument extends Document {
  body: string;
  author: Types.ObjectId | UserDocument;
  post: Types.ObjectId | PostDocument;
  createdAt?: Date;
  updatedAt?: Date;
  active?: Boolean;
}

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, 'Do not leave your comment empty! '],
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Comment = model<CommentDocument>('Comment', commentSchema);
export const CommentTC = composeMongoose(Comment);

CommentTC.addRelation('user', {
  resolver: () => UserTC.mongooseResolvers.dataLoader(),
  prepareArgs: {
    _id: (source) => source.author,
    skip: null,
    sort: null,
  },
  projection: { user: 1 },
});

CommentTC.addRelation('post', {
  resolver: () => PostTC.mongooseResolvers.dataLoader(),
  prepareArgs: {
    _id: (source) => source.post,
    skip: null,
    sort: null,
  },
  projection: { post: 1 },
});
