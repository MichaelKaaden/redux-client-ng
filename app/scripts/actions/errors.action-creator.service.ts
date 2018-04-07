import * as ngRedux from "ng-redux";
import { ErrorActionTypeKeys } from "./error.actions";

export class ErrorsActionCreatorService {
    public static serviceId = "rdxErrorsActionCreatorService";
    public static $inject = [
        "$ngRedux",
    ];

    constructor(private $redux: ngRedux.INgRedux) {
    }

    /**
     * Create an error.
     *
     * @param {string} methodName The method the error occurred in
     * @param {string} message The error message
     */
    public setError(methodName: string, message: string) {
        this.$redux.dispatch({
            type: ErrorActionTypeKeys.ERROR_OCCURRED,
            payload: {
                error: `error in the "${methodName}" action creator: ${message}`,
            },
        });
    }

    /**
     * Reset the errors.
     */
    public resetError() {
        this.$redux.dispatch({
            type: ErrorActionTypeKeys.RESET_ERRORS,
        });
    }
}
