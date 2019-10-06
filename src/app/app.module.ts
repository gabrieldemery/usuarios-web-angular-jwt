import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';

// Interceptors
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/off/login/login.component';
import { RegisterComponent } from './pages/off/register/register.component';
import { UsersComponent } from './pages/on/users/users.component';
import { FormComponent } from './pages/on/users/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [FormComponent]
})
export class AppModule { }
