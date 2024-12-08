import { connectDB } from "@/lib/db/connectDB";
import { userModel } from "@/lib/models/user";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const handleUser = async (profile) => {
  await connectDB();
  const user = await userModel.findOne({ email: profile.email });
  if (!user) {
    throw new Error("No user found with this email");
  }

  return user;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(
          credentials.password,
          saltRounds
        );

        try {
          const user = await userModel.findOne({
            email: credentials.identifier.email,
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isPasswordValid = await bcrypt.compare(
            hashedPassword,
            user.password
          );

          if (isPasswordValid) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const user = await handleUser(profile);

      profile.role = user.role;
      profile._id = user._id;
      return true;
    },
    async jwt({ token, user, profile }) {
      // console.log("profile=>", profile);
      if (user) {
        // User is available during sign-in
        token._id = profile._id;
        token.role = profile.role;
      }
      return token;
    },
    session({ session, token }) {
      // console.log("session data=>", token);
      if (token) {
        session.user.id = token.id;
        session.user._id = token._id;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
