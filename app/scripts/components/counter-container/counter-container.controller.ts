import * as angular from "angular";
import ngRedux from "ng-redux";
import { createSelector } from "reselect";

import { ICounterActionCreatorService } from "../../actions/counter.action-creator.service";
import { IConfiguration } from "../../configuration";
import { IAppState } from "../../models/app-state";
import { ICounter } from "../../models/counter.model";

export interface ICounterContainerController {
    counterIndex: number;

    decrement(by: number): void;

    increment(by: number): void;

    load(): void;
}

export class CounterContainerController implements ICounterContainerController {
    public static $inject = [
        "$ngRedux",
        "$scope",
        "rdxConfiguration",
        "rdxCounterActionCreatorService",
    ];

    public counterIndex: number;
    public hasBeenCalled: number;
    public recalculateCount: number;
    public isReselectDemoMode: boolean;

    constructor(
        private $ngRedux: ngRedux.INgRedux,
        private $scope: angular.IScope,
        private configuration: IConfiguration,
        private counterActionCreatorService: ICounterActionCreatorService,
    ) {
        this.hasBeenCalled = 0;
        this.recalculateCount = 0;
        this.isReselectDemoMode = this.configuration.isReselectDemoMode;
    }

    private countersAllSelector = (state: IAppState) => state.counters.all;

    private counterSelector = createSelector(
        this.countersAllSelector,
        (counters: ICounter[]) => {
            this.recalculateCount++;
            return counters.find((item) => item.index === this.counterIndex);
        },
    );

    public $onInit() {
        const unsubscribe = this.$ngRedux.connect(
            this.mapStateToTarget.bind(this),
        )(this);
        this.$scope.$on("$destroy", unsubscribe);
        this.load();
    }

    // capture this properly
    public decrement = (by: number): void => {
        this.counterActionCreatorService.decrement(this.counterIndex, by);
    }

    // capture this properly
    public increment = (by: number): void => {
        this.counterActionCreatorService.increment(this.counterIndex, by);
    }

    public load(): void {
        this.counterActionCreatorService.load(this.counterIndex);
    }

    private mapStateToTarget(state: IAppState) {
        this.hasBeenCalled++;
        return {
            counter: this.counterSelector(state),
        };
    }
}
