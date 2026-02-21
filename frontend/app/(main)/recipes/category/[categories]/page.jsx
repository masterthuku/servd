"use client";

import { getMealsByCategory } from "@/actions/mealdb.actions";
import RecipeGrid from "@/components/RecipeGrid";
import { useParams } from "next/navigation";

const CategoryRecipesPage = () => {
  const params = useParams();
  const category = params.categories;

  return (
    <RecipeGrid
      type="category"
      value={category}
      fetchAction={getMealsByCategory}
      backLink="/dashboard"
    />
  );
};

export default CategoryRecipesPage;
