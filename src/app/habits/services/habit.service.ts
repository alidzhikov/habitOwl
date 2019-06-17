import { Injectable } from "@angular/core";
import { Habit } from "../models/habit";
import * as moment from "moment";
import { Streak } from "../models/streak";
import { Act } from "../models/act";
import { HabitCollectionActions } from "@howl/habits/actions";
@Injectable()
export class HabitService {
  /**
   *
   * @param habit
   * get all of the streaks in habit acts
   *
   * NOTE: the start day of the streaks is 10 o'clock
   * the day before of the real start date because
   * the method startof day works that way
   */

  getStreaks(habit: Habit): Streak[] | undefined {
    if (!habit || !habit.acts || habit.acts.length < 1) {
      return;
    }
    let streak: Streak = {
      count: 1,
      startDate: new Date(),
      endDate: new Date()
    };
    let streaks: Streak[] = [];
    let acts = this.getSortedActs(habit);
    let act = acts.reduce((acc, act) => {
      let startDate = JSON.parse(JSON.stringify(acc.date));
      if (
        acc &&
        moment(acc.date)
          .startOf("day")
          .diff(moment(act.date).startOf("day"), "days") == -1
      ) {
        if (streak.count == 1) {
          streak.startDate = startDate;
        }
        streak.endDate = act.date;
        streak.count++;
      } else {
        if (streak.count == 1) {
          streak.startDate = startDate;
          streak.endDate = acc.date;
        }
        streaks.push(streak);
        streak = { count: 1, startDate: new Date(), endDate: new Date() };
      }
      return act;
    });

    if (streak.count > 1) {
      streak.endDate = act.date;
      streaks.push(streak);
    } else {
      streaks.push({ count: 1, startDate: act.date, endDate: act.date });
    }
    return streaks;
  }

  getLongestStreak(habit: Habit) {
    let streaks: Streak[] = this.getStreaks(habit);
    let highestStreak = {
      count: 0,
      startDate: new Date(),
      endDate: new Date()
    };
    if (!streaks) {
      return;
    }
    streaks.forEach(
      streak =>
        (highestStreak =
          streak.count > highestStreak.count ? streak : highestStreak)
    );
    return highestStreak;
  }

  getSortedActs(habit: Habit, sortBy: "asc" | "desc" = "asc") {
    if (!habit.acts) {
      return [];
    }
    let acts = habit.acts.slice();
    let sortByMultiplier = sortBy == "asc" ? 1 : -1;
    acts.sort((a, b) =>
      moment(a.date).isSame(moment(b.date))
        ? 0
        : sortByMultiplier * (moment(a.date).isAfter(moment(b.date)) ? 1 : -1)
    );
    return acts;
  }

  getCompletionPercentage(habit: Habit) {
    if(!habit){return}
    let daysSinceStarted = moment(habit.createdAt).diff(moment(), "days");
    let habitActs = this.filterActsByCurrentDate(this.getSortedActs(habit))
      .length;
    return (-habitActs * daysSinceStarted) / 100;
  }

  getCurrentStreak(habit: Habit) {
    let streaks: Streak[] = this.getStreaks(habit);
    if (!streaks) {
      return;
    }
    return streaks.find(
      streak =>
        moment(streak.endDate)
          .startOf("day")
          .isSame(moment().startOf("day")) ||
        moment(streak.endDate)
          .startOf("day")
          .isSame(
            moment()
              .startOf("day")
              .subtract(1, "day")
          )
    );
  }

  filterActsByCurrentDate(acts: Act[]) {
    return acts.filter(act =>
      moment(act.date)
        .startOf("day")
        .isSameOrBefore(moment().startOf("day"))
    );
  }

  addOrRemoveAct(date: Date, habit: Habit){
    if (habit.acts) {
      return habit.acts.findIndex(act =>
        moment(act.date)
          .startOf("day")
          .isSame(moment(date))
      );
    } else {
      return -1;
    }
  }
}
