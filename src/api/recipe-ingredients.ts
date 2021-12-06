import type { RecipeIngredient } from "@/types/recipe-ingredients";

const api = process.env.VUE_APP_API;
const route = "recipe-ingredients";

export const apiGetRecipeIngredients = async (): Promise<
  RecipeIngredient[]
> => {
  const options: RequestInit = {
    method: "GET",
  };

  const response = await fetch(`${api}/${route}`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while getting recipe ingredients");
};

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

  const response = await fetch(`${api}/${route}`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while posting a recipe ingredient");
};

export const apiPatchRecipeIngredient = async (
  payload: RecipeIngredient
): Promise<void> => {
  const options: RequestInit = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${api}/${route}/${payload._id}`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while patching a recipe ingredient");
};

export const apiDeleteRecipeIngredient = async (id: string): Promise<void> => {
  const options: RequestInit = {
    method: "DELETE",
  };

  const response = await fetch(`${api}/${route}/${id}`, options);

  if (response.ok) {
    return;
  }

  throw Error("An error occurred while deleting a recipe ingredient");
};
