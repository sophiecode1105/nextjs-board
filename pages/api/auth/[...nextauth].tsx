import NextAuth, { SessionOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectDB } from "../../../util/database";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { TokenSet } from "next-auth";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "856a2baf45e6d9a4abd0",
      clientSecret: "9988822361844318aacbdb4d011c246881c05cc1",
    }),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req): Promise<any> => {
        const db = (await connectDB).db("forum");
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        let user = await db.collection("user_cred").findOne({ email: email });
        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }
        const pwcheck = await bcrypt.compare(password, user.password);
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }
        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일
  } as SessionOptions,

  callbacks: {
    jwt: async ({
      token,
      user,
    }: {
      token: any;
      user: any;
    }): Promise<TokenSet> => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },
    session: async ({
      session,
      token,
    }: {
      session: any;
      token: any;
    }): Promise<any> => {
      session.user = token.user;
      return session;
    },
  },
  secret: "Sophi3NextJS3450",
  //db어뎁더세팅 세션정보가 db에 저장됨. 서버에 부담이가는 경우가큼
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
