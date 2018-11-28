import { Component, Input } from "@angular/core";
import { Habit } from "../models/habit";

@Component({
    selector: 'howl-habit-li',
    templateUrl: 'howl-habit-li.component.html'
})
export class HabitListComponent {
    @Input() habits: Habit[];
}