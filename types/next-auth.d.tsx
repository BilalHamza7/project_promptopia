import NextAuth, { Profile as NextAuthProfile } from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface Profile extends NextAuthProfile {
    picture?: string;
  }
}