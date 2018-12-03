import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { ComponentsModule } from "@howl/books/components";
import { HabitEffects } from "@howl/habits/effects/habit.effects";
import { CollectionEffects } from "@howl/habits/effects/collection.effects";

import { MaterialModule } from "@howl/material";

import { reducers } from "@howl/habits/reducers";
import { HabitsRoutingModule } from "@howl/habits/habits-routing.module";

import { HabitsHttpService } from "./services/habits-http.service";
import { ActivityCollectionComponent } from "./containers/activity-collection.component";
import { HabitCalendarComponent } from "./components/habit-calendar.component";
import { CalendarDateBtn } from "./components/calendar-date-btn.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    HabitsRoutingModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature("habits", reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([HabitEffects, CollectionEffects])
  ],
  declarations: [
    ActivityCollectionComponent,
    HabitCalendarComponent,
    CalendarDateBtn
  ],
  providers: [HabitsHttpService]
})
export class HabitsModule {}
