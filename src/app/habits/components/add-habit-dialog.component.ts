import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import {
  habitCategoriesDisplay,
  HabitCategory
} from "../models/habit-category";
import {
  desiredFrequencyDisplay,
  DesiredFrequency
} from "../models/desired-frequency";
import { Habit } from "../models/habit";

@Component({
  template: `
    <h3>{{ data.addOrEdit }} Habit</h3>
    <form [formGroup]="habitForm">
      <mat-form-field class="example-full-width">
        <input 
          matInput 
          placeholder="Name" 
          formControlName="name" 
        />
        <mat-error
          *ngIf="
            habitFormName?.hasError('name') &&
            !habitFormName?.hasError('required')
          "
        >
          Please enter a valid name
        </mat-error>
        <mat-error *ngIf="habitFormName?.hasError('required')">
          Name is <strong>required</strong>
        </mat-error>
      </mat-form-field>
      <mat-form-field class="example-full-width">
        <input
          matInput
          placeholder="Description"
          formControlName="description"
        />
        <mat-error
          *ngIf="
            habitFormDescription?.hasError('description') &&
            !habitFormDescription?.hasError('required')
          "
        >
          Please enter a valid description
        </mat-error>
        <mat-error *ngIf="habitFormDescription?.hasError('required')">
          Description is <strong>required</strong>
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-select
          placeholder="Habit Category"
          formControlName="category"
          name="category"
        >
          <mat-option
            *ngFor="let habitCategory of habitCategories"
            [value]="habitCategory"
          >
            {{ habitCategory }}
          </mat-option>
        </mat-select>
        <mat-error *ngIf="habitFormCategory?.hasError('required')">
          Habit Category is <strong>required</strong>
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-select
          placeholder="Desired Frequency"
          formControlName="desiredFrequency"
          name="desiredFrequency"
        >
          <mat-option
            *ngFor="let desiredFrequency of desiredFrequencies"
            [value]="desiredFrequency"
          >
            {{ desiredFrequency }}
          </mat-option>
        </mat-select>
        <mat-error *ngIf="habitFormDesiredFrequency?.hasError('required')">
          Desired Frequency is <strong>required</strong>
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <input
          matInput
          type="number"
          placeholder="Reward"
          formControlName="reward"
        />
        <mat-hint>You can use reward points to purchase something cool!</mat-hint>
        <mat-error *ngIf="habitFormReward?.hasError('required')">
          Desired Frequency is <strong>required</strong>
        </mat-error>
        <mat-error *ngIf="habitFormReward?.hasError('max')">
          Reward can't be more than <strong>10</strong>
        </mat-error>
        <mat-error *ngIf="habitFormReward?.hasError('min')">
          Reward can't be less than <strong>0</strong>
        </mat-error>
      </mat-form-field>
    </form>
    <br/>
    <button
      mat-button
      color="primary"
      (click)="onSave()"
      [disabled]="!habitForm.valid"
    >
      Save
    </button>
    <button mat-button color="warn" (click)="onCancel()">Cancel</button>
  `,
  styles: ["mat-form-field { display: block; }"]
})
export class HabitDialogComponent implements OnInit {
  habitForm: FormGroup;
  habitCategories = habitCategoriesDisplay;
  desiredFrequencies = desiredFrequencyDisplay;

  constructor(
    public dialogRef: MatDialogRef<HabitDialogComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    let habit = this.data.habit;
    this.habitForm = this.fb.group({
      name: [habit ? habit.name : "", Validators.required],
      description: [habit ? habit.comment : "", Validators.maxLength(200)],
      category: [habit ? habit.category.text : "", Validators.required],
      desiredFrequency: [
        habit ? habit.desiredFrequency.text : "",
        Validators.required
      ],
      reward: [habit ? habit.reward : 1, [Validators.required,Validators.max(10),Validators.min(0)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.habitForm.valid) {
      return;
    }
    let habitToEdit: Habit | undefined = this.data.habit;
    let categoryId = this.habitCategories.findIndex(
      cat => cat == this.habitFormCategory.value
    );
    let desiredFrequencyId = this.desiredFrequencies.findIndex(
      freq => freq == this.habitFormDesiredFrequency.value
    );
    let habit = new Habit(
      this.habitFormName.value,
      this.habitFormDescription.value,
      new HabitCategory(categoryId),
      new DesiredFrequency(desiredFrequencyId),
      habitToEdit ? habitToEdit.acts : [],
      this.habitFormReward.value,
      null,
      habitToEdit ? habitToEdit.id : undefined,
      habitToEdit ? habitToEdit.createdAt : new Date()
    );
    this.dialogRef.close({ habit: habit });
  }

  get habitFormName() {
    return this.habitForm.get("name");
  }
  get habitFormDescription() {
    return this.habitForm.get("description");
  }
  get habitFormCategory() {
    return this.habitForm.get("category");
  }
  get habitFormDesiredFrequency() {
    return this.habitForm.get("desiredFrequency");
  }
  get habitFormReward() {
    return this.habitForm.get("reward");
  }
}
