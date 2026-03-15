import { Routes } from '@angular/router';
import { App } from './app';
import { Login } from './login/login';
import { InicioComponent } from './inicio-component/inicio-component';
import { authGuard } from './auth-guard/auth-guard';
import { Register } from './register/register';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'register', component: Register},
{ 
    path: 'inicio', 
      component: InicioComponent, 
      canActivate: [authGuard] 
    },

    { path: '**', redirectTo: '' }
];
