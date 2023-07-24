import { createClient } from "@supabase/supabase-js";
import { config } from "../config/config";

export const superbase = createClient(
  config.superbaseUrl,
  config.superbaseKey,
  {
    auth: {
      persistSession: false,
    },
  }
);
