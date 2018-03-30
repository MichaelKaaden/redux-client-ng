import * as angular from "angular";

import { CounterHeadingController } from "./counter-heading.controller";

export class CounterHeadingComponent implements angular.IComponentOptions {
    public static componentId = "rdxHeading";

    // component specific variables
    public bindings: any;
    public controller: any;
    public controllerAs: string;
    public template: string;

    constructor() {
        this.bindings = {
            counter: "<",
            counterIndex: "<",
        };

        this.template = require("./counter-heading.html");
        this.controller = CounterHeadingController;
        this.controllerAs = "$ctrl";
    }
}
