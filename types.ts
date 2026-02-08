
export enum SportCategory {
  TEAM = 'Equipo',
  INDIVIDUAL = 'Individual',
  WATER = 'Agua',
  COMBAT = 'Combate',
  OUTDOOR = 'Exterior'
}

export interface Sport {
  id: string;
  name: string;
  icon: string;
  category: SportCategory;
  description: string;
  color: string;
}

export interface Exercise {
  name: string;
  reps: string;
  description: string;
  benefit: string;
}

export interface SportDetails {
  keyMuscles: string[];
  mainSkills: string[];
  recommendations: Exercise[];
  injuryPrevention: string[];
  nutritionalTip: string;
}

export interface AppState {
  selectedSport: Sport | null;
  details: SportDetails | null;
  isLoading: boolean;
  error: string | null;
}
