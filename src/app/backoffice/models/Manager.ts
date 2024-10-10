interface Address {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  }
  
  export interface Manager {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    CIN: string;
    address: Address;
    gym: string; // Reference to the Gym managed by this Manager (Gym's _id)
    profilePicture?: any;
  }
  