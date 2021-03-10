import { Ingredient } from "@/types/ingredients";
const api = process.env.VUE_APP_API;

export const apiGetIngredients = async (): Promise<Ingredient[]> => {
  const options = {
    method: "GET",
  };

  const response = await fetch(`${api}/ingredients`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while getting ingredients");
};

export const apiPostIngredient = async (
  body: Ingredient
): Promise<Ingredient> => {
  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify(body),
  };

  const response = await fetch(`${api}/ingredients`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while posting an ingredient");
};
