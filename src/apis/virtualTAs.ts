import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type VirtualTA = Database["public"]["Tables"]["virtual_tas"]["Row"];
type VirtualTAInsert = Database["public"]["Tables"]["virtual_tas"]["Insert"];
type VirtualTAUpdate = Database["public"]["Tables"]["virtual_tas"]["Update"];

export const virtualTAsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("virtual_tas")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("virtual_tas")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  create: async (virtualTA: VirtualTAInsert) => {
    const { data, error } = await supabase
      .from("virtual_tas")
      .insert([virtualTA]);

    if (error) throw error;
    return data;
  },

  update: async (id: string, virtualTA: VirtualTAUpdate) => {
    const { data, error } = await supabase
      .from("virtual_tas")
      .update(virtualTA)
      .eq("id", id);

    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from("virtual_tas")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
};