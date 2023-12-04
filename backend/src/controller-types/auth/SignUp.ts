export type TSignUpInput = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export const SignUpInput = `
  input SignUpInput {
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    password: String!
  }
`;
