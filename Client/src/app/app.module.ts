import { AgeDialogComponent } from './_components/dialogs/age-dialog/age-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';
import { routing } from './app-routing.module';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { AppComponent } from './_components/app.component';
import { RegisterComponent, LoginComponent, ForgotPasswordComponent, ResetPasswordComponent } from './_components/auth/index';
import { NavigationComponent } from './_components/navigation/navigation.component';
import { HomeComponent } from './_components/home/home.component';
import { MaterialComponentsModule } from './material-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmationDialogComponent } from './_components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { NocontestComponent } from './_components/nocontest/nocontest.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NavigationComponent,
    HomeComponent,
    ConfirmationDialogComponent,
    AgeDialogComponent,
    NocontestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialComponentsModule,
    FlexLayoutModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    AgeDialogComponent
  ]
})

export class AppModule {

}
