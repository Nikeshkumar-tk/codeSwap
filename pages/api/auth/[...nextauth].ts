import clientPromise from "@/lib/db/mongoAdapter"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import NextAuth, { NextAuthOptions, Session, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaClient } from "@prisma/client"


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, user, token }:any) {
      const Prisma = new PrismaClient()
      //@ts-ignore
      const admins = await Prisma.admins.findMany()
      const isAdmin = admins.some((admin:any) => admin.email === user.email)
      const role = isAdmin ? "admin" : "user"
      session.user.role = role
      console.log("Calling call back",session)
      return session
    },
  },
}

export default NextAuth(authOptions)