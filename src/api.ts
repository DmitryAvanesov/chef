import type { ApiType, ApiRoute } from "@/types/api";
import type { Ingredient } from "@/types/ingredients";

const api = process.env.VUE_APP_API;

export const apiGet = async (route: ApiRoute): Promise<ApiType[]> => {
  const options: RequestInit = {
    method: "GET",
  };

  const response = await fetch(`${api}/${route}`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error(`An error occurred while getting ${route}`);
};

export const apiPost = async (
  route: ApiRoute,
  payload: ApiType
): Promise<ApiType> => {
  const { _id, ...body } = payload;

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

  throw Error(`An error occurred while posting ${route}`);
};

export const apiPatch = async (
  route: ApiRoute,
  payload: ApiType
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

  throw Error(`An error occurred while patching ${route}`);
};

export const apiDelete = async (route: ApiRoute, id: string): Promise<void> => {
  const options: RequestInit = {
    method: "DELETE",
  };

  const response = await fetch(`${api}/${route}/${id}`, options);

  if (response.ok) {
    return;
  }

  throw Error(`An error occurred while deleting ${route}`);
};
