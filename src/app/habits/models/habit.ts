import { DesiredFrequency } from "./desired-frequency";
import { HabitCategory } from "./habit-category";

export class Habit {
  constructor(
    public id: number,
    public name: string,
    public comment: string,
    public category: HabitCategory,
    public desiredFrequency: DesiredFrequency,
    public createdAt?: Date
  ) {}
}
