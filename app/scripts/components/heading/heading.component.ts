import * as angular from "angular";

import { HeadingController } from "./heading.controller";

export class HeadingComponent implements angular.IComponentOptions {
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

        this.template = require("./heading.html");
        this.controller = HeadingController;
        this.controllerAs = "$ctrl";
    }
}
