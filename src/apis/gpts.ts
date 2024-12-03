import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Gpt = Database["public"]["Tables"]["gpts"]["Row"];
type GptInsert = Database["public"]["Tables"]["gpts"]["Insert"];
type GptUpdate = Database["public"]["Tables"]["gpts"]["Update"];

export const gptsApi = {
  getAll: async (categoryId?: string) => {
    let query = supabase.from("gpts").select("*");
    
    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }

    const { data, error } = await query.order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("gpts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  create: async (gpt: GptInsert) => {
    const { data, error } = await supabase
      .from("gpts")
      .insert([gpt]);

    if (error) throw error;
    return data;
  },

  update: async (id: string, gpt: GptUpdate) => {
    const { data, error } = await supabase
      .from("gpts")
      .update(gpt)
      .eq("id", id);

    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from("gpts")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  toggleFeature: async (id: string, featured: boolean) => {
    const { error } = await supabase
      .from("gpts")
      .update({ is_featured: featured })
      .eq("id", id);

    if (error) throw error;
  },

  getFiles: async (gptId: string) => {
    const { data, error } = await supabase
      .from("gpt_files")
      .select("*")
      .eq("gpt_id", gptId);

    if (error) throw error;
    return data;
  }
};