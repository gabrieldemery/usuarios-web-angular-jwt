import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Components
import { LoginComponent } from './pages/off/login/login.component';
import { RegisterComponent } from './pages/off/register/register.component';
import { UsersComponent } from './pages/on/users/users.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: UsersComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
