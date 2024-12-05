import { prisma } from "@/app/lib";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn(params) {
      if (!params.user.email) {
        return false;
      }
      try {
        await prisma.user.create({
          data: {
            // @ts-expect-error name type
            name: params.user.name?.split(" ")[0],
            email: params.user.email,
            Providers: "Google",
          },
        });
      } catch (e) {
        console.log(e);
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
