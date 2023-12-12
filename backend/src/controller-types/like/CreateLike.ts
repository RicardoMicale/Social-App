export type TCreateLikeInput = {
  post: String;
  user: String;
};

export const CreateLikeInput = `
  input CreateLikeInput {
    post: String!
    user: String!
  }
`;
