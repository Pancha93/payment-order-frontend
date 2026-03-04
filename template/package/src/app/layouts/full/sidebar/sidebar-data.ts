import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Inicio',
    iconName: 'home',
    route: '/inicio',
  },
  {
    navCap: 'Ordenpago',
  },
  {
    displayName: 'Ver Ordenpago',
    iconName: 'apps',
    route: '/ordenpago'
  },
  {
    displayName: 'Gestionar Ordenpagos',
    iconName: 'list',
    route: '/ordenpago/leer'
  },
  {
    navCap: 'Gestion de seguridad',
  },
  {
    displayName: 'Permisos',
    iconName: 'list',
    route: '/permisos',
  },
  {
    displayName: 'Usuarios',
    iconName: 'list',
    route: '/usuarios',
  },
  {
    displayName: 'Roles',
    iconName: 'list',
    route: '/roles',
  },
  {
    navCap: 'Generador de Reportes',
  },
  {
    displayName: 'Reportes',
    iconName: 'list',
    route: '/reportes',
  },
  {
    navCap: 'Migración',
  },
  {
    displayName: 'Archivo Ejemplo',
    iconName: 'folder',
    route: '/archivo-ejemplo',
  },
  {
    displayName: 'Importar Datos',
    iconName: 'cloud_upload',
    route: '/importacion-datos',
  },
  {
    navCap: 'Configuracion SMTP',
  },
  {
    displayName: 'Configuracion',
    iconName: 'settings',
    route: '/configuracion',
  }
];
