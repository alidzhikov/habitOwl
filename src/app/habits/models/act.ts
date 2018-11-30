import { Habit } from "./habit";

export class Act {
  constructor(public habitId: number, public date: Date, public id?: number) {}
}
