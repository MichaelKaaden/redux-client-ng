import * as angular from "angular";

import { ICounterActionCreatorService } from "../../actions/counter.action-creator.service";
import { IAppState } from "../../models/app-state";

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
        "rdxCounterActionCreatorService",
    ];

    public counterIndex: number;

    constructor(private $ngRedux: ngRedux.INgRedux,
                private $scope: angular.IScope,
                private counterActionCreatorService: ICounterActionCreatorService) {
    }

    public $onInit() {
        const unsubscribe = this.$ngRedux.connect(this.mapStateToTarget.bind(this))(this);
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
        return {
            counter: state.counters.all.find((item) => item.index === this.counterIndex),
        };
    }
}
