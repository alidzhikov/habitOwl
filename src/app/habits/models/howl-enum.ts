export class HowlEnum {
  text: string;
  constructor(public id: number, public arr: string[]) {
    this.text = this.arr[id];
  }
}
HowlEnum.prototype.toString = function() {
  return this.text;
};
