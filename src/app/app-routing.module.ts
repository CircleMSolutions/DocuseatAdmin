import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { MessagesComponent } from './messages/messages.component'
import { UsersComponent } from './users/users.component';
import { AngularFireAuthGuard, customClaims } from '@angular/fire/auth-guard'
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators'
import { IncidentsComponent } from './incidents/incidents.component';
import { SplashComponent } from './splash/splash.component';

const canAdmin = () => pipe(customClaims, map(claims => claims.superUser === true));

const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'login', component: LoginComponent},
  { path: 'mainmenu', component: MainmenuComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: canAdmin} },
  { path: 'users', component: UsersComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: canAdmin} },
  { path: 'messages', component: MessagesComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: canAdmin} },
  { path: 'incidents', component: IncidentsComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: canAdmin} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
