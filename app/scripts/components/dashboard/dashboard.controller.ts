import * as ngRedux from "ng-redux";
import { ICounterActionCreatorService } from "../../actions/counter.action-creator.service";
import { IAppState } from "../../models/app-state";
import { ICounter } from "../../models/counter.model";

export class DashboardController {
    public static controllerId = "rdxDashboardController";
    public static $inject = [
        "$ngRedux",
        "$scope",
        "rdxCounterActionCreatorService",
    ];

    constructor(private $ngRedux: ngRedux.INgRedux,
                private $scope: angular.IScope,
                private counterActionCreatorService: ICounterActionCreatorService) {
        const unsubscribe = this.$ngRedux.connect(this.mapStateToTarget.bind(this))(this);
        this.$scope.$on("$destroy", unsubscribe);
        this.counterActionCreatorService.loadAll();
    }

    private getCounterValueSum(state: IAppState) {
        return state.counters.all.reduce((accumulator: number, current: ICounter) => accumulator + current.value, 0);
    }

    private mapStateToTarget(state: IAppState) {
        return {
            average: this.getCounterValueSum(state) / state.counters.all.length,
            counterValueSum: this.getCounterValueSum(state),
            counters: state.counters.all,
            numOfCounters: state.counters.all.length,
        };
    }
}
