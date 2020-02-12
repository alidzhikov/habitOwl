import { Component, ViewChild,NgModule } from "@angular/core";
import { Habit } from "../models/habit";
import { Observable, from, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as fromHabits from "@howl/habits/reducers";
import { HabitCollectionActions } from "@howl/habits/actions";
import { MatDialog } from "@angular/material";
import { HabitDialogComponent } from "../components/add-habit-dialog.component";
import { HabitService } from "../services/habit.service";
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropListGroup, CdkDropList, CdkDragMove, CdkDrag } from "@angular/cdk/drag-drop";

import { first, map } from "rxjs/operators";
import {ViewportRuler} from "@angular/cdk/overlay";
import { RateActDialogComponent } from "../components/rate-act-dialog.component";

@Component({
  selector: "howl-habits-list",
  template: `
    <div cdkDropList class="habit-container" (cdkDropListDropped)="drop($event)" *ngIf="isReordering">
      <howl-calendar
        class="col-xs-12 drag-box drag-movable"
        *ngFor="let habit of (habits$ | async)"
        [period]="'week'"
        [habit]="habit"
        [isReordering]="isReordering"
        (toggleFulfilledEmitter)="toggleFulfilled($event)"
        cdkDrag
        >{{habit}}
      </howl-calendar>
    </div>

    <div *ngIf="!isReordering">
      <howl-calendar
        class="col-xs-12 drag-box"
        *ngFor="let habit of (habits$ | async)"
        [period]="'week'"
        [habit]="habit"
        (toggleFulfilledEmitter)="toggleFulfilled($event)"
        >{{habit}}
      </howl-calendar>
    </div>
   
    <howl-add-habit (createHabitDialog)="openHabitDialog()"></howl-add-habit>
    <howl-reorder-habit [isReordering]="isReordering" (reorderHabit)="onReorderHabit($event)"></howl-reorder-habit>
  `,
  styles:['.cdk-drag-preview {box-sizing: border-box;border-radius: 4px;box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),0 8px 10px 1px rgba(0, 0, 0, 0.14),0 3px 14px 2px rgba(0, 0, 0, 0.12);}',
  '.cdk-drag-placeholder { opacity: 0;}',
  ' .cdk-drag-animating { transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);}',
  '.example-box:last-child {  border: none;}',
  '.drag-container.cdk-drop-list-dragging .drag-box:not(.cdk-drag-placeholder) {transition: transform 250ms cubic-bezier(0, 0, 0.2, 1); }',
  '.drag-box{flex-direction: cell; align-items: center;justify-content: space-between;box-sizing: border-box; background: white;  font-size: 14px; display:inline-block;margin:0 5px 10px 0;}',
  '.drag-movable{ cursor: move;}',
  '.drag-container{}',
  '.habit-container{ display: flex;flex-wrap: wrap; max-width: 500px;}'
]
})
export class ActivityCollectionComponent {

  isReordering = false;
  habits$: Observable<Habit[]>;

  constructor(
    private store: Store<fromHabits.State>,
    private dialog: MatDialog,
    private habitService: HabitService
  ) {
    this.habits$ = this.store.pipe(select(fromHabits.getAllHabits));
  }

  toggleFulfilled(ev: { date: Date; habit: Habit }) {
    const actIndex = this.habitService.addOrRemoveAct(ev.date, ev.habit);
    if (actIndex > -1) {
      this.store.dispatch(new HabitCollectionActions.RemoveActDb(ev.habit.acts[actIndex]));
    } else {
      const dialogRef = this.dialog.open(RateActDialogComponent, {
        minWidth: '430px',
        data: { habit: ev.habit }
      });
      dialogRef
        .afterClosed()
        .subscribe(res =>{
          ev['performance'] = res.performance;
          console.log(ev);
          this.store.dispatch(new HabitCollectionActions.AddActDb(ev));
        }
      );
    }    
  }

  openHabitDialog() {
    let dialogRef = this.dialog.open(HabitDialogComponent, {
      data: { addOrEdit: "New" }
    });
    dialogRef
      .afterClosed()
      .subscribe(res =>{
        console.log(res.habit);
        this.store.dispatch(new HabitCollectionActions.AddHabitToDb(res.habit))
      }
      );
  }

  onReorderHabit(save: boolean | undefined){
    this.isReordering = !this.isReordering;
    //if(save){
      //let habitIDs = [];
      // this.habits$.pipe(map(habits => habits.map(habit => habit.id))).subscribe(habits => {
      //   console.log(habits);

      // });
      //this.store.dispatch(new HabitCollectionActions.DragSort(this.habits$.pipe(map(habits => habits.map(habit => habit.id))))
    //}
  }

  drop(event: CdkDragDrop<string[]>) {
    this.habits$.pipe(first()).subscribe(habits => {
      moveItemInArray(habits, event.previousIndex, event.currentIndex);
      this.store.dispatch(new HabitCollectionActions.DragSort(habits.map(habit=> { console.log(habit.id); return habit.id.toString()})));
    });
  }
}