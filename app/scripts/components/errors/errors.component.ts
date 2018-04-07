import { ErrorsController } from "./errors.controller";

export class ErrorsComponent implements angular.IComponentOptions {
    public static componentId = "rdxErrors";

    // component specific variables
    public bindings: any;
    public controller: any;
    public controllerAs: string;
    public template: string;

    constructor() {
        this.bindings = {};

        this.template = require("./errors.view.html");
        this.controller = ErrorsController;
        this.controllerAs = "$ctrl";
    }
}
