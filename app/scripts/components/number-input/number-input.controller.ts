import * as angular from "angular";

import { ICounter } from "../../models/counter.model";

export interface INumberInputController {
    counter: ICounter;
    counterIndex: number;
}

export class NumberInputController implements INumberInputController {
    public static $inject = [
        "$scope",
    ];

    public counter: ICounter;
    public counterIndex: number;

    // tslint:disable-next-line:no-empty
    constructor(private $scope: angular.IScope) {
    }
}
