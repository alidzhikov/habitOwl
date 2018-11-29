import { Component, Input } from "@angular/core";
import { Habit } from "../models/habit";

@Component({
  selector: "howl-habit-li",
  template: `
    <span
      >{{ habit.name }} -> {{ habit.category }} -
      {{ habit.desiredFrequency }}</span
    ><br />
  `
})
export class HabitListComponent {
  @Input() habit: Habit;
}
