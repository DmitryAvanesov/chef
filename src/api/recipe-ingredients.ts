import type { RecipeIngredient } from "@/types/recipe-ingredients";

const api = process.env.VUE_APP_API;

export const apiPostRecipeIngredient = async (
  recipeIngredient: RecipeIngredient
): Promise<RecipeIngredient> => {
  const { _id, ...body } = recipeIngredient;

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(`${api}/recipe-ingredients`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while posting a recipe ingredient");
};
