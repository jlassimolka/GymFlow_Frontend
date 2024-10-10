import { Adherent } from "./Adherent";
import { Coach } from "./Coach";

interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface Contact {
  phone: string;
  email: string;
}
interface OpeningHours {
  Monday: String;
  Tuesday: String;
  Wednesday: String;
  Thursday: String;
  Friday: String;
  Saturday: String;
  Sunday: String;
}
export interface Gym {
  _id: string;
  name?: string;
  address?: Address;
  openingHours?: OpeningHours;
  memberCount?: number;
  services?: string[];
  contact?: Contact;
  oaches?: Coach[]; // Array of Coach objects related to this Gym
  adherents?: Adherent[]; // Array of Adherent objects related to this Gym
  manager?: string; // Reference to the Manager's _id responsible for this Gym
  profilePicture?: any;

}

