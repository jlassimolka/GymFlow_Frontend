import { Adherent } from "./Adherent";
import { Gym } from "./Gym";

export interface Coach {
    _id: string;
    name: string;
    email: string;
    numeroDeTel: string;
    CIN: string;
  
    status?: string;
    price?: number;
    trainingSpecialties: string[];
    gyms?: Gym[]; 
    adherents?: Adherent[];

    profilePicture?: any;
  }