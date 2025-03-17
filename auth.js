import { connectDB } from "@/lib/db/connectDB";
import { userModel } from "@/lib/models/user";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const handleUser = async (profile) => {
  const { name, picture, email } = profile;
  await connectDB();

  const existingUserByEmail = await userModel.findOne({ email: email });
  if (existingUserByEmail) {
    if (existingUserByEmail.password) {
      throw new Error(
        "This email is already in use. Please use a different email"
      );
    } else {
      return existingUserByEmail;
    }
  }

  let newUser = new userModel({
    fullname: name,
    email: email,
    profileImg: picture,
    isVerified: true,
  });
  newUser = await newUser.save();
  return newUser;
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
            console.log("No user found with this email");
          }

          const isPasswordValid = await bcrypt.compare(
            hashedPassword,
            user.password
          );

          if (isPasswordValid) {
            return user;
          } else {
            console.log("Incorrect password");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        const user = await handleUser(profile);

        profile.role = user.role;
        profile._id = user._id;
        // console.log(
        //   "profile yerhi ================++++>>>>>>>>>>>>>>>>",
        //   profile
        // );

        return true;
      } catch (error) {
        // Redirect to the login page with an error message
        return `/signup?error=${encodeURIComponent(error.message)}`;
      }
    },
    async jwt({ token, user, profile }) {
      if (user) {
        token._id = profile._id;
        token.role = profile.role;
      }
      // console.log("token =====================>>>>>>>>>>", token);
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.role = token.role;
      }
      // console.log("session ==============>>>>>>>>>>>>", session);

      return session;
    },
  },
});
