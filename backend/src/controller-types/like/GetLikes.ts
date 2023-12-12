import { LikeTC } from '../../models';

export type TGetPostLikesInput = {
  postId: string;
};

export const GetPostLikesInput = `
  input GetPostLikesInput {
    postId: String!
  }
`;

export const GetPostLikesType = `
  type GetPostLikesType {
    likes: [${LikeTC.getTypeName()}]
    likeCount: Int
  }
`;
