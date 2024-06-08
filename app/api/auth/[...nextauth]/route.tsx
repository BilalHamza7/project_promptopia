import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        // async session({ session }) {
        //     if (session?.user) { // Check if session.user exists before accessing email
        //         const sessionUser = await User.findOne({
        //             email: session.user.email,
        //         });
        //         session.user.id = sessionUser._id.toString();

        //         return Promise.resolve(session);
        //     } else {
        //         console.log("No user found in session");
        //         return session;
        //     }

        async session({ session }) {
            if (session.user) {
                const sessionUser = await User.findOne({ email: session.user.email });

                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                }
            }
            return session;
        },

        async signIn({ profile }) {
            try {

                if (!profile) {
                    console.error("Profile is undefined");
                    return false;
                }

                await connectToDB();

                //check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });

                //if not, create a new user
                if (!userExists) {
                    const username = profile.name ? profile.name.replace(" ", "").toLowerCase() : `user${Date.now()}`;
                    const image = profile.picture || ""; 
                    await User.create({
                        email: profile.email,
                        username: username,
                        image: image,
                    });
                }

                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST };