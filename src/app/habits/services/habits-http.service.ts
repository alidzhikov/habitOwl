import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Habit } from "../models/habit";
import { environment } from "src/environments/environment";

@Injectable()
export class HabitsHttpService {
    constructor(public http: HttpClient){}

    fetchAllHabits(){
        this.http.get<Habit[]>(environment.dataURL);//.pipe();
    }
}