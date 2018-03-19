import * as angular from "angular";
import { ICounterService } from "../../services/counter.service";

export interface ICounterContainerController {
    // counter: ICounter;
    counterIndex: number;

    // decrement(by: number): void;

    // increment(by: number): void;

    // load(): void;
}

export class CounterContainerController implements ICounterContainerController {
    public static $inject = [
        "$scope",
        "rdxCounterService",
    ];

    // public counter: ICounter;
    public counterIndex: number;

    constructor(private $scope: angular.IScope,
                private counterService: ICounterService) {
    }

    // public $onInit() {
    //     this.load();
    // }
    //
    //
    // // capture this properly
    // public decrement = (by: number): void => {
    //     this.counterService.decrementCounter(this.counterIndex, by)
    //         .then((c) => {
    //             this.counter = new Counter(c.index, c.value);
    //         });
    // };
    //
    // // capture this properly
    // public increment = (by: number): void => {
    //     this.counterService.incrementCounter(this.counterIndex, by)
    //         .then((c) => {
    //             this.counter = new Counter(c.index, c.value);
    //         });
    // };
    //
    // public load(): void {
    //     this.counterService.counter(this.counterIndex)
    //         .then((c) => {
    //             this.counter = new Counter(c.index, c.value);
    //         });
    // }
}
