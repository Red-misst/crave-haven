import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { connectToDatabase } from "./mongoDb";

// Extend NextAuth's types
let client: any;

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      _id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      points?: number;
    };
  }

  interface User {
    role?: string;
  }
}

export const options: NextAuthOptions = {
  adapter: MongoDBAdapter(
    (async () => {
      try {
        const { client } = await connectToDatabase();
    
        return client;
      } catch (error) {
        console.error("Failed to connect to database:", error);
        throw new Error("Database connection error");
      }
    })()
  ),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.role = user?.role;
      }
      return token;
    },
    async session({ session, token }) {
      try {
        const { db } = await connectToDatabase();

        const email = session?.user?.email;
        if (!email) throw new Error("User email not available in session.");

        let user = await db.collection("users").findOne({ email });

        if (!user) {
          const newUser = {
            email,
            name: session.user?.name ?? "",
            image: session.user?.image?? "",
            role: "user",
            points: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          const result = await db.collection("users").insertOne(newUser);
          user = { ...newUser, _id: result.insertedId };
         
        }

        if (session.user) {
          session.user._id = user._id.toString();
          session.user.role = user.role;
          session.user.points = user.points ?? 0;
        }

   
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }

    
    },
   
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  debug: process.env.NODE_ENV === "development",
};