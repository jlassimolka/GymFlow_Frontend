export interface User {
   
    email: string;
    password: string;
    role: 'Coach' | 'Adherent' | 'Manager' | 'Responsable'; // Enum-like string for roles
   
  }
  