import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "@howl/auth/services/auth-guard.service";
import { NotFoundPageComponent } from "@howl/core/containers/not-found-page.component";

export const routes: Routes = [
  { path: "", redirectTo: "/habits", pathMatch: "full" },
  {
    path: "books",
    loadChildren: "@howl/books/books.module#BooksModule",
    canActivate: [AuthGuard]
  },
  {
    path: "habits",
    loadChildren: "@howl/habits/habits.module#HabitsModule"
    //canActivate: [AuthGuard],
  },
  { path: "**", component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
