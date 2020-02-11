import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { ComponentsModule } from "@howl/books/components";
import { GoalEffects } from "@howl/goals/effects/goal.effects";
import { CollectionEffects } from "@howl/habits/effects/collection.effects";

import { MaterialModule } from "@howl/material";

import { reducers } from "@howl/goals/reducers";
import { GoalsRoutingModule } from "@howl/goals/goals-routing.module";

// import { HabitHttpService } from "./services/habit-http.service";
// import { ActivityCollectionComponent } from "./containers/activity-collection.component";
// import { HabitCalendarComponent } from "./components/calendar.component";
// import { CalendarDateBtn } from "./components/calendar-date-btn.component";
// import { ViewHabitPageComponent } from "./containers/view-habit-page.component";
// import { PeriodButtonComponent } from "./components/calendar-period-btn.component";
// import { AddHabitComponent } from "./components/add-habit.component";
// import { HabitDialogComponent } from "./components/add-habit-dialog.component";
import { ReactiveFormsModule } from "@angular/forms";
import { GoalsHttpService } from "./services/goals-http.service";
import { DashboardComponent } from "./containers/dashboard.component";
import { AddGoalBtnComponent } from "./components/add-goal-btn.component";
import { GoalDialogComponent } from "./components/goal-dialog.component";
// import { BooleanDialogComponent } from "./components/boolean-dialog.component";
// import { HabitDetailsComponent } from "./components/habit-details.component";
// import { HabitService } from "./services/habit.service";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    GoalsRoutingModule,
    ReactiveFormsModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature("goals", reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([GoalEffects, CollectionEffects])
  ],
  declarations: [
    DashboardComponent,
    AddGoalBtnComponent,
    GoalDialogComponent
  ],
  providers: [GoalsHttpService/*, GoalsService*/],
  bootstrap: [GoalDialogComponent, /*BooleanDialogComponent*/]
})
export class GoalsModule {}
