import { DesiredFrequency } from "./desired-frequency";
import { HabitCategory } from "./habit-category";
import { Act } from "./act";
import { Streak } from "./streak";

export class Habit {
  constructor(
    public name: string,
    public comment: string,
    public category: HabitCategory,
    public desiredFrequency: DesiredFrequency,
    public acts: Act[] = [],
    public id?: number,
    public createdAt?: Date,
    public currentStreak?: Streak
  ) {}

  clone() {
    let clone = this.clone;
    let stringifyForDb = this.stringifyForDb;
    let hab = JSON.parse(JSON.stringify(this));
    hab.category.toString = function() {
      return this.text;
    };
    hab.desiredFrequency.toString = function() {
      return this.text;
    };
    hab.clone = clone;
    hab.stringifyForDb = stringifyForDb;
    return hab;
  }

  stringifyForDb() {
    return JSON.stringify(this, function(k, v) {
      if (k === "category") {
        return v.id;
      } else if (k === "desiredFrequency") {
        return v.id;
      }
      return v;
    });
  }
}
