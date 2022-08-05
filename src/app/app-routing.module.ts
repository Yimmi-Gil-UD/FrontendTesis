import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'editar-nota/:id',
    loadChildren: () => import('./pages/editar-nota/editar-nota.module').then( m => m.EditarNotaPageModule)
  },
  {
    path: 'detalle-nota/:id',
    loadChildren: () => import('./pages/detalle-nota/detalle-nota.module').then( m => m.DetalleNotaPageModule)
  },
  {
    path: 'nuevo-nota',
    loadChildren: () => import('./pages/nuevo-nota/nuevo-nota.module').then( m => m.NuevoNotaPageModule)
  },
  {
    path: 'paciente',
    loadChildren: () => import('./pages/paciente/paciente.module').then( m => m.PacientePageModule)
  },
  {
    path: 'nota-terapia',
    loadChildren: () => import('./pages/nota-terapia/nota-terapia.module').then( m => m.NotaTerapiaPageModule)
  },
  {
    path: 'user-terapia',
    loadChildren: () => import('./pages/user-terapia/user-terapia.module').then( m => m.UserTerapiaPageModule)
  },
  {
    path: 'admin-terapia',
    loadChildren: () => import('./pages/admin-terapia/admin-terapia.module').then( m => m.AdminTerapiaPageModule)
  },
  {
    path: 'detalle-terapia/:id',
    loadChildren: () => import('./pages/detalle-terapia/detalle-terapia.module').then( m => m.DetalleTerapiaPageModule)
  },
  {
    path: 'editar-terapia/:id',
    loadChildren: () => import('./pages/editar-terapia/editar-terapia.module').then( m => m.EditarTerapiaPageModule)
  },
  {
    path: 'adicionar-enfermera',
    loadChildren: () => import('./pages/adicionar-enfermera/adicionar-enfermera.module').then( m => m.AdicionarEnfermeraPageModule)
  },
  {
    path: 'reportes-user',
    loadChildren: () => import('./pages/reportes-user/reportes-user.module').then( m => m.ReportesUserPageModule)
  },
  {
    path: 'reportes-admin',
    loadChildren: () => import('./pages/reportes-admin/reportes-admin.module').then( m => m.ReportesAdminPageModule)
  },
  {
    path: 'admin-enfermeras',
    loadChildren: () => import('./pages/admin-enfermeras/admin-enfermeras.module').then( m => m.AdminEnfermerasPageModule)
  },
  {
    path: 'admin-pacientes',
    loadChildren: () => import('./pages/admin-pacientes/admin-pacientes.module').then( m => m.AdminPacientesPageModule)
  },
  {
    path: 'editar-enfermera/:id',
    loadChildren: () => import('./pages/editar-enfermera/editar-enfermera.module').then( m => m.EditarEnfermeraPageModule)
  },
  {
    path: 'editar-paciente/:id',
    loadChildren: () => import('./pages/editar-paciente/editar-paciente.module').then( m => m.EditarPacientePageModule)
  },
  {
    path: 'detalle-paciente/:id',
    loadChildren: () => import('./pages/detalle-paciente/detalle-paciente.module').then( m => m.DetallePacientePageModule)
  },
  {
    path: 'detalle-enfermera/:id',
    loadChildren: () => import('./pages/detalle-enfermera/detalle-enfermera.module').then( m => m.DetalleEnfermeraPageModule)
  },
  {
    path: 'terapias',
    loadChildren: () => import('./pages/terapias/terapias.module').then( m => m.TerapiasPageModule)
  },
  {
    path: 'detalle-tipo-terapia/:id',
    loadChildren: () => import('./pages/detalle-tipo-terapia/detalle-tipo-terapia.module').then( m => m.DetalleTipoTerapiaPageModule)
  },
  {
    path: 'editar-tipo-terapia/:id',
    loadChildren: () => import('./pages/editar-tipo-terapia/editar-tipo-terapia.module').then( m => m.EditarTipoTerapiaPageModule)
  },
  {
    path: 'adicionar-tipo-terapia',
    loadChildren: () => import('./pages/adicionar-tipo-terapia/adicionar-tipo-terapia.module').then( m => m.AdicionarTipoTerapiaPageModule)
  },
  {
    path: 'registros-log',
    loadChildren: () => import('./pages/registros-log/registros-log.module').then( m => m.RegistrosLogPageModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },

 
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
