export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      attendance_lists: {
        Row: {
          attendance: Json;
          created_at: string;
          id: string;
          remarks: string | null;
          teacher_id: string;
          trip_day_id: string;
        };
        Insert: {
          attendance: Json;
          created_at?: string;
          id?: string;
          remarks?: string | null;
          teacher_id: string;
          trip_day_id: string;
        };
        Update: {
          attendance?: Json;
          created_at?: string;
          id?: string;
          remarks?: string | null;
          teacher_id?: string;
          trip_day_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "attendance_lists_teacher_id_fkey";
            columns: ["teacher_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "attendance_lists_trip_day_id_fkey";
            columns: ["trip_day_id"];
            isOneToOne: false;
            referencedRelation: "trip_days";
            referencedColumns: ["id"];
          },
        ];
      };
      attractions: {
        Row: {
          cost: number | null;
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          duration: unknown;
          hashtags: string[];
          id: string;
          title: string;
          trip_point_id: string;
          updated_at: string;
        };
        Insert: {
          cost?: number | null;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          duration?: unknown;
          hashtags?: string[];
          id?: string;
          title: string;
          trip_point_id: string;
          updated_at?: string;
        };
        Update: {
          cost?: number | null;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          duration?: unknown;
          hashtags?: string[];
          id?: string;
          title?: string;
          trip_point_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "attractions_trip_point_id_fkey";
            columns: ["trip_point_id"];
            isOneToOne: false;
            referencedRelation: "trip_points";
            referencedColumns: ["id"];
          },
        ];
      };
      headcounts: {
        Row: {
          count: number;
          created_at: string;
          expected_count: number;
          id: string;
          remarks: string | null;
          teacher_id: string;
          trip_day_id: string;
        };
        Insert: {
          count: number;
          created_at?: string;
          expected_count: number;
          id?: string;
          remarks?: string | null;
          teacher_id: string;
          trip_day_id: string;
        };
        Update: {
          count?: number;
          created_at?: string;
          expected_count?: number;
          id?: string;
          remarks?: string | null;
          teacher_id?: string;
          trip_day_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "headcounts_teacher_id_fkey";
            columns: ["teacher_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "headcounts_trip_day_id_fkey";
            columns: ["trip_day_id"];
            isOneToOne: false;
            referencedRelation: "trip_days";
            referencedColumns: ["id"];
          },
        ];
      };
      space_teachers: {
        Row: {
          space_id: string;
          teacher_id: string;
        };
        Insert: {
          space_id: string;
          teacher_id: string;
        };
        Update: {
          space_id?: string;
          teacher_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "space_teachers_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "space_teachers_teacher_id_fkey";
            columns: ["teacher_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      spaces: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          id: string;
          owner_id: string;
          search_vector: unknown;
          slug: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          owner_id: string;
          search_vector?: unknown;
          slug: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          owner_id?: string;
          search_vector?: unknown;
          slug?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "spaces_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      trip_days: {
        Row: {
          created_at: string;
          date: string;
          deleted_at: string | null;
          description: string | null;
          id: string;
          title: string;
          trip_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          date: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          title: string;
          trip_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          date?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          title?: string;
          trip_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "trip_days_trip_id_fkey";
            columns: ["trip_id"];
            isOneToOne: false;
            referencedRelation: "trips";
            referencedColumns: ["id"];
          },
        ];
      };
      trip_points: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          id: string;
          position: number | null;
          time: string;
          title: string;
          trip_day_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          position?: number | null;
          time: string;
          title: string;
          trip_day_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          position?: number | null;
          time?: string;
          title?: string;
          trip_day_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "trip_points_trip_day_id_fkey";
            columns: ["trip_day_id"];
            isOneToOne: false;
            referencedRelation: "trip_days";
            referencedColumns: ["id"];
          },
        ];
      };
      trip_students: {
        Row: {
          student_id: string;
          trip_id: string;
        };
        Insert: {
          student_id: string;
          trip_id: string;
        };
        Update: {
          student_id?: string;
          trip_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "trip_students_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "trip_students_trip_id_fkey";
            columns: ["trip_id"];
            isOneToOne: false;
            referencedRelation: "trips";
            referencedColumns: ["id"];
          },
        ];
      };
      trip_teachers: {
        Row: {
          teacher_id: string;
          trip_id: string;
        };
        Insert: {
          teacher_id: string;
          trip_id: string;
        };
        Update: {
          teacher_id?: string;
          trip_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "trip_teachers_teacher_id_fkey";
            columns: ["teacher_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "trip_teachers_trip_id_fkey";
            columns: ["trip_id"];
            isOneToOne: false;
            referencedRelation: "trips";
            referencedColumns: ["id"];
          },
        ];
      };
      trips: {
        Row: {
          created_at: string;
          description: string | null;
          end_date: string;
          id: string;
          owner_id: string;
          search_vector: unknown;
          space_id: string;
          start_date: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          end_date: string;
          id?: string;
          owner_id: string;
          search_vector?: unknown;
          space_id: string;
          start_date: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          end_date?: string;
          id?: string;
          owner_id?: string;
          search_vector?: unknown;
          space_id?: string;
          start_date?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "trips_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "trips_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          auth_id: string;
          created_at: string;
          deleted_at: string | null;
          email: string;
          id: string;
          must_change_password: boolean;
          password_changed_at: string | null;
          password_hash: string;
          role: Database["public"]["Enums"]["user_role"];
          search_vector: unknown;
          updated_at: string;
          username: string | null;
        };
        Insert: {
          auth_id: string;
          created_at?: string;
          deleted_at?: string | null;
          email: string;
          id?: string;
          must_change_password?: boolean;
          password_changed_at?: string | null;
          password_hash: string;
          role: Database["public"]["Enums"]["user_role"];
          search_vector?: unknown;
          updated_at?: string;
          username?: string | null;
        };
        Update: {
          auth_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          email?: string;
          id?: string;
          must_change_password?: boolean;
          password_changed_at?: string | null;
          password_hash?: string;
          role?: Database["public"]["Enums"]["user_role"];
          search_vector?: unknown;
          updated_at?: string;
          username?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: "admin" | "principal" | "teacher" | "student";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      user_role: ["admin", "principal", "teacher", "student"],
    },
  },
} as const;
