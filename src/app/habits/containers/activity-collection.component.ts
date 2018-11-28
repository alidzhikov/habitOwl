import { Component, OnInit } from "@angular/core";
import { Habit } from "../models/habit";
import { Observable, from } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as fromHabits from '@howl/habits/reducers';

@Component({
    selector: 'howl-habits-list',
    template: `
       <!-- <howl-habit-li *ngFor="(habits | async) as habit"></howl-habit-li>-->
    `
})
export class ActivityCollectionComponent implements OnInit{
    habits$: Observable<Habit[]>;
    
    constructor(private store: Store<fromHabits.State>){
        //this.store.dispatch(new )
        //this.habits$ = store.pipe(select(fromHabits.getAllHabits))
    }

    ngOnInit(){
        //this.store.dispatch(new )
    }
}