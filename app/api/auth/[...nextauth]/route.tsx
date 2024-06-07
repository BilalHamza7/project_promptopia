import NextAuth from "@/node_modules/next-auth/index";
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
        async session({ session }) {
            if (session?.user) { // Check if session.user exists before accessing email
                const sessionUser = await User.findOne({
                    email: session.user.email,
                });
                session.user._id = sessionUser._id.toString();

                return Promise.resolve(session);
            } else {
                console.log("No user found in session");
                return session;
            }
        },

        async signIn({ profile }) {
            try {
                await connectToDB();

                //check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });
                //if not, create a new user
                if (!userExists) {
                    const newUser = await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
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