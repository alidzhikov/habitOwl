export class Act {
  constructor(
    public habitId: number,
    public date: Date,
    public performance: number,
    public id?: number,
    public createdAt?: Date
  ) {}
}
