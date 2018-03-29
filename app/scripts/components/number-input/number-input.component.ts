import * as angular from "angular";

import { NumberInputController } from "./number-input.controller";

export class NumberInputComponent implements angular.IComponentOptions {
    public static componentId = "rdxNumberInput";

    // component specific variables
    public bindings: any;
    public controller: any;
    public controllerAs: string;
    public template: string;

    constructor() {
        this.bindings = {
            counter: "<",
            counterIndex: "<",
            decrement: "=",  // two-way binding instead of "&", else it won't work
            increment: "="  // two-way binding instead of "&", else it won't work
        };

        this.template = require("./number-input.html");
        this.controller = NumberInputController;
        this.controllerAs = "$ctrl";
    }
}
