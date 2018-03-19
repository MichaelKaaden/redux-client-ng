import * as angular from "angular";

import { Counter, ICounter } from "../../models/counter.model";
import { ICounterService } from "../../services/counter.service";

export interface INumberInputController {
    counter: ICounter;
    counterIndex: number;
}

export class NumberInputController implements INumberInputController {
    public static $inject = [
        "$scope",
        "rdxCounterService",
    ];

    public counter: ICounter;
    public counterIndex: number;

    // tslint:disable-next-line:no-empty
    constructor(private $scope: angular.IScope,
                private counterService: ICounterService) {
    }

    public $onInit() {
        this.load();
    }


    // capture this properly
    public decrement = (by: number): void => {
        this.counterService.decrementCounter(this.counterIndex, by)
            .then((c) => {
                this.counter = new Counter(c.index, c.value);
            });
    };

    // capture this properly
    public increment = (by: number): void => {
        this.counterService.incrementCounter(this.counterIndex, by)
            .then((c) => {
                this.counter = new Counter(c.index, c.value);
            });
    };

    public load(): void {
        this.counterService.counter(this.counterIndex)
            .then((c) => {
                this.counter = new Counter(c.index, c.value);
            });
    }
}
