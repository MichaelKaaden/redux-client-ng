import * as angular from "angular";

import { Counter, ICounter } from "../../models/counter.model";
import { ICounterService } from "../../services/counter.service";

export interface ICounterHeadingController {
    counter: ICounter;
    counterIndex: number;
}

export class CounterHeadingController implements ICounterHeadingController {
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

    public load(): void {
        this.counterService.counter(this.counterIndex)
            .then((c) => {
                this.counter = new Counter(c.index, c.value);
            });
    }
}
