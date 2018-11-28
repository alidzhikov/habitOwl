import { Habit } from "./habit";

export class Activity {
    constructor(
        id:number,
        habitId: number,
        habit: Habit | undefined,
        date: Date,
        fulfilled: boolean
    ){}
}