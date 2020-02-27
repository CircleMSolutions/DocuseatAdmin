import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { UsersComponent } from './users/users.component';
import { IncidentsComponent } from './incidents/incidents.component';

import { AuthService } from './core/auth.service';
import { environment } from 'src/environments/environment';
//Store
import { StoreModule } from '@ngrx/store'
import { appReducer } from './store/reducers';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effect';
//Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
//Angular fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { MessagesComponent } from './messages/messages.component';
import { SplashComponent } from './splash/splash.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { CreateuserComponent } from './users/createuser/createuser.component';
import { CoreService } from './core/core.service';
import { UserlistComponent } from './users/userlist/userlist.component';
import { SetclaimsComponent } from './users/setclaims/setclaims.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    MainmenuComponent,
    UsersComponent,
    IncidentsComponent,
    MessagesComponent,
    SplashComponent,
    CreateuserComponent,
    UserlistComponent,
    SetclaimsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreModule.forRoot(appReducer),
    //StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([AuthEffects]),
    AngularFireFunctionsModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    CoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
