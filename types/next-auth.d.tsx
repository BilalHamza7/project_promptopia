import NextAuth, { Profile as NextAuthProfile } from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}

/* 2. Interface Extension:

The declare module "next-auth" block allows you to extend the built-in Session interface provided by NextAuth.
Inside this block, you define a new interface named Session that inherits properties from both the original Session interface and an object with a nested user object.

3. Custom User Object:

The nested user object has a property named id of type string. This is the custom property you're adding to the user object within the session.
The & DefaultSession["user"] syntax merges the properties of the original user object from the default Session with your custom user object. This ensures that any existing user properties are preserved. */