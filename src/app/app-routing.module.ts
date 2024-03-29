import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmpleadosComponent } from './components/create-empleados/create-empleados.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';

const routes: Routes = [
  {path: '', redirectTo: 'list-empleados', pathMatch: 'full'},
  {path: 'list-empleados', component: ListEmpleadosComponent},
  {path: 'create-empleado', component: CreateEmpleadosComponent},
  {path: 'edit-empleado/:id', component: CreateEmpleadosComponent},
  {path: '**', redirectTo: 'list-empleados', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
