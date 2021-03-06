import { HowlEnum } from "./howl-enum";

export const habitCategoriesDisplay = [
  "Work",
  "Personal Development",
  "Health",
  "Spirituality",
  "Relationships",
  "Life Purpose"
];

export const habitCategoryColors = [
  '#ff9933',
  '#ffcc00',
  '#66ff33',
  '#40e0d0',
  '#ff5050',
  '#ff6699'
];
export enum HabitCategoryType {
  Work,
  PersonalDevelopment,
  Health,
  Spirituality,
  Relationships,
  LifePurpose
}

export class HabitCategory extends HowlEnum {
  constructor(public id: HabitCategoryType) {
    super(id, habitCategoriesDisplay);
  }
}
