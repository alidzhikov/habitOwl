import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  template: `
    <span
      ><b>{{ data.text }}</b></span
    ><br />
    <button mat-button color="primary" (click)="onYes()">Yes</button>
    <button mat-button color="warn" (click)="onNo()">No</button>
  `
})
export class BooleanDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BooleanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNo(): void {
    this.dialogRef.close({ res: false });
  }

  onYes(): void {
    this.dialogRef.close({ res: true });
  }
}
