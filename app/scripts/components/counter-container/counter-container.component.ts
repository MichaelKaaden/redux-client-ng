import * as angular from "angular";

import { CounterContainerController } from "./counter-container.controller";

export class CounterContainerComponent implements angular.IComponentOptions {
    public static componentId = "rdxCounterContainer";

    // component specific variables
    public bindings: any;
    public controller: any;
    public controllerAs: string;
    public template: string;

    constructor() {
        this.bindings = {
            counterIndex: "<",
        };

        this.template = require("./counter-container.html");
        this.controller = CounterContainerController;
        this.controllerAs = "$ctrl";
    }
}
