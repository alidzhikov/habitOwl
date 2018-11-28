import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from '@howl/core/containers/app.component';
import { NotFoundPageComponent } from '@howl/core/containers/not-found-page.component';
import { LayoutComponent } from '@howl/core/components/layout.component';
import { NavItemComponent } from '@howl/core/components/nav-item.component';
import { SidenavComponent } from '@howl/core/components/sidenav.component';
import { ToolbarComponent } from '@howl/core/components/toolbar.component';
import { MaterialModule } from '@howl/material';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {}
