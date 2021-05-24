import type { Unit } from "@/types/units";

const api = process.env.VUE_APP_API;

export const apiGetUnits = async (): Promise<Unit[]> => {
  const options = {
    method: "GET",
  };

  const response = await fetch(`${api}/units`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while getting units");
};

export const apiPostUnit = async (body: Unit): Promise<Unit> => {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(`${api}/units`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while posting a unit");
};

export const apiPatchUnit = async (id: string, body: Unit): Promise<Unit> => {
  const options: RequestInit = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(`${api}/units/${id}`, options);

  if (response.ok) {
    return response.json();
  }

  throw Error("An error occurred while patching a unit");
};

export const apiDeleteUnit = async (id: string): Promise<void> => {
  const options: RequestInit = {
    method: "DELETE",
  };

  const response = await fetch(`${api}/units/${id}`, options);

  if (response.ok) {
    return;
  }

  throw Error("An error occurred while deleting a unit");
};
