import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginPageComponent } from '@howl/auth/containers/login-page.component';
import { LoginFormComponent } from '@howl/auth/components/login-form.component';
import { LogoutConfirmationDialogComponent } from '@howl/auth/components/logout-confirmation-dialog.component';

import { AuthEffects } from '@howl/auth/effects/auth.effects';
import { reducers } from '@howl/auth/reducers';
import { MaterialModule } from '@howl/material';
import { AuthRoutingModule } from '@howl/auth/auth-routing.module';

export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent,
  LogoutConfirmationDialogComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: COMPONENTS,
  entryComponents: [LogoutConfirmationDialogComponent],
})
export class AuthModule {}
