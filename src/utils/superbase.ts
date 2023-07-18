import { createClient } from "@supabase/supabase-js";
import { config } from "../config/config";
console.log(config, "con");
export const superbase = createClient(config.superbaseUrl, config.superbaseKey);
