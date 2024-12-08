import { Category } from "@/types/Category";

export type Recipe = {
  id: number;
  name: string;
  preparation_time_minutes: number;
  servings: number;
  preparation_method: string;
  ingredients: string;
  created_at: Date;
  updated_at: Date;
  category: Category;
};
