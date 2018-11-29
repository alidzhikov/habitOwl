import { HowlEnum } from "./howl-enum";

export const habitCategoriesDisplay = [
  "Work",
  "Personal Development",
  "Health",
  "Spirituality",
  "Relationships",
  "Life Purpose"
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
