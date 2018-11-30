import { DesiredFrequency } from "./desired-frequency";
import { HabitCategory } from "./habit-category";
import { Act } from "./act";

export class Habit {
  constructor(
    public id: number,
    public name: string,
    public comment: string,
    public category: HabitCategory,
    public desiredFrequency: DesiredFrequency,
    public acts?: Act[],
    public createdAt?: Date
  ) {}
}
