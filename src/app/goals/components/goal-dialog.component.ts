import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Goal } from "../models/goal";

@Component({
  template: `
    <h3>{{ data.addOrEdit }} goal</h3>
    <form [formGroup]="goalForm">
      <mat-form-field class="example-full-width">
        <input matInput placeholder="Name" formControlName="name" />
        <mat-error
          *ngIf="
            goalFormName?.hasError('name') &&
            !goalFormName?.hasError('required')
          "
        >
          Please enter a valid name
        </mat-error>
        <mat-error *ngIf="goalFormName?.hasError('required')">
          Name is <strong>required</strong>
        </mat-error>
      </mat-form-field>
      <mat-form-field class="example-full-width">
        <input
          matInput
          placeholder="Completion date"
          formControlName="endDate"
          [matDatepicker]="endDatePicker"
        />
        <mat-datepicker-toggle matSuffix [for]="endDatePicker"></mat-datepicker-toggle>
        <mat-datepicker #endDatePicker></mat-datepicker>
        <mat-error
          *ngIf="
            goalFormEndDate?.hasError('endDate') &&
            !goalFormEndDate?.hasError('required')
          "
        >
          Please enter a valid date
        </mat-error>
        <mat-error *ngIf="goalFormEndDate?.hasError('required')">
          Completion date is <strong>required</strong>
        </mat-error>
      </mat-form-field>
      <mat-form-field class="example-full-width">
        <input
          matInput
          placeholder="Priority"
          formControlName="priority"
        />
        <mat-error
          *ngIf="
            goalFormPriority?.hasError('priority') &&
            !goalFormPriority?.hasError('required')
          "
        >
        Please enter a valid priority
        </mat-error>
        <mat-error *ngIf="goalFormEndDate?.hasError('required')">
          Priority is <strong>required</strong>
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-select
          placeholder="Goal Parent"
          formControlName="parentId"
          name="parentId"
        >
        </mat-select>
      </mat-form-field>
    </form>
    <button
      mat-button
      color="primary"
      (click)="onSave()"
      [disabled]="!goalForm.valid"
    >
      Save
    </button>
    <button mat-button color="warn" (click)="onCancel()">Cancel</button>
  `,
  styles: ["mat-form-field { display: block; }"]
})
export class GoalDialogComponent implements OnInit {
  goalForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GoalDialogComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    const goal = this.data.goal;
    //get all goals that were added and display them in a nested dropdown
    this.goalForm = this.fb.group({
      name: [goal ? goal.name : "", Validators.required, Validators.maxLength(70)],
      endDate: [goal ? goal.endDate : ""],//custom validdatros like endDate should be after today
      priority: [goal ? goal.priority : "", Validators.required, Validators.min(1)],
      parentId: [ goal ? goal.parentId : "", Validators.required] //select by goal names not ids
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.goalForm.valid) {
      return;
    }
    let goalToEdit: Goal | undefined = this.data.goal;

    // let goal = new Goal(
    //   this.goalFormName.value,
    //   this.goalFormDescription.value,
    //   new HabitCategory(categoryId),
    //   new DesiredFrequency(desiredFrequencyId),
    //   goalToEdit ? goalToEdit.acts : [],
    //   goalToEdit ? goalToEdit.id : undefined,
    //   goalToEdit ? goalToEdit.createdAt : new Date()
    // );
    let goal = null;
    this.dialogRef.close({ goal: goal });
  }

  get goalFormName() {
    return this.goalForm.get("name");
  }
  get goalFormEndDate() {
    return this.goalForm.get("endDate");
  }
  get goalFormPriority() {
    return this.goalForm.get("priority");
  }
  get goalFormParentId() {
    return this.goalForm.get("parentId");
  }
}
