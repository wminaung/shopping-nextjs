interface Config {
  apiBaseUrl: string;
  apiAdminUrl: string;
  googleClientId: string;
  googleClientSecret: string;
  nextAuthSecret: string;
  superbaseUrl: string;
  superbaseKey: string;
  baseImageUrl: string;
  baseUrl: string;
  domain: string;
}
export const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  domain: process.env.NEXT_PUBLIC_DOMAIN || "localhost:3000",
  apiAdminUrl: process.env.NEXT_PUBLIC_API_ADMIN_URL || "/api/admin",
  baseImageUrl:
    process.env.NEXT_PUBLIC_BASE_IMAGE_URL ||
    "https://qcmtezfilrwudtfsxrtg.supabase.co/storage/v1/object/public/winimg",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "/",

  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  nextAuthSecret: process.env.NEXTAUTH_SECRET || "",
  superbaseUrl: process.env.NEXT_PUBLIC_SUPERBASE_URL || "",
  superbaseKey: process.env.NEXT_PUBLIC_SUPERBASE_KEY || "",
};
