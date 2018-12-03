import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ActivityCollectionComponent } from "./containers/activity-collection.component";
import { ViewHabitPageComponent } from "./containers/view-habit-page.component";

//import { BookExistsGuard } from '@howl/books/guards/book-exists.guard';

export const routes: Routes = [
  // { path: '', component: FindBookPageComponent },
  {
    path: ":id",
    component: ViewHabitPageComponent
    //canActivate: [BookExistsGuard],
  },
  { path: "", component: ActivityCollectionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabitsRoutingModule {}
