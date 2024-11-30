import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://bjxdjtgedtblyjgmewyc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqeGRqdGdlZHRibHlqZ21ld3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5MzUxNzQsImV4cCI6MjA0ODUxMTE3NH0.ltUV2MKccMXKlPiOHyLzLTYSWlQGI4MnDgyB0L7VgUg";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);