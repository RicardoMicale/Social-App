import { LikeTC } from '../../models';

export type TGetPostLikesInput = {
  postId: String;
};

export const GetPostLikesInput = `
  input GetPostLikes {
    postId: String!
  }
`;

export const GetPostLikesType = `
  type GetPostLikesType {
    likes: [${LikeTC.getTypeName()}]
    likeCount: number
  }
`;
