import * as angular from "angular";
import { MainPageController } from "./mainpage.controller";

export class MainPageComponent implements angular.IComponentOptions {
    public static componentId = "rdxMainPage";

    // component specific variables
    public bindings: any;
    public controller: any;
    public controllerAs: string;
    public template: string;

    constructor() {
        this.bindings = {};

        this.template = require("./mainpage.view.html");
        this.controller = MainPageController;
        this.controllerAs = "mc";
    }
}
