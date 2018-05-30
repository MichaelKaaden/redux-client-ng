import * as angular from "angular";
import { IErrorsActionCreatorService } from "../../actions/errors.action-creator.service";
import { IConfiguration } from "../../configuration";

export class CounterListController {
    public static controllerId = "rdxCounterListController";
    public static $inject = [
        "$interval",
        "rdxConfiguration",
        "rdxErrorsActionCreatorService",
    ];

    public isReselectDemoMode: boolean;

    constructor(
        private $interval: angular.IIntervalService,
        private configuration: IConfiguration,
        private errorActionCreatorService: IErrorsActionCreatorService,
    ) {
        this.isReselectDemoMode = this.configuration.isReselectDemoMode;
    }

    public generateSomeErrors() {
        this.$interval(
            () => {
                this.errorActionCreatorService.setError(
                    "generateSomeErrors",
                    "demo error message triggered",
                );
            },
            2000,
            5,
        );
    }
}
