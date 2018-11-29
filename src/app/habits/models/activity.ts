import { Habit } from "./habit";

export class Act {
    constructor(
        id: number,
        habitId: number,
        habit: Habit | undefined,
        date: Date,
        fulfilled: boolean
    ) {}
}