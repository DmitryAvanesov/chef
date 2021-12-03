import type { Recipe } from "@/types/recipes";

const api = process.env.VUE_APP_API;

export const apiGetRecipes = async (): Promise<Recipe[]> => {
  const options: RequestInit = {
    method: "GET",
  };

  const response = await fetch(`${api}/recipes`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while getting recipes");
};

export const apiPostRecipe = async (recipe: Recipe): Promise<Recipe> => {
  const { _id, ...body } = recipe;

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(`${api}/recipes`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while posting a recipe");
};

export const apiPatchRecipe = async (payload: Recipe): Promise<void> => {
  console.log(payload);
  const options: RequestInit = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${api}/recipes/${payload._id}`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while patching a recipe");
};
