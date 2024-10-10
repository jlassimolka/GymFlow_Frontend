import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:3000/api'; // Your Node.js API base URL

  constructor(private http: HttpClient) {}

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // Save token to local storage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  // Save User to local storage
  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  // Get User from local storage
  getUser(): any {
    let userStr = localStorage.getItem('user');
    if( userStr != null ) return JSON.parse(userStr);
  }

  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  private decodeToken(token: string): any {
    // Décode le token JWT. Ici, on suppose que le token est en base64 et que la librairie js-jwt est utilisée.
    // Vous pouvez aussi utiliser une autre méthode pour décoder le JWT.
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    const decoded = atob(parts[1]);
    return JSON.parse(decoded);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      return false;
    }

    // Vérifie la date d'expiration
    const exp = decodedToken.exp;
    if (!exp) {
      return false;
    }

    // Comparer la date d'expiration avec la date actuelle
    const expiryDate = new Date(exp * 1000); // Convertir l'expiration en millisecondes
    const isExpired = expiryDate < new Date(); 
    // if(isExpired) this.logout();
    console.log("isExpired",isExpired);
    console.log("Date Of Exp ",expiryDate)
    return !isExpired;
  }

  // Log out user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

  }

  // Get user role from token (decode JWT to get user role)
  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    }
    return null;
  }

   // Forgot Password method
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgotPassword`, { email });
  }

  hasRole(requiredRoles: Array<string>): boolean {
    // Logique pour vérifier les rôles de l'utilisateur
    // Cette logique dépendra de la structure de votre token
    const token = localStorage.getItem('token');
    if (!token) return false;

    // Décodez le token (vous pouvez utiliser une bibliothèque comme jwt-decode)
    const decodedToken = this.decodeToken(token);
    const userRoles = decodedToken?.role || '';

    return requiredRoles.includes(userRoles);
    // ['ROLE_MANAGER','ROLE_COACHE'].includes('ROLE_ADHERENT')
  }
}