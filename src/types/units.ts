export interface UnitsState {
  unitsList: Unit[];
}

export interface Unit {
  _id?: string;
  name: string;
}

export interface UnitReorderEventDetail {
  from: number;
  to: number;
  complete: () => void;
}

export interface UpdateUnitPayload {
  id: string;
  unit: Unit;
}
