import ngRedux from "ng-redux";
import { createSelector } from "reselect";
import { ICounterActionCreatorService } from "../../actions/counter.action-creator.service";
import { IConfiguration } from "../../configuration";
import { IAppState, ICounterState } from "../../models/app-state";
import { ICounter } from "../../models/counter.model";

export class DashboardController {
    public static $inject = [
        "$ngRedux",
        "$scope",
        "rdxConfiguration",
        "rdxCounterActionCreatorService",
    ];
    public hasBeenCalled: number;
    public isReselectDemoMode: boolean;

    private countersAllSelector = createSelector(
        this.countersSelector,
        (counters: ICounterState) => {
            return counters.all;
        },
    );

    private numOfCountersSelector = createSelector(
        this.countersSelector,
        (counters: ICounterState) => counters.all.length,
    );

    private counterValueSumSelector = createSelector(
        this.countersSelector,
        (counters: ICounterState) =>
            counters.all.reduce(
                (accumulator: number, current: ICounter) =>
                    accumulator + current.value,
                0,
            ),
    );

    private averageSelector = createSelector(
        [this.counterValueSumSelector, this.numOfCountersSelector],
        (sum: number, length: number) => sum / length,
    );

    constructor(
        private $ngRedux: ngRedux.INgRedux,
        private $scope: angular.IScope,
        private configuration: IConfiguration,
        private counterActionCreatorService: ICounterActionCreatorService,
    ) {
        this.hasBeenCalled = 0;
        this.isReselectDemoMode = this.configuration.isReselectDemoMode;
        const unsubscribe = this.$ngRedux.connect(
            this.mapStateToTarget.bind(this),
        )(this);
        this.$scope.$on("$destroy", unsubscribe);
        this.counterActionCreatorService.loadAll();
    }

    private countersSelector(state: IAppState) {
        return state.counters;
    }

    private mapStateToTarget(state: IAppState) {
        this.hasBeenCalled++;
        return {
            average: this.averageSelector(state),
            counterValueSum: this.counterValueSumSelector(state),
            counters: this.countersAllSelector(state),
            numOfCounters: this.numOfCountersSelector(state),
        };
    }
}
