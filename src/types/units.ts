import type { ApiRoute } from "@/types/api";

export interface UnitsState {
  route: ApiRoute;
  unitsList: Unit[] | null;
}

export interface Unit {
  _id: string;
  name: string;
}
