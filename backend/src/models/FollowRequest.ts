import { Schema, Document, model, Types } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { UserDocument, UserTC } from '.';

export type FollowStatus = 'accepted' | 'rejected' | 'pending';

export interface FollowRequestDocument extends Document {
  status: FollowStatus;
  sentBy: Types.ObjectId | UserDocument;
  sentTo: Types.ObjectId | UserDocument;
  createdAt?: Date;
  updatedAt?: Date;
  active?: Boolean;
}

const followRequestSchema = new Schema(
  {
    status: {
      type: String,
      default: 'pending',
    },
    sentBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    sentTo: {
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

export const FollowRequest = model<FollowRequestDocument>(
  'FollowRequest',
  followRequestSchema
);
export const FollowRequestTC = composeMongoose(FollowRequest);

FollowRequestTC.addRelation('user', {
  resolver: () => UserTC.mongooseResolvers.dataLoader(),
  prepareArgs: {
    _id: (source) => source.sentBy,
    skip: null,
    sort: null,
  },
  projection: { user: 1 },
});

FollowRequestTC.addRelation('user', {
  resolver: () => UserTC.mongooseResolvers.dataLoader(),
  prepareArgs: {
    _id: (source) => source.sentTo,
    skip: null,
    sort: null,
  },
  projection: { user: 1 },
});
