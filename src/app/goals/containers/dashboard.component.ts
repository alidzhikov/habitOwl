import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromGoals from "@howl/goals/reducers";
import { GoalsHttpService } from "../services/goals-http.service";
import { MatDialog } from "@angular/material";
import { GoalDialogComponent } from "../components/goal-dialog.component";
import { GoalCollectionActions } from "../actions";

@Component({
    selector: "howl-goals-dashboard",
    template: `<howl-add-goal-btn (createGoalDialog)="openGoalDialog()"></howl-add-goal-btn>`,
    styles: []
})
export class DashboardComponent {
    constructor(
        private store: Store<fromGoals.State>,
        private goalService: GoalsHttpService,
        private dialog: MatDialog,
    ){}

    openGoalDialog(){
        let dialogRef = this.dialog.open(GoalDialogComponent, {
            data: { addOrEdit: "New" }
          });
          dialogRef
            .afterClosed()
            .subscribe(res =>
              this.store.dispatch(new GoalCollectionActions.AddGoalToDb(res.goal))
            );
    }
}
