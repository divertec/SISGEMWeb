import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Helpers/auth.guard';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { ZonaComponent } from './pages/zona/zona.component';
import { CensoComponent } from './pages/censo/censo.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

/* const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
]; */


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  {
    path: 'dashboard', component: WelcomeComponent, canActivate: [AuthGuard],

    children: [
      {
        path: 'empleado', component: EmpleadoComponent
      },
      {
        path: 'zona', component: ZonaComponent
      },
      {
        path: 'censo', component: CensoComponent
      }, {
        path: 'perfil', component: PerfilComponent
      }
    ]

  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }