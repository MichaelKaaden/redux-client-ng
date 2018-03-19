import * as angular from "angular";

import { ICounter } from "../../models/counter.model";

export interface IHeadingController {
    counter: ICounter;
    counterIndex: number;
}

export class HeadingController implements IHeadingController {
    public static $inject = [
        "$scope",
    ];

    public counter: ICounter;
    public counterIndex: number;

    // tslint:disable-next-line:no-empty
    constructor(private $scope: angular.IScope) {
        // this.counterValue = -1;
    }
}
