interface Config {
  apiBaseUrl: string;
  apiAdminUrl: string;
  googleClientId: string;
  googleClientSecret: string;
  nextAuthSecret: string;
}
export const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  apiAdminUrl: process.env.NEXT_PUBLIC_API_ADMIN_URL || "",

  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  nextAuthSecret: process.env.NEXTAUTH_SECRET || "",
};
