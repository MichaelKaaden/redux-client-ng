import ngRedux from "ng-redux";

import { ErrorsActionCreatorService } from "../../actions/errors.action-creator.service";
import { IConfiguration } from "../../configuration";
import { IAppState } from "../../models/app-state";

export class ErrorsController {
    public static controllerId = "rdxErrorsController";
    public static $inject = [
        "$ngRedux",
        "$scope",
        "rdxConfiguration",
        "rdxErrorsActionCreatorService",
    ];
    public hasBeenCalled: number;
    public isReselectDemoMode: boolean;

    constructor(private $ngRedux: ngRedux.INgRedux,
                private $scope: angular.IScope,
                private configuration: IConfiguration,
                private errorsActionCreatorService: ErrorsActionCreatorService) {
        const unsubscribe = this.$ngRedux.connect(this.mapStateToTarget.bind(this))(this);
        this.$scope.$on("$destroy", unsubscribe);
        this.hasBeenCalled = 0;
        this.isReselectDemoMode = this.configuration.isReselectDemoMode;
    }

    public reset() {
        this.errorsActionCreatorService.resetError();
    }

    private mapStateToTarget(state: IAppState) {
        this.hasBeenCalled++;
        return {
            errors: state.errors,
        };
    }
}
