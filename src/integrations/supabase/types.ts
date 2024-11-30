export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      gpt_categories: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      gpt_files: {
        Row: {
          created_at: string
          file_path: string
          file_size: number | null
          file_type: string | null
          filename: string
          gpt_id: string | null
          id: string
        }
        Insert: {
          created_at?: string
          file_path: string
          file_size?: number | null
          file_type?: string | null
          filename: string
          gpt_id?: string | null
          id?: string
        }
        Update: {
          created_at?: string
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          filename?: string
          gpt_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gpt_files_gpt_id_fkey"
            columns: ["gpt_id"]
            isOneToOne: false
            referencedRelation: "gpts"
            referencedColumns: ["id"]
          },
        ]
      }
      gpts: {
        Row: {
          ai_guardrails: string | null
          billing_code: string | null
          category_id: string | null
          created_at: string
          default_prompt: string | null
          description: string
          icon: string | null
          id: string
          is_featured: boolean | null
          last_modified: string | null
          last_modified_by: string | null
          name: string
          prompt_questions: string[] | null
          updated_at: string
          welcome_message: string | null
        }
        Insert: {
          ai_guardrails?: string | null
          billing_code?: string | null
          category_id?: string | null
          created_at?: string
          default_prompt?: string | null
          description: string
          icon?: string | null
          id?: string
          is_featured?: boolean | null
          last_modified?: string | null
          last_modified_by?: string | null
          name: string
          prompt_questions?: string[] | null
          updated_at?: string
          welcome_message?: string | null
        }
        Update: {
          ai_guardrails?: string | null
          billing_code?: string | null
          category_id?: string | null
          created_at?: string
          default_prompt?: string | null
          description?: string
          icon?: string | null
          id?: string
          is_featured?: boolean | null
          last_modified?: string | null
          last_modified_by?: string | null
          name?: string
          prompt_questions?: string[] | null
          updated_at?: string
          welcome_message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gpts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "gpt_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          last_use: string | null
          role: string | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          last_use?: string | null
          role?: string | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          last_use?: string | null
          role?: string | null
        }
        Relationships: []
      }
      virtual_tas: {
        Row: {
          ai_guardrails: string | null
          canvas_api_key: string | null
          canvas_course_url: string | null
          canvas_enabled: boolean | null
          captioning_enabled: boolean | null
          course: string
          created_at: string
          default_prompt: string | null
          id: string
          instructor_email: string | null
          instructor_name: string | null
          last_modified: string | null
          last_modified_by: string | null
          name: string
          no_answer_response: string | null
          panopto_api_key: string | null
          panopto_course_url: string | null
          panopto_enabled: boolean | null
          prompt_questions: string[] | null
          ta_email: string | null
          teaching_style: string | null
          updated_at: string
          welcome_message: string | null
        }
        Insert: {
          ai_guardrails?: string | null
          canvas_api_key?: string | null
          canvas_course_url?: string | null
          canvas_enabled?: boolean | null
          captioning_enabled?: boolean | null
          course: string
          created_at?: string
          default_prompt?: string | null
          id?: string
          instructor_email?: string | null
          instructor_name?: string | null
          last_modified?: string | null
          last_modified_by?: string | null
          name: string
          no_answer_response?: string | null
          panopto_api_key?: string | null
          panopto_course_url?: string | null
          panopto_enabled?: boolean | null
          prompt_questions?: string[] | null
          ta_email?: string | null
          teaching_style?: string | null
          updated_at?: string
          welcome_message?: string | null
        }
        Update: {
          ai_guardrails?: string | null
          canvas_api_key?: string | null
          canvas_course_url?: string | null
          canvas_enabled?: boolean | null
          captioning_enabled?: boolean | null
          course?: string
          created_at?: string
          default_prompt?: string | null
          id?: string
          instructor_email?: string | null
          instructor_name?: string | null
          last_modified?: string | null
          last_modified_by?: string | null
          name?: string
          no_answer_response?: string | null
          panopto_api_key?: string | null
          panopto_course_url?: string | null
          panopto_enabled?: boolean | null
          prompt_questions?: string[] | null
          ta_email?: string | null
          teaching_style?: string | null
          updated_at?: string
          welcome_message?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
