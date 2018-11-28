import { DesiredFrequency } from "./desired-frequency";

export class Habit {
    constructor(
        public id: number,
        public name: string,
        public comment: string,
        public type: string,
        public desiredFrequency: DesiredFrequency
        ){}
}