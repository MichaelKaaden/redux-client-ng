import ngRedux from "ng-redux";
import { ErrorActionTypeKeys } from "./error.actions";

export interface IErrorsActionCreatorService {
    setError(methodName: string, message: string);
    resetError();
}

export class ErrorsActionCreatorService implements IErrorsActionCreatorService {
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
