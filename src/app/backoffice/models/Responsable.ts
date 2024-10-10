export interface Address {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  }
  
  export interface Responsable {
    _id: string;
   
    name: string;
    email: string;
    phoneNumber: string;
    CIN: string;
    address: Address;
    profilePicture?: any;
  }
  