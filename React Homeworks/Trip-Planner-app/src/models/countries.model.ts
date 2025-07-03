export interface Country {
  name: {
    common: string;
  };
  capital: string[]; 
  region: string; 
  area: number; 
  flags: {
    png: string;
    alt: string;
  }; 
  population: number;
  inPlanner: boolean
  landlocked: boolean;
  days: number;
}