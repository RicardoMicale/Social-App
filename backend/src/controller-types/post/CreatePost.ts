export type TCreatePostInput = {
  title: String;
  body: String;
  author: String;
};

export const CreatePostInput = `
  input CreatePostInput {
    title: String!
    body: String!
    author: String!
  }
`;
