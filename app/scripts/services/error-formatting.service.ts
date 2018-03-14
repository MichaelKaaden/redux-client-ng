import * as angular from "angular";

export interface IErrorFormattingService {
    formatErrorMessage(error: angular.IHttpPromiseCallbackArg<any>): string;
}

/**
 * This service' sole purpose is to get uniform error messages
 * throughout the application.
 */
export class ErrorFormattingService implements IErrorFormattingService {
    public static serviceId = "rdxErrorFormattingService";

    public formatErrorMessage(error: string | angular.IHttpPromiseCallbackArg<any> | any): string {
        if (typeof error === "string") {
            return error;
        } else {
            if (error.hasOwnProperty("status")
                && error.hasOwnProperty("statusText")
                && error.hasOwnProperty("config")) {
                // example: status 404: "Unauthorized" for "GET" "https://foo.bar/baz"
                return `status ${error.status}: \"${error.statusText}\" for "${error.config.method}" "${error.config.url}"`;
            } else {
                return JSON.stringify(error);
            }
        }
    }
}
