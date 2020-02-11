export class Goal {
  constructor(
    public name: string,
    public endDate: Date,
    public priority: number,
    public activity: { name: string }[],
    public sub: Goal[],
    public id?: number,
    public parentId?: number
  ) {}
}
