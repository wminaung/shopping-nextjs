import { config } from "@/src/config/config";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
    // ...add more providers here
  ],
  secret: config.nextAuthSecret,
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);

//*** middleware.ts */

/*
export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/backoffice/:apth*", "/api/backoffice/:path*"],
};

*/
