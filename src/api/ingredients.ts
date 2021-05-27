import type { Ingredient, IngredientPayload } from "@/types/ingredients";

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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(`${api}/ingredients`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while posting an ingredient");
};

export const apiPatchIngredient = async (
  payload: IngredientPayload
): Promise<void> => {
  const options: RequestInit = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${api}/ingredients/${payload._id}`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while patching an ingredient");
};

export const apiDeleteIngredient = async (id: string): Promise<void> => {
  const options: RequestInit = {
    method: "DELETE",
  };

  const response = await fetch(`${api}/ingredients/${id}`, options);

  if (response.ok) {
    return;
  }

  throw Error("An error occurred while deleting an ingredient");
};
