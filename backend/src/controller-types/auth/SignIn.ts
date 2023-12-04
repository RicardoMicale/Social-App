import { UserTC } from "../../models";

export type TSignInInput = {
  email: string;
  password: string;
};

export const SignInInput = `
  input SignInInput {
    email: String!
    password: String!
  }
`;

export const SignInType = `
  type SignInType {
    user: ${UserTC.getTypeName()}
    token: String
  }
`
