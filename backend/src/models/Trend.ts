import { Schema, Document, model, Types } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

interface TrendDocument extends Document {
  hashtag: string;
  occurrences: Number;
  createdAt?: Date;
  updatedAt?: Date;
  active?: Boolean;
}

const trendSchema = new Schema(
  {
    hashtag: {
      type: String,
    },
    occurrences: {
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

export const Trend = model<TrendDocument>('Trend', trendSchema);
export const TrendTC = composeMongoose(Trend);
