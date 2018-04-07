import { ErrorsActionCreatorService } from "../../actions/errors.action-creator.service";
import { IAppState } from "../../models/app-state";

export class ErrorsController {
    public static controllerId = "rdxErrorsController";
    public static $inject = [
        "$ngRedux",
        "$scope",
        "rdxErrorsActionCreatorService",
    ];

    constructor(private $ngRedux: ngRedux.INgRedux,
                private $scope: angular.IScope,
                private errorsActionCreatorService: ErrorsActionCreatorService) {
        const unsubscribe = this.$ngRedux.connect(this.mapStateToTarget.bind(this))(this);
        this.$scope.$on("$destroy", unsubscribe);
    }

    public reset() {
        this.errorsActionCreatorService.resetError();
    }

    private mapStateToTarget(state: IAppState) {
        return {
            errors: state.errors,
        };
    }
}
