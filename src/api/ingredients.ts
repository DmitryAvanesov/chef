import type { Ingredient } from "@/types/ingredients";

const api = process.env.VUE_APP_API;
const route = "ingredients";

export const apiGetIngredients = async (): Promise<Ingredient[]> => {
  const options: RequestInit = {
    method: "GET",
  };

  const response = await fetch(`${api}/${route}`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while getting ingredients");
};

export const apiPostIngredient = async (
  ingredient: Ingredient
): Promise<Ingredient> => {
  const { _id, ...body } = ingredient;

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

  throw Error("An error occurred while posting an ingredient");
};

export const apiPatchIngredient = async (
  payload: Ingredient
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

  throw Error("An error occurred while patching an ingredient");
};

export const apiDeleteIngredient = async (id: string): Promise<void> => {
  const options: RequestInit = {
    method: "DELETE",
  };

  const response = await fetch(`${api}/${route}/${id}`, options);

  if (response.ok) {
    return;
  }

  throw Error("An error occurred while deleting an ingredient");
};
