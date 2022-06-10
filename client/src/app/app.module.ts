import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupCardComponent } from './signup-card/signup-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './material.module';
import { CustomErrorInterceptor } from './custom-error-interceptor';
import { LoginCardComponent } from './login-card/login-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateRutineComponent } from './create-rutine/create-rutine.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupCardComponent,
    NavBarComponent,
    LoginCardComponent,
    DashboardComponent,
    CreateRutineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,




  ],
  providers: [{
    provide: ErrorHandler,
    useClass: CustomErrorInterceptor
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
