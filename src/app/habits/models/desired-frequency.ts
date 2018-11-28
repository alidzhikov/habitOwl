import { HowlEnum } from "./howl-enum";

export const DesiredFrequencyArr: string[] = [
    'Everyday',
    'Three times a week',
    'Once a month',
    'Once a week',
];
//TODO every x day of the week or every x day of the month

export class DesiredFrequency extends HowlEnum {
    constructor(public id: number){
            super(id,DesiredFrequencyArr);
        }
}