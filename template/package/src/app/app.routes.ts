import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

import { HomeComponent } from './pages/home/home.component';

import { GestionUsuariosComponent } from './pages/authentication/gestion-usuarios/gestion-usuarios.component';
import { GestionPermisosComponent } from './pages/authentication/gestion-permisos/gestion-permisos.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GestionRolesComponent } from './pages/authentication/gestion-roles/gestion-roles.component';

import { ReporteComponent } from './pages/reporte/reporte.component';
import { ArchivoEjemploComponent } from './pages/archivo-ejemplo/archivo-ejemplo.component';

import { ImportacionDatosComponent } from './pages/importacion-datos/importacion-datos.component';
import { AuthGuard } from './guards/auth.guard';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { ConfiguracionApiComponent } from './pages/configuracionapi/configuracionapi.component';
import { CrearConfiguracionApiComponent } from './pages/configuracionapi/crear-configuracionapi/crear-configuracionapi.component';
import { LeerConfiguracionApiComponent } from './pages/configuracionapi/leer-configuracionapi/leer-configuracionapi.component';
import { ActualizarConfiguracionApiComponent } from './pages/configuracionapi/actualizar-configuracionapi/actualizar-configuracionapi.component';
import { EliminarConfiguracionApiComponent } from './pages/configuracionapi/eliminar-configuracionapi/eliminar-configuracionapi.component';
//@ts-ignore
import { OrdenpagoComponent } from './pages/ordenpago/ordenpago.component';
//@ts-ignore
import { CrearOrdenpagoComponent } from './pages/ordenpago/crear-ordenpago/crear-ordenpago.component';
//@ts-ignore
import { LeerOrdenpagoComponent } from './pages/ordenpago/leer-ordenpago/leer-ordenpago.component';
//@ts-ignore
import { ActualizarOrdenpagoComponent } from './pages/ordenpago/actualizar-ordenpago/actualizar-ordenpago.component';
//@ts-ignore
import { EliminarOrdenpagoComponent } from './pages/ordenpago/eliminar-ordenpago/eliminar-ordenpago.component';

export const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
      }
    ],
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full',
      },
      {
        path: 'inicio',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
        canActivate: [AuthGuard]
      },
      {
        path: 'ordenpago',
        canActivate: [AuthGuard],
        children: [
          { path: '', component: OrdenpagoComponent },
          { path: 'crear', component: CrearOrdenpagoComponent },
          { path: 'leer', component: LeerOrdenpagoComponent },
          { path: 'actualizar', component: ActualizarOrdenpagoComponent },
          { path: 'eliminar', component: EliminarOrdenpagoComponent },
        ]
      },
      {
        path: 'configuracionapi',
        canActivate: [AuthGuard],
        children: [
          { path: '', component: ConfiguracionApiComponent },
          { path: 'crear', component: CrearConfiguracionApiComponent },
          { path: 'leer', component: LeerConfiguracionApiComponent },
          { path: 'actualizar', component: ActualizarConfiguracionApiComponent },
          { path: 'eliminar', component: EliminarConfiguracionApiComponent },
        ]
      },
      { path: 'permisos', component: GestionPermisosComponent, canActivate: [AuthGuard] },
      { path: 'usuarios', component: GestionUsuariosComponent, canActivate: [AuthGuard] },
      { path: 'roles', component: GestionRolesComponent, canActivate: [AuthGuard] },
      { path: 'reportes', component: ReporteComponent, canActivate: [AuthGuard] },
      { path: 'archivo-ejemplo', component: ArchivoEjemploComponent, canActivate: [AuthGuard] },
      { path: 'importacion-datos', component: ImportacionDatosComponent, canActivate: [AuthGuard] },
      { path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard] },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  },
];