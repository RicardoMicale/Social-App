import { v4 as uuid } from 'uuid';
import { schemaComposer } from 'graphql-compose';
import { User, UserDocument, UserTC } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  SignInInput,
  SignInType,
  TSignInInput,
} from '../controller-types/auth/SignIn';
import { firebaseCreateUser, firebaseSignIn } from '../firebase/firebaseAuth';
import { SignUpInput, TSignUpInput } from '../controller-types/auth/SignUp';

export const signIn = schemaComposer.createResolver<
  any,
  {
    data: TSignInInput;
  }
>({
  name: 'signIn',
  kind: 'mutation',
  description: 'Sign in a user to the app',
  type: SignInType,
  args: {
    data: SignInInput,
  },
  async resolve({ args, context }) {
    const { email, password } = args?.data;
    const user = await User.findOne({ email, active: true });

    //  if the user does not exist, throw error
    if (!user) {
      throw new Error('User does not exist!');
    }

    //  checks if password is the same
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      throw new Error(`Password does not match for email ${email}`);
    }
    const firebaseId = firebaseSignIn(email, password);
    user.save();

    context.res.cookie('token', firebaseId, {
      secure: true,
      sameSite: 'none',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
      domain: process.env.NODE_ENV === 'development' ? null : '',
    });

    return { user, firebaseId };
  },
});

export const signUp = schemaComposer.createResolver<
  any,
  {
    data: TSignUpInput;
  }
>({
  name: 'signUp',
  kind: 'mutation',
  description: 'Creates new user',
  type: UserTC.getType(),
  args: {
    data: SignUpInput,
  },
  async resolve({ args, context }) {
    const { email, password, username, firstName, lastName } = args?.data;

    const userFromDB = await User.findOne({
      $or: [{ email }, { username }],
    });

    //  checks if email and/or username is already being used
    if (userFromDB) {
      if (userFromDB.email === email) {
        throw new Error('Email already exists!');
      } else if (userFromDB.username === username) {
        throw new Error('Username already exists');
      }
    }

    //  creates user in firebase
    const firebaseId = await firebaseCreateUser(email, password);

    //  creates user in mongo db
    const user: UserDocument = await User.create({
      email,
      firstName,
      lastName,
      password,
      username,
      firebaseId,
      posts: [],
      followers: [],
      birthDate: null,
    });

    context.res.cookie('token', firebaseId, {
      secure: true,
      sameSite: 'None',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 yr in ms
      domain: process.env.NODE_ENV === 'development' ? null : '',
    });

    return user;
  },
});

export const signOut = schemaComposer.createResolver({
  name: 'signOut',
  kind: 'mutation',
  description: 'Signs out from the app',
  type: `type SignOutType { success: Boolean! }`,
  args: {},
  async resolve({ args, context }) {
    context.res.clearCookie('token', {
      secure: true,
      sameSite: 'None',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 yr in ms
      domain: process.env.NODE_ENV === 'development' ? null : '',
    });
    return { success: true };
  },
});
