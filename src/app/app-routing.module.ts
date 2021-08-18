import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { LoginComponent } from './components/login.component';
import { HomeAdminComponent } from './components/homeAdmin.component';
import { HomeEmpleadoComponent } from './components/homeEmpleado.component';
import { RecuperarComponent } from './components/recuperar.component';

const routes: Routes = [

    // Modulos
    { path: '', component: LoginComponent},
    { path: 'admin', component: HomeAdminComponent},
    { path: 'empleado', component: HomeEmpleadoComponent},
    { path: 'recuperar', component: RecuperarComponent},

    // Detecta cualquier URL no encontrada
    { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


