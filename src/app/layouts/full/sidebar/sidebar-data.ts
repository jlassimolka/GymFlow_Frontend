import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Dashboard',
  },
  {
    displayName: 'statistic',
    iconName: 'aperture',
    route: '/back-office/',
  },
  {
    displayName: 'Gym Management',
    iconName: 'poker-chip',
    route: '/back-office/gyms-list',
  },
  {
    displayName: 'Coaches management',
    iconName: 'mood-smile',
    route: '/back-office/coaches-list',
  },
  {
    displayName: 'Manager management',
    iconName: 'user-plus',
    route: '/back-office/manager-list',
  },
  {
    displayName: 'Adherent management',
    iconName: 'list',
    route: '/back-office/adherent-list',
  },
  {
    displayName: 'Admin management',
    iconName: 'lock',
    route: '/back-office/res-list',
  }
  
 
  
];
