interface Address {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  }
  
  export interface Adherent {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    CIN: string;
    address: Address;
    gym?: string; // Reference to the Gym's _id where the adherent is training
    coach?: string; // Optional reference to the Coach's _id who trains the adherent
    profilePicture?: any;
  }
  