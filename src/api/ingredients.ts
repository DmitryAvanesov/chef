import { Ingredient } from "@/types/ingredients";
const api = process.env.VUE_APP_API;

export const getIngredients = async (): Promise<Ingredient[]> => {
  const options = {
    method: "GET"
  };

  const response = await fetch(`${api}/ingredients`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while getting ingredients");
};
