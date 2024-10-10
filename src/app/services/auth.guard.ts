import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService:AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isLoggedIn =  this.authenticationService.isAuthenticated() ;
    
    if (!isLoggedIn) {
      this.router.navigate(['authentication','login']);  // Redirect to login page if not authenticated
      return false;
    }

    const requiredRoles = route.data['roles'] as Array<string>;
    if (requiredRoles && !this.hasRequiredRole(requiredRoles)) {
      this.router.navigate(['access-denied']); // Redirige vers la page d'accès interdit si le rôle n'est pas présent
      return false;
    }
    return true;
  }
  private hasRequiredRole(requiredRoles: Array<string>): boolean {
    // Vérifie si l'utilisateur possède au moins un des rôles requis
    return this.authenticationService.hasRole(requiredRoles);
  }
}
