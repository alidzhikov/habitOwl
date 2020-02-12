import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  template: `
    <h3>Performance</h3>
    <form [formGroup]="performanceForm">
        <mat-label>Performance measured in sth</mat-label>
        <br/>
        <mat-radio-group formControlName="performance">
            <mat-radio-button *ngFor="let rate of ratingRange" [value]="rate">
            {{rate}}
            </mat-radio-button>
        </mat-radio-group>
        <mat-error *ngIf="performanceFormPerformance?.hasError('required')">
            Performance is <strong>required</strong>
        </mat-error>
    </form>
    <br/>
    <button
      mat-button
      color="primary"
      (click)="onSave()"
      [disabled]="!performanceForm.valid"
    >
      Rate
    </button>
    <button mat-button color="warn" (click)="onCancel()">Cancel</button>
  `,
  styles: ["mat-form-field { display: block; }"]
})
export class RateActDialogComponent implements OnInit {
    performanceForm: FormGroup;
    ratingRange = [1,2,3,4,5,6,7,8,9,10];
  constructor(
    public dialogRef: MatDialogRef<RateActDialogComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.performanceForm = this.fb.group({
      performance: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.performanceForm.valid) {
      return;
    }
    this.dialogRef.close({ performance: this.performanceFormPerformance.value });
  }

  get performanceFormPerformance() {
    return this.performanceForm.get("performance");
  }
}
