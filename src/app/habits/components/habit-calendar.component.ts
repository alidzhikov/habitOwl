import { Component, OnInit, Input } from "@angular/core";
import * as moment from "moment";
import { Habit } from "../models/habit";
import { Act } from "../models/act";
@Component({
  selector: "howl-calendar",
  templateUrl: "./howl-calendar.component.html"
})
export class HabitCalendarComponent implements OnInit {
  daysOfWeek;
  @Input() habit: any;
  today = moment()
    .startOf("day")
    .toDate();
  dataSource = [
    {
      monday: 1,
      tuesday: "Hydrogen",
      wednesday: 1.0079,
      thursday: "H",
      friday: 34,
      saturday: 45,
      sunday: 34
    },
    { monday: 2, tuesday: "Helium", wednesday: 4.0026, thursday: "He" },
    { monday: 3, tuesday: "Lithium", wednesday: 6.941, thursday: "Li" },
    { monday: 4, tuesday: "Beryllium", wednesday: 9.0122, thursday: "Be" },
    { monday: 5, tuesday: "Boron", wednesday: 10.811, thursday: "B" },
    { monday: 6, tuesday: "Carbon", wednesday: 12.0107, thursday: "C" },
    { monday: 7, tuesday: "Nitrogen", wednesday: 14.0067, thursday: "N" },
    { monday: 8, tuesday: "Oxygen", wednesday: 15.9994, thursday: "O" },
    { monday: 9, tuesday: "Fluorine", wednesday: 18.9984, thursday: "F" },
    { monday: 10, tuesday: "Neon", wednesday: 20.1797, thursday: "Ne" }
  ];
  displayedColumns: string[] = moment.weekdays().map(s => s.toLowerCase());

  ngOnInit() {
    this.daysOfWeek = this.currentWeekDays();
    this.displayedColumns.push(this.displayedColumns.shift());
  }

  currentWeekDays() {
    const startOfWeek = moment().startOf("isoWeek");
    const endOfWeek = moment().endOf("isoWeek");
    let days = [];
    let day = startOfWeek;
    while (day <= endOfWeek) {
      days.push(day.toDate());
      day = day.clone().add(1, "d");
    }
    return days;
  }

  toggleFulfilled(ev: { date: Date; habit: Habit }) {
    let act = new Act(ev.habit.id, ev.date);
    if (ev.habit.acts) {
      let actIndex = ev.habit.acts.findIndex(act =>
        moment(act.date)
          .startOf("day")
          .isSame(moment(ev.date))
      );
      if (actIndex > -1) {
        ev.habit.acts.splice(actIndex, 1);
      } else {
        ev.habit.acts.push(act);
      }
    } else {
      ev.habit.acts = [act];
    }
  }
}
