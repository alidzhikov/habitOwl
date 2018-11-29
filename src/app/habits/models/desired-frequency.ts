import { HowlEnum } from "./howl-enum";

export const desiredFrequencyDisplay: string[] = [
  "Everyday",
  "Three times a week",
  "Once a month",
  "Once a week"
];

export enum DesiredFrequencyType {
  Everyday,
  ThreeTimesAWeek,
  OnceAMonth,
  OnceAWeek
}
//TODO every x day of the week or every x day of the month

export class DesiredFrequency extends HowlEnum {
  constructor(public id: DesiredFrequencyType) {
    super(id, desiredFrequencyDisplay);
  }
}
