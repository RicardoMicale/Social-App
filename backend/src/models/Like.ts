import { Schema, Document, model, Types } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { UserDocument, UserTC, PostDocument, PostTC } from '.';

export interface LikeDocument extends Document {
  post: Types.ObjectId | PostDocument;
  likedBy: Types.ObjectId | UserDocument;
  createdAt?: Date;
  updatedAt?: Date;
  active?: Boolean;
}

const likeSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Like = model<LikeDocument>('Like', likeSchema);
export const LikeTC = composeMongoose(Like);

LikeTC.addRelation('post', {
  resolver: () => PostTC.mongooseResolvers.dataLoader(),
  prepareArgs: {
    _id: (source) => source.post,
    skip: null,
    sort: null,
  },
  projection: { post: 1 },
});

LikeTC.addRelation('likedBy', {
  resolver: () => UserTC.mongooseResolvers.dataLoader(),
  prepareArgs: {
    _id: (source) => source.likedBy,
    skip: null,
    sort: null,
  },
  projection: { user: 1 },
});
