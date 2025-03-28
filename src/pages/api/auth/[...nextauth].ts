import UserDto from "@/dtos/UserDto";
import axios from "axios";
import https from "https";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuthOptions;
export interface CustomUser extends NextAuthUser {
  token: string;
}
const nextAuthOptions: NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse
): NextAuthOptions => {
  debugger;
  return {
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        credentials: {
          username: {
            label: "Email",
            type: "email",
            placeholder: "",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/Account/Login`,
              {
                email: credentials?.username,
                password: credentials?.password,
              },
              {
                headers: {
                  "content-type": "application/json",
                  clientId: `${process.env.NEXT_PUBLIC_API_CLIENT_ID}`,
                },
                httpsAgent: new https.Agent({
                  rejectUnauthorized: false,
                }),
              }
            );
            const { token, user } = response.data.data;
            const cookies = response.headers["set-cookie"] || [];

            res.setHeader("Set-Cookie", cookies);

            return { ...user, token };
          } catch (error) {
            if (axios.isAxiosError(error)) {
              throw new Error("Invalid username or password");
            } else {
              throw new Error("Some error occured");
            }
          }
        },
      }),
    ],
    secret: `${process.env.NEXTAUTH_SECRET}`,
    callbacks: {
      async jwt({ token, user, account, profile }) {
        if (user) {
          const customUser = user as CustomUser; // Cast user to CustomUser
          token.user = customUser;
          token.accessToken = customUser.token;
        }
        return token;
      },

      async session({ session, token, user }) {
        session.user = token as unknown as UserDto; // Ensure token is treated as UserDto
        session.user.token = token.accessToken as string; // Explicitly cast token.accessToken to string
        return session;
      },
    },
    session: { strategy: "jwt" },
    events: {
      async signOut() {
        res.setHeader("Set-Cookie", [
          "access-token=deleted;Max-Age=0;path=/;",
          "refresh-token=deleted;Max-Age=0;path=/;",
          "user-id=deleted;Max-Age=0;path=/;",
        ]);
      },
    },
    // Enable debug messages in the console if you are having problems
    debug: process.env.NODE_ENV !== "production",
    pages: {
      signIn: "/account/login",
    },
  };
};

const Auth = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};

export default Auth;
