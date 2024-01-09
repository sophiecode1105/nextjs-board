import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "856a2baf45e6d9a4abd0",
      clientSecret: "9988822361844318aacbdb4d011c246881c05cc1",
    }),
  ],
  secret: "Sophi3NextJS3450",
};
export default NextAuth(authOptions);
