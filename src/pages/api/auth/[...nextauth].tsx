import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { FaunaAdapter } from "@next-auth/fauna-adapter";
import faunadb from "faunadb";

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY as string,
});

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "read:user"
        }
      }
    }),
  ],
  adapter: FaunaAdapter(client),
});